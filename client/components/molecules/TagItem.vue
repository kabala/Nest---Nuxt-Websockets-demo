<template>
  <div role="listitem" class="tag-item">
    <div class="tag-item__desc">
      <i
        aria-hidden="true"
        class="tag-item__color"
        :style="{ backgroundColor: `${tag.color}` }"
      ></i>
      <div class="tag-item__edit" role="form" v-if="editMode">
        <form @submit.prevent="validateTagName">
          <input
            :aria-label="`Editar etiqueta '${tag.name}'`"
            class="tag-item__edit"
            type="text"
            v-model.trim="$v.editText.$model"
            ref="editInput"
          />
          <div class="tag-item__warning" v-if="$v.$error" role="alert">
            <span>Formato incorrecto.</span>
          </div>
          <button type="submit" class="tag-item__save">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMinYMin"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="saveIcon"></path>
            </svg>
          </button>
        </form>
      </div>
      <span v-else role="text" class="tag-item__name">{{ tag.name }}</span>
    </div>
    <div v-if="!editMode" class="tag-item__actions">
      <button class="outline" @click="$emit('deleteTag', tag.name)">
        borrar
      </button>
      <button @click="toggleEditMode">
        editar
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { tagInputValidators } from "~/utils/commons";
import { mdiContentSave } from "@mdi/js";

export default Vue.extend({
  name: "TagItem",
  mixins: [validationMixin],
  props: {
    tag: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      editText: this.$props.tag.name,
      saveIcon: mdiContentSave
    };
  },
  validations: {
    editText: { ...tagInputValidators }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.$nextTick(() => {
          this.$refs.editInput.focus();
        });
      }
    },
    validateTagName() {
      if (this.editText === this.tag.name) {
        this.editMode = !this.editMode;
        return;
      }

      if (!this.$v.$error) {
        this.editMode = !this.editMode;
        this.$emit("editTag", {
          prevTag: this.tag.name,
          newTag: this.editText.toLowerCase()
        });
      }
    }
  }
});
</script>
