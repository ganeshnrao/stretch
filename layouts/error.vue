<template lang="pug">
.container
  b-card(:title="error.message")
    b-card-text An error occurred, below are the details.
    pre {{ JSON.stringify(error.response, null, '  ')}}
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return new Error("Unknown error");
      }
    }
  }
};
</script>
