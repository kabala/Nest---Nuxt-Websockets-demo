<template>
  <div role="listitem" class="tag">
    <div class="tag__desc">
      <i
        aria-hidden="true"
        class="tag__color"
        :style="{ backgroundColor: `${tag.color}` }"
      ></i>
      <span role="text" class="tag__name">{{ tag.name }}</span>
    </div>
    <div class="tag__actions">
      <button @click="$emit('editTag', tag.name)">
        editar
      </button>
      <button @click="$emit('deleteTag', tag.name)">
        borrar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TagItem",
  props: {
    tag: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
});
</script>
