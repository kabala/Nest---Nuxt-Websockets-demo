<template>
  <div role="listitem" class="tag-item">
    <div class="tag__desc">
      <i
        aria-hidden="true"
        class="tag__color"
        :style="{ backgroundColor: `${tag.color}` }"
      ></i>
      <div role="form" v-if="editMode">
        <form @submit.prevent="validateTagName">
          <input
            :aria-label="`Editar etiqueta '${tag.name}'`"
            class="tag__edit"
            type="text"
            v-model.trim="$v.editText.$model"
            ref="editInput"
          />
          <button type="submit" class="tag__save">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path :d="saveIcon"></path>
            </svg>
          </button>
        </form>
      </div>
      <span v-else role="text" class="tag__name">{{ tag.name }}</span>
      <div class="tag__warning" v-if="$v.$error" role="alert">
        <span>No es posible guardar la etiqueta con ese formato.</span>
      </div>
    </div>
    <div class="tag__actions">
      <button @click="toggleEditMode">
        editar
      </button>
      <button @click="$emit('deleteTag', tag.name)">
        borrar
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
