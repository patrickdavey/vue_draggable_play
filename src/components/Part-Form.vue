<template>
  <form>
    <bs-input v-model="name"
              label="Name"
              v-bind:minlength="1"
              required
              placeholder="Name"
              icon
              ></bs-input>
  </form>
</template>

<!-- [{{ name }}] -->
<!-- <p>It"s a container <strong>id: {{id}}</strong> of type <strong>{{type}}</strong>, and we would allow the user to update directions etc</p> -->
<script>

import bsInput from "vue-strap/src/input";
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
