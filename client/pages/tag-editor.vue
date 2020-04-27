<template>
  <main>
    <div class="tag-form">
      <form @submit="checkTag">
        <input v-model="tagText" type="text" />
        <button type="submit">Add Tag</button>
      </form>
    </div>
    <div class="tags">
      <div v-if="tags.length">
        <div class="tag" v-for="(tag, index) in tags" :key="index">
          <span class="tag__name">{{ tag.name }}</span>
          <i class="tag__color" :style="{ backgroundColor: `${tag.color}` }"></i>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

interface TagData {
  tagText: string;
}

export default Vue.extend({
  data(): TagData {
    return {
      tagText: ""
    };
  },
  computed: {
    ...mapState(["tags"])
  },
  methods: {
    ...mapActions(["formatTag"]),
    _checkDuplicated() {},
    checkTag(e) {
      e.preventDefault();

      if (this.tagText) {
        this.formatTag({ name: this.tagText, color: "#ffffff" });
      }
    }
  }
});
</script>
