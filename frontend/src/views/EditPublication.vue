<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <b-container class="mt-4">
      <b-row>
        <b-form class="bg-light my-4 p-4 formulaire">
          <h2>Modifiez votre publication</h2>
          <b-form-group
          label="Titre :"
          label-for="input-title"
          class="mb-2">
            <b-form-input
            id="input-title"
            v-model="state.input.title"
            type="text">
            </b-form-input>
            <span class="error" v-if="vModification$.input.title.$error">
                {{ vModification$.input.title.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="Description :"
          label-for="input-description"
          class="mb-2">
            <b-form-textarea
            id="input-description"
            v-model="state.input.textContent"
            rows="3"
            max-rows="6"
            ></b-form-textarea>
            <span class="error" v-if="vModification$.input.textContent.$error">
                {{ vModification$.input.textContent.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-row>
            <img
            class="col-5"
            ref="photoMeme"
            :src="publicationInfo.post_image" />
            <img
            class="col-5"
            ref="preview"
            src="" />
          </b-row>
          <b-form-group
          label="Image :"
          label-for="input-image"
          class="mb-2">
              <input type="file" 
              id="input-image"
              accept="image/*"
              @change="photoChange">
          </b-form-group>
          <b-button 
          variant="danger"
          class="col-5 
          mt-3"
          @click="editPost()">
            <span v-if="status == 'loading'">En cours...</span>
            <span v-else>Enregistrer</span>
          </b-button>
          <b-button 
          variant="danger"
          class="offset-2 col-5 
          mt-3"
          @click="abandon()">Abandonner</b-button>
        </b-form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'EditPublication',
  components: {
    Header,
    Menu
  },
  computed: {
    ...mapState({
    publications: 'publications',
    publicationInfo: 'publicationInfo',
    status: 'status'
    })
  },
  mounted: function () {
    this.$refs.preview.style.display = "none";
    const self = this;
    const urlId = this.$route.params.postId;
    this.$store.dispatch('oneMemeInfo', urlId)
    .then(function () {
      self.state.input.title = self.publicationInfo.title;
      self.state.input.textContent = self.publicationInfo.textContent;
    })
  },
  setup () {
    const state = reactive({
      input: {
        title: '',
        textContent: '',
      }
    })
    const rulesModification = computed(() => {
      return {
        input: {
          title: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          textContent: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
        }
      }
    })
    const vModification$ = useVuelidate(rulesModification, state)
    return { state, vModification$ }
  },
  data: function () {
    return {
      error: '',
      post_image: null
    }
  },
  methods: {
    photoChange: function (event) {
      this.post_image = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.$refs.preview.src = reader.result;
        this.$refs.preview.style.display = "";
        this.$refs.photoMeme.style.display = "none";
      }
      reader.readAsDataURL(this.post_image);
    },
    submitFormModification() {
      this.vModification$.$validate();
      if(!this.vModification$.$error) {
        return true;
      } else {
        this.error = '';
        return false;
      }
    },
    editPost: function () {
      if(this.submitFormModification()) {
        const self = this;
        const fd = new FormData();
        fd.append('post_image', this.post_image);
        fd.append('publication', JSON.stringify(this.state.input));
        this.$store.dispatch('modificationPublication', {publicationAll: fd, publicationId: self.$route.params.postId})
        .then(function () {
          self.$router.push('/memes');
        }, function (error) {
          self.error = error.response.data.error;
        })
      }
    },
    abandon: function () {
      this.$router.push('/memes');
    }, 
  }
}
</script>

<style lang="scss" scoped>
.formulaire {
  @include border;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>




