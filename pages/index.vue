<template lang="pug">
.container-fluid.py-3
  b-button-group
    b-button(
      variant="outline-primary"
      @click="togglePlaying()"
    )
      v-icon(:name="playing ? 'stop-circle' : 'play'")
      |  {{ playing ? 'Stop' : 'Play' }}
    b-button(
      variant="outline-success"
      @click="$store.dispatch('routines/save')"
    )
      v-icon(name="save")
      |  Save
  .mt-3(v-if="!playing")
    b-card.mb-3(v-for="(item, index) in exercises" :key="item.id")
      b-form-group
        b-button-group
          b-button(variant="outline-secondary" @click="item.include = !item.include")
            v-icon(:name="item.include ? 'check-square' : 'square'")
          b-button(
            v-if="index > 0"
            variant="outline-secondary"
            @click="$store.dispatch('routines/move', { id: item.id, direction: -1 })"
          )
            v-icon(name="arrow-up")
          b-button(
            v-if="index < exercises.length - 1"
            variant="outline-secondary"
            @click="$store.dispatch('routines/move', { id: item.id, direction: 1 })"
          )
            v-icon(name="arrow-down")
          b-button(variant="outline-danger" @click="$store.dispatch('routines/deleteExercise', item.id)")
            v-icon(name="trash-2")
      b-form-group
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Hold" label-cols="3")
        b-form-input(type="number" v-model="item.hold" min="1" max="300")
      b-form-group(label="Repeat" label-cols="3")
        b-form-input(type="number" v-model="item.repeat" min="1" max="300")
      b-form-group(label="Rest" label-cols="3")
        b-form-input(type="number" v-model="item.rest" min="0" max="300")
      b-button-group
        b-button(variant="outline-primary" @click="item.alternate = true" :class="{ active: item.alternate }")
          v-icon(name="shuffle")
          |  Alternate
        b-button(variant="outline-primary" @click="item.alternate = false" :class="{ action: !item.alternate }")
          v-icon(name="minimize-2")
          |  Both
    b-button(@click="$store.dispatch('routines/add')" variant="outline-success")
      v-icon(name="plus")
      |  Add another
  .mt-3(v-else)
    b-form-input(type="range" min="0" :max="actions.length" v-model="currentActionIndex" disabled)
    b-list-group.mt-3
      b-list-group-item.d-flex.justify-content-between(
        button
        v-for="(action, index) in actions"
        :class="{ active: index === currentActionIndex }"
        :key="index"
        @click="$store.dispatch('routines/skipTo', index)"
      )
        span {{ action.message }} 
        span
          b-badge(variant="light") {{ action.duration }} seconds
  video.no-sleep(width="10" height="10" ref="noSleep" :loop="loop")
    source(src="/muted-blank.mp4" type="video/mp4")
    source(src="/muted-blank.ogv" type="video/ogg")
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { mapMultiRowFields, mapFields } from "vuex-map-fields";

let playPromise;

export default {
  data() {
    return {
      loop: false,
      fields: ["name", "hold", "repeat", "rest", "alternate"]
    };
  },

  computed: {
    ...mapMultiRowFields("routines", ["exercises"]),
    ...mapFields("routines", ["currentActionIndex"]),
    ...mapState("routines", ["playing"]),
    ...mapGetters("routines", ["actions"])
  },

  methods: {
    async togglePlaying() {
      this.$store.dispatch("routines/togglePlaying");
      if (this.playing) {
        this.loop = true;
        playPromise = this.$refs.noSleep.play();
        await playPromise;
      } else {
        if (playPromise) {
          await playPromise;
          playPromise = null;
        }
        this.loop = false;
        this.$refs.noSleep.pause();
      }
    }
  }
};
</script>

<style lang="scss">
.no-sleep {
  width: 10px;
  height: 10px;
  position: absolute;
  top: -10px;
  left: -10px;
}
</style>
