<template>
  <div>
    <div class="well">
      <img :src="image">
    </div>
    <form>
      <div class="row">
        <div class="col-md-6">
          <h2>Problem</h2>
          <div class="form-group">
            <div class="col-sm-6">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Start On New Page
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h2>Answer Space</h2>
          <div class="form-group">
            <div class="col-sm-6">
              <div class="radio">
                <label>
                  <input type="radio"> blah
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
</template>

<script>

export default {
  name: "problem-form",
  props: ["problem"],
  data () {
    return {
      radioValue: "default"
    };
  },

  computed: {
    image () {
      return this.problem.image;
    }
  }

};

</script>
