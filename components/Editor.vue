<template lang="pug">
div
  b-card.mb-3(v-for="(item, index) in exercises" :key="item.id")
    b-form-group
      b-button-group
        b-button(variant="outline-secondary" @click="item.include = !item.include")
          v-icon(:name="item.include ? 'check-square' : 'square'")
          |  Include
        b-button(
          v-if="index > 0"
          variant="outline-secondary"
          @click="$store.dispatch('routines/move', { id: item.id, direction: -1 })"
        )
          v-icon(name="arrow-up")
          |  Move up
        b-button(
          v-if="index < exercises.length - 1"
          variant="outline-secondary"
          @click="$store.dispatch('routines/move', { id: item.id, direction: 1 })"
        )
          v-icon(name="arrow-down")
          |  Move down
        b-button(variant="outline-danger" @click="$store.dispatch('routines/deleteExercise', item.id)")
          v-icon(name="trash-2")
          |  Delete
    b-form-group(label="Name" :label-cols="labelCols")
      b-form-input(type="text" v-model="item.name")
    b-form-group(label="Hold" :label-cols="labelCols")
      b-form-input(type="number" v-model="item.hold" min="1" max="300")
    b-form-group(label="Repeat" :label-cols="labelCols")
      b-form-input(type="number" v-model="item.repeat" min="1" max="300")
    b-form-group(label="Rest" :label-cols="labelCols")
      b-form-input(type="number" v-model="item.rest" min="0" max="300")
    b-button-group
      b-button(variant="outline-primary" @click="item.alternate = true" :class="{ active: item.alternate }")
        v-icon(name="shuffle")
        |  Alternate
      b-button(variant="outline-primary" @click="item.alternate = false" :class="{ active: !item.alternate }")
        v-icon(name="minimize-2")
        |  Both
  .mt-3
    b-button(@click="$store.dispatch('routines/add')" variant="outline-success")
      v-icon(name="plus")
      |  Add another
</template>

<script>
export default {
  props: {
    exercises: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      labelCols: 2
    };
  }
};
</script>
