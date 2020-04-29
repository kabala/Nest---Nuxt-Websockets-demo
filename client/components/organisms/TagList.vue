<template>
  <div v-if="tags.length" role="none" class="tags">
    <TagItem
      v-for="(tag, index) in tags"
      :key="`${index}-${tag.name}`"
      :tag="tag"
      :index="index"
      @editTag="editTag"
      @deleteTag="deleteTag"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TagItem from "~/components/molecules/TagItem.vue";

export default Vue.extend({
  name: "TagList",
  components: {
    TagItem
  },
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  inject: ["editTag", "deleteTag"]
});
</script>
