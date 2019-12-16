<template lang="pug">
div
  b-button-group
    b-button(
      variant="outline-primary"
      @click="togglePlaying()"
    )
      v-icon(:name="playing ? 'stop-circle' : 'play'")
      |  {{ playing ? 'Stop' : 'Play' }}
    b-button(
      variant="outline-primary"
      @click="editing = !editing"
    )
      v-icon(:name="editing ? 'list' : 'edit'")
      |  {{ editing ? 'List' : 'Edit' }}
    b-button(
      variant="outline-success"
      @click="$store.dispatch('routines/save')"
    )
      v-icon(name="save")
      |  Save
  .mt-3(v-if="!playing")
    b-list-group(v-if="!editing")
      b-list-group-item(v-for="(item, index) in exercises" :key="item.id" v-if="item.include")
        h5(:class="{ exclude: !item.include }") {{ item.name }}
        .text-secondary Repeat {{ item.repeat }} times and hold for {{ item.hold }} seconds {{ item.alternate ? 'on each side' : ''}}
    Editor(v-else :exercises="exercises")
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
import Editor from "@/components/Editor";

let playPromise;

export default {
  components: {
    Editor
  },

  data() {
    return {
      loop: false,
      editing: false,
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

.exclude {
  text-decoration: line-through;
}
</style>
