<template>
  <draggable element="ul" v-on:click.native.self="clickHandler" :id="partId" class="tree" v-model="children" :options="{group:"people"}" :move="move"
                          v-bind:class="classObject">
  <li class="branch" v-on:click.stop="childClick(child)" v-for="(child, index) in children">
    <template v-if="containsProblems">
      <document-problem :problem="child"/>
    </template>
    <template v-else>
      <i class="indicator glyphicon glyphicon-folder-open"></i>{{child.type}}-{{child.id}}
      <part-container :container="child"/>
    </template>
  </li>
  </draggable>
</template>

<script>

import draggable from "vuedraggable";
import DocumentProblem from "./Document-Problem.vue";

export default {
  name: "part-container",
  props: ["container"],
  components: {draggable, DocumentProblem},
  beforeCreate: function () {
    this.$options.components.PartContainer = require("./Part-Container.vue");
  },
  computed: {
    type: function () {
      return this.container.type;
    },
    partId () {
      return `tree-node-${this.container.id}`;
    },
    isContainer: function () {
      return this.type.match(/container/);
    },
    classObject: function () {
      return {
        "normal-container": (this.type === "container" && !this.containsProblems),
        "problem-container": this.containsProblems,
        "no-children": !this.hasChildren
      };
    },
    hasChildren: function () {
      return this.children.length > 0;
    },
    containsProblems: function () {
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
        // value is the new list, but we just want to persist updated ids.
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
    clickHandler: function () {
      console.log(this.container.id);
    },
    childClick: function (child) {
      this.$store.commit("SET_SELECTED_NODE", child.id);
    },
    move: function (evt) {
      let dragged = evt.from.getAttribute("class");
      let related = evt.to.getAttribute("class");

      if (dragged === "normal-container" && related.match(/problem-container/)) {
        return false;
      } else if (dragged.match(/problem-container/) && related.match(/problem-container/)) {
        return true;
      } else if (dragged.match(/problem-container/) && related.match(/normal-container/) && related.match(/no-children/)) {
        return true;
      } else if (dragged.match(/normal-container/) && related.match(/normal-container/)) {
        return true;
      }
      console.log(dragged);
      console.log(dragged);

      return false;
    }
  }
};

</script>
<style>

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
.tree li button, .tree li button:active, .tree li button:focus {
    text-decoration: none;
    color:#369;
    border:none;
    background:transparent;
    margin:0px 0px 0px 0px;
    padding:0px 0px 0px 0px;
    outline: 0;
}

</style>