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

            <b-row>
                <b-card
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Photo de profil"
                    img-top
                    class="mb-2 offset-3 col-6">
                    <b-card-title>Créé par : Agnieszka Lukaszewicz</b-card-title>
                    <b-card-text>27/12/2021</b-card-text>
                    <b-card-text>Description</b-card-text>
                    <b-row>
                        <b-button 
                        variant="primary"
                        class="col-5"
                        >Supprimer</b-button>

                        <b-button 
                        variant="primary"
                        class="offset-2 col-5"
                        >Modifier</b-button>
                    </b-row>
                </b-card>
            </b-row>
        </b-container>
    </div> 
</template>
<!--
<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'Memes',
  components: {
    Header,
    Menu,
  },
}
</script>-->

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'Memes',
  components: {
    Header,
    Menu,
  },
  computed: {
    ...mapState({
      utilisateur_token_id: 'utilisateur',
      utilisateurInfo: 'utilisateurInfo',
    })
  },
    mounted: function (){
        const self = this;
        self.state.input.creatorId = self.utilisateur_token_id.utilisateurId;
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
        if(this.submitFormPublication()) {
          const self = this;
          const fd = new FormData();
          fd.append('post_image', this.state.post_image);
          fd.append('publication', JSON.stringify(this.state.input));
          this.$store.dispatch('publicationContent', fd)
          .then(function () {
            self.$router.push('/memes');
          }, function (error) {
            self.error = error.response.data.error;
          })
        }
      },
    
  }
}
</script>

<style lang="scss" scoped>

</style>