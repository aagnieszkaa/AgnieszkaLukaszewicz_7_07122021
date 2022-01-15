<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <b-container>
      <b-row>
        <b-form class="mt-4
        col-12 
        offset-lg-3 col-lg-6">
          <b-form-textarea
              id="textarea-small"
              size="sm"
              placeholder="Modifiez votre commentaire..."
              v-model="state.input.textComment"
          ></b-form-textarea>
          <span class="error" v-if="vComment$.input.textComment.$error">
              {{ vComment$.input.textComment.$errors[0].$message }}
          </span>
          <div>
            <b-button 
            variant="primary"
            size="sm"
            class="
            offset-1 col-4
            offset-md-3 col-md-2
            mt-3"
            @click="editComment()">
            Modifier
            </b-button>

            <b-button 
            variant="primary"
            size="sm"
            class="
            offset-2 col-4
            offset-md-2 col-md-2
            mt-3"
            @click="abandon()">Abandonner</b-button>
          </div>   
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
  name: 'EditComment',
  components: {
    Header,
    Menu
  },
  computed: {
    ...mapState({
    commentInfo: 'commentInfo',
    })
  },
  mounted: function (){
    const self = this;
    const urlId = this.$route.params.id;
    this.$store.dispatch('oneCommentInfo', urlId)
    .then(function () {
      self.state.input.textComment = self.commentInfo.textComment;
    })
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
          textComment: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
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