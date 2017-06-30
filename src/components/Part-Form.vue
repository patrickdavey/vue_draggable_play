<template>
  <form>
    <bs-input v-model="name"
              label="Name"
              v-bind:minlength="1"
              placeholder="Name"
              ></bs-input>

    <bs-input v-model="directions"
              label="Directions"
              placeholder="Directions"
              type="textarea"
              ></bs-input>
  </form>
</template>

<!-- [{{ name }}] -->
<!-- <p>It"s a container <strong>id: {{id}}</strong> of type <strong>{{type}}</strong>, and we would allow the user to update directions etc</p> -->
<script>

import { input as bsInput } from "vue-strap";
export default {
  name: "part-form",
  props: ["part"],
  components: { bsInput },
  computed: {
    name: {
      get () {
        return this.part.name;
      },
      set (value) {
        this.$store.commit("UPDATE_PART_PROPERTY", {
          nodeId: this.part.id,
          property: "name",
          value: value
        });
      }
    },

    directions: {
      get () {
        return this.part.directions;
      },
      set (value) {
        this.$store.commit("UPDATE_PART_PROPERTY", {
          nodeId: this.part.id,
          property: "directions",
          value: value
        });
      }
    },

    id () {
      return this.part.id;
    },

    type () {
      return this.part.type;
    },

    order () {
      return this.part.order;
    }
  }
};

</script>
