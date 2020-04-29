<template>
  <main class="tag-page">
    <div class="tag-title">
      <h1>Editor de Etiquetas <span>Acme Magnum</span></h1>
    </div>
    <div role="form" class="tag">
      <form class="tag__form" @submit.prevent="checkTag">
        <div class="tag__wrapper" role="group">
          <input
            id="tag-text"
            placeholder="Añadir etiqueta"
            aria-required="false"
            v-model.trim="$v.tagText.$model"
            type="text"
            ref="tagInput"
            aria-label="Añadir etiqueta"
            @focus="
              () => {
                if (tagWarning) tagWarning = null;
              }
            "
          />
          <button type="submit">Añadir</button>
        </div>
        <div v-if="tagWarning" class="tag__warning" role="none">
          <span role="alert">{{ tagWarning }}</span>
        </div>
        <template v-if="$v.$error">
          <div role="none" class="tag__warning">
            <ul>
              <li role="alert" v-if="!$v.tagText.minLength">
                {{ `Debes ingresar al menos 3 caracteres.` }}
              </li>
              <li role="alert" v-if="!$v.tagText.maxLength">
                {{ `Puedes ingresar hasta 12 caracteres.` }}
              </li>
              <li role="alert" v-if="!$v.tagText.alphaNum">
                {{
                  `Solo puedes ingresar caracteres alfanuméricos y sin espacios.`
                }}
              </li>
            </ul>
          </div>
        </template>
      </form>
    </div>
    <TagList :tags="tags" />
  </main>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import tinycolor from "tinycolor2";
import { validationMixin } from "vuelidate";
import { tagInputValidators } from "~/utils/commons";
import createRandomColor from "~/utils/color";
import TagList from "~/components/organisms/TagList.vue";

export default Vue.extend({
  components: { TagList },
  mixins: [validationMixin],
  data() {
    return {
      tagText: "",
      tagWarning: null
    };
  },
  validations: {
    tagText: { ...tagInputValidators }
  },
  computed: {
    ...mapState(["tags"])
  },
  methods: {
    ...mapMutations(["setTags"]),
    checkTag() {
      if (this.tagText) {
        this.$refs.tagInput.blur();
        if (this.isNameExistent) this.isNameExistent = false;

        if (this.tags.findIndex(tag => tag.name === this.tagText) > -1) {
          const enteredTagName = this.tagText;
          this.tagText = "";
          this.tagWarning = `La etiqueta "${enteredTagName}" ya existe. Intenta con otro nombre.`;
          return;
        }

        if (!this.$v.$error) {
          const color = this.generateColor();
          const newTag = { name: this.tagText.toLowerCase(), color };
          this.socket.emit("tagToServer", newTag);
        }
      }
    },
    generateColor() {
      const newColor = tinycolor(createRandomColor()).toHexString();
      if (this.tags.findIndex(tag => tag.color === newColor) > -1) {
        this.generateColor();
      }
      return newColor;
    },
    editTag({ prevTag, newTag }) {
      this.socket.emit("editTag", { prevTag, newTag });
    },
    deleteTag(tagName) {
      this.socket.emit("deleteTag", tagName);
    }
  },
  provide() {
    return {
      editTag: this.editTag,
      deleteTag: this.deleteTag
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/tag",
      path: "/websockets",
      reconnection: false
    });
    this.socket.on("tagsToClient", resp => {
      this.setTags(resp);
      this.tagText = "";
    });

    this.socket.on("getTags", resp => {
      this.setTags(resp);
    });

    this.socket.emit("getTags");
  }
});
</script>
