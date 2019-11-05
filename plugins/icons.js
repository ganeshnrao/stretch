import Vue from "vue";
import feather from "vue-icon";

Vue.use(feather, {
  name: "v-icon",
  props: {
    baseClass: {
      type: String,
      default: "v-icon"
    },
    classPrefix: {
      type: String,
      default: "v-icon-"
    }
  }
});
