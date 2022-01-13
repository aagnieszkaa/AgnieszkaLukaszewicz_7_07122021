<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <b-container>
      <b-row>
        <b-form class="mt-4">
              <b-form-textarea
                  id="textarea-small"
                  size="sm"
                  placeholder="Modifiez votre commentaire..."
                  v-model="state.input.textComment"
              ></b-form-textarea>
              <b-button 
              variant="primary"
              class="mt-3 mb-3"
              @click="editComment()">
              Modifier
              </b-button>

              <b-button 
              variant="primary"
              class="m-3"
              @click="abandon()">Abandonner</b-button>
          </b-form>
      </b-row>
  </b-container>
  </div>        
</template>

<script>
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'EditComment',
  components: {
    Header,
    Menu
  },
  setup () {
      const state = reactive({
          input: {
              textComment: ''
          },
      })
      const rulesComment = computed(() => {
          return {
              input: {
                  textComment: { required },
              },
          }
      })
      const vComment$ = useVuelidate(rulesComment, state)
      return { state, vComment$ }
  },
  methods: {
    submitFormComment() {
        this.vComment$.$validate();
        if(!this.vComment$.$error) {
            return true;
        } else {
            this.error = '';
            return false;
        }
    },
    editComment: function () {
      if(this.submitFormComment()) {
        const self = this;
        this.$store.dispatch('modificationComment', {commentAll: self.state.input, commentId: self.$route.params.id})
        .then(function () {
          self.$router.push('/memes');
        }, function (error) {
          self.error = error.response.data.error;
        })
      }  
    },
    abandon: function () {
      this.$router.push('/memes');
    }
  }
}
</script>


<style scoped lang="scss">
</style>