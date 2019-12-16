<template lang="pug">
div
  h5 You have completed the stretches {{ history.length }} times.
  b-list-group
    b-list-group-item(v-for="(item, index) in history" :key="index")
      h5 {{ formatDate(item.dateMs) }}
      div {{ item.exercises.join(" · ")}}
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState("routines", ["history"]),

  methods: {
    formatDate(dateMs) {
      return new Date(dateMs).toISOString().slice(0, 10);
    }
  }
};
</script>
