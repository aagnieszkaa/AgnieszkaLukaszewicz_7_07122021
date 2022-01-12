<template>
    <div>
        <Header></Header>
        <Menu></Menu>
        <b-container class="mt-4">
            <b-row>
                <b-form class="bg-light mt-4 mb-4 p-4">
                    <h2>Créez votre publication</h2>

                    <b-form-group
                    label="Titre :"
                    label-for="input-title"
                    class="mb-2">
                        <b-form-input
                        id="input-title"
                        v-model="state.input.title"
                        type="text">
                        </b-form-input>
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
                    </b-form-group>

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
                    variant="primary"
                    @click="createPost()">
                    Publier</b-button>

                </b-form>
            </b-row>

            <ul>
              <li v-for="item in publications" v-bind:key="item">
                <Meme
                  :publication="item">
                </Meme>
              </li>
            </ul>
        </b-container>
    </div> 
</template>

<script>
  import { mapState } from 'vuex';
  import Header from '@/components/Header.vue'
  import Menu from '@/components/Menu.vue'
  import Meme from '@/components/Meme.vue'
  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { reactive, computed } from 'vue'
export default {
  name: 'Memes',
  components: {
    Header,
    Menu,
    Meme,
  },
  computed: {
    ...mapState({
      utilisateur_token_id: 'utilisateur',
      utilisateurInfo: 'utilisateurInfo',
      publications: 'publications',
    })
  },
  mounted: function (){
      const self = this;
      self.state.input.creatorId = self.utilisateur_token_id.utilisateurId;
      self.$store.dispatch('utilisateurInfo', self.utilisateur_token_id.utilisateurId);
      self.$store.dispatch('showPublications');
  },
  setup () {
      const state = reactive({
        input: {
          title: '',
          textContent: '',
          creatorId: '',
        },
        post_image: null
      })
      const rulesPublication = computed(() => {
        return {
          input: {
          title: { required },
          textContent: { required },
        },
        post_image: { required }}
      })
      const vPublication$ = useVuelidate(rulesPublication, state)
      return { state, vPublication$ }
    },
  data: function () {
    return {
      error: '',
    }
  },
  methods: {
      photoChange: function (event) {
          this.state.post_image = event.target.files[0];        
      },
      submitFormPublication() {
        this.vPublication$.$validate();
        if(!this.vPublication$.$error) {
          return true;
        } else {
          this.error = '';
          return false;
        }
      },
      createPost: function () {
        console.log(this.submitFormPublication());
        if(this.submitFormPublication()) {
          const self = this;
          console.log(self.publications);
          const fd = new FormData();
          fd.append('post_image', this.state.post_image);
          fd.append('publication', JSON.stringify(this.state.input));
          this.$store.dispatch('publicationContent', fd)
          .then(function () {
            self.refreshData();
          }, function (error) {
            self.error = error.response.data.error;
          })
        }
      },
      refreshData: function () {
        const self = this;
        self.$store.dispatch('showPublications')
        .then(function (response) {
            console.log(response);
          }, function (error) {
            self.error = error.response.data.error;
          })
        }
      },
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
}
</style>