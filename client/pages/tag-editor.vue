<template>
  <main>
    <div class="tag-form">
      <form @submit="checkTag">
        <input v-bind="tagText" type="text" />
        <button type="submit">Add Tag</button>
      </form>
    </div>
    <div class="tags">
      <div class="tag" v-for="(tag, index) in tags" :key="index">
        <span class="tag__name">{{ tag.name }}</span>
        <i class="tag__color" :style="{ backgroundColor: `${tag.color}` }"></i>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    tagText: ""
  }),
  computed: {
    ...mapState(["tags"])
  },
  methods: {
    ...mapActions(["formatTag"]),
    checkTag() {
      if (this.tagText) {
        this.formatTag(this.tagText);
      }
    }
  }
};
</script>
