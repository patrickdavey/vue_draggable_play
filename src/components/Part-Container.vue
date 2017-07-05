<template>
  <draggable element="ul" :click.native.self="clickHandler" :id="partId" class="tree" v-model="children" :options="{group:'people'}" :move="move" v-bind:class="classObject">
    <template v-if="isOpen">
      <li class="branch"  v-on:click.stop="childClick(child)" v-for="(child, index) in children">
        <template v-if="containsProblems">
          <document-problem :problem="child"/>
        </template>
        <template v-else>
          <folder-title v-on:dblclick.native.stop="toggleOpen(child)" :part="child" :current-hierarchy="currentHierarchy"></folder-title>
          <part-container :parent-hierarchy="currentHierarchy" :container="child"/>
        </template>
      </li>
      <li slot="footer" class="branch"><button @click.stop="addChild" class="btn btn-primary btn-xs">Add Part</button></li>
    </template>
  </draggable>
</template>

<script>

import draggable from "vuedraggable";
import DocumentProblem from "./Document-Problem.vue";
import MoveLogic from "../lib/ArrangeMoveLogic.js";
import FolderTitle from "./Folder-Title.vue";

export default {
  name: "part-container",
  props: ["container", "parentHierarchy"],
  components: {draggable, DocumentProblem, FolderTitle},

  beforeCreate: function () {
    this.$options.components.PartContainer = require("./Part-Container.vue");
  },

  computed: {
    currentHierarchy: function () {
      if (this.parentHierarchy === "root") {
        return "-";
      } else if (this.parentHierarchy === "-") {
        return `-${this.container.order}-`;
      } else {
        return `${this.parentHierarchy}${this.container.order}-`;
      }
    },
    type: function () {
      return this.container.type;
    },
    partId () {
      return `tree-node-${this.container.id}`;
    },
    isContainer () {
      return this.type.match(/container/);
    },
    isOpen () {
      return this.container.open;
    },
    classObject () {
      return {
        "normal-container": (this.type === "container" && !this.containsProblems),
        "problem-container": this.containsProblems,
        "open": this.container.open,
        "closed": !this.container.open,
        "no-children": !this.hasChildren
      };
    },
    hasChildren () {
      return this.children.length > 0;
    },
    containsProblems () {
      return this.isContainer && this.hasChildren && this.children[0].type === "document-problem";
    },

    children: {
      get () {
        if (this.container.nodes) {
          return this.container.nodes.map((nodeId) => this.$store.state.nodes[nodeId]);
        } else {
          return [];
        }
      },
      set (value) {
        // value is the new list, but we just want to persist updated ids and update the order.
        console.log("in part-set");
        let newOrder = value.filter(function (n) { return n !== undefined; }).map(function (v) { return v.id; });
        this.$store.commit("SET_NODES_FOR_CONTAINER", {
          containerID: this.container.id,
          nodes: newOrder
        });
      }
    }
  },

  methods: {
    toggleOpen: function (child) {
      this.$store.commit("UPDATE_PART_PROPERTY", {
        nodeId: child.id,
        property: "open",
        value: !child.open
      });
    },

    clickHandler: function () {
      console.log(this.container.id);
    },

    addChild: function () {
      console.log("add child");
    },

    childClick: function (child) {
      this.$store.commit("SET_SELECTED_NODE", child.id);
    },

    move: function (evt) {
      let moveLogic = new MoveLogic(evt);
      return moveLogic.canMove();
    }
  }
};

</script>
<style lang="scss">

ul.tree li.grid.sortable-ghost {
  float: none !important;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.sortable-ghost {
  min-height: 27px;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

ul.problem-container{
  min-height: 27px;
}

ul.closed {
  display: none;
}

ul.normal-container.no-children {
  min-height: 27px;
}

ul.problem-container.no-children {
  min-height: 27px;
}

.tree, .tree ul {
  margin:0;
  padding:0;
  list-style:none
}
.tree ul {
  margin-left:1em;
  position:relative
}
.tree ul ul {
  margin-left:.5em
}
.tree ul:before {
  content:"";
  display:block;
  width:0;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  border-left:1px solid
}
.tree li {
  margin:0;
  padding:0 1em;
  line-height:2em;
  color:#369;
  font-weight:700;
  position:relative
}
.tree ul li:before {
  content:"";
  display:block;
  width:10px;
  height:0;
  border-top:1px solid;
  margin-top:-1px;
  position:absolute;
  top:1em;
  left:0
}
.tree ul li:last-child:before {
  background:#fff;
  height:auto;
  top:1em;
  bottom:0
}
.indicator {
  margin-right:5px;
}
.tree li a {
  text-decoration: none;
  color:#369;
}
</style>
