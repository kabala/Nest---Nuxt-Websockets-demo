<template>
  <main>
    <div role="form" class="tag-form">
      <form @submit.prevent="checkTag">
        <label for="tag-text">Enter new tag</label>
        <input
          id="tag-text"
          placeholder="tag"
          aria-required="false"
          v-model="tagText"
          type="text"
        />
        <button type="submit">Add Tag</button>
      </form>
    </div>
    <div v-if="tags.length" role="none" class="tags">
      <div role="list">
        <div
          role="listitem"
          class="tag"
          v-for="(tag, index) in tags"
          :key="index"
        >
          <span role="text" class="tag__name">{{ tag.name }}</span>
          <i
            aria-hidden="true"
            class="tag__color"
            :style="{ backgroundColor: `${tag.color}` }"
          ></i>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { Tag } from "../../shared/interfaces";
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
    checkTag() {
      if (this.tagText) {
        const newTag: Tag = { name: this.tagText, color: "#fff" };
        this.socket.emit("tagToServer", newTag);
      }
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/tag",
      path: "/websockets",
      reconnection: false
    });
    this.socket.on("tagToClient", (resp: Tag) => {
      this.formatTag(resp);
      this.tagText = "";
    });
  }
});
</script>
