<template>
    <b-card
    :img-src="publication.post_image"
    img-alt="Meme"
    img-top
    class="mb-2 offset-2 col-8">
        <b-card-title>{{publication.title}}</b-card-title>
        <b-card-text>auteur : <span @click="goToProfile()">{{ publication.Utilisateur.prenom }} {{ publication.Utilisateur.nom }}</span></b-card-text>
        <b-card-text>{{publication.textContent}}</b-card-text>



        <b-button 
        variant="secondary"
        @click="showMe()"
        v-if="mode =='notShown'"
        class="mb-2"
        >Afficher les commentaires...</b-button>

        <b-button 
        variant="secondary"
        @click="hideMe()"
        v-else
        class="mb-2"
        >Cacher</b-button>

        <ul v-if="showModal === true">
            <li v-for="item in publication.Comments" v-bind:key="item">
            <Comment
                :comment="item">
            </Comment>
            </li>
        </ul>

        <b-form>
            <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="state.input.textComment"
                placeholder="Écrivez votre commentaire..."
            ></b-form-textarea>
            <b-button 
            variant="primary"
            class="mt-2 mb-2"
            @click="createComment()">
            Envoyer
            </b-button>
        </b-form>

        <b-card-footer>
        <li>Créé le : {{publication.createdAt}}</li>
        <li>Dernière modification : {{publication.updatedAt}}</li>

        <b-button 
        v-if="publication.UtilisateurId === utilisateurInfo.id || utilisateurInfo.fonction === true"
        variant="primary"
        @click="deletePost(publication.id)">
        Supprimer</b-button><br>

        <b-button 
        v-if="publication.UtilisateurId === utilisateurInfo.id"
        variant="primary"
        class="mt-2"
        @click="editPublication()">
        Modifier</b-button>
        </b-card-footer>   
    </b-card> 
</template>

<script>
import { mapState } from 'vuex';
import Comment from '@/components/Comment.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name: 'Meme',
    components: {
        Comment,
    },
    props: {
        publication: {
            type: Object
        },
    },
    computed: {
        ...mapState({
        utilisateurInfo: 'utilisateurInfo',
        utilisateur_token_id: 'utilisateur',
        comments: 'comments',
        })
    },
    mounted: function (){
        const self = this;
        self.state.input.creatorId = self.utilisateur_token_id.utilisateurId;
        self.state.input.publicationId = self.publication.id;
        this.$store.dispatch('showComments');    
                console.log(this.showModal);
    },
    setup () {
        const state = reactive({
            input: {
                textComment: '',
                creatorId: '',
                publicationId: '',
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
    data: function () {
        return {
            error: '',
            showModal: false,
            showed: false,
            mode: 'notShown',
        }
    },
    methods: {
        showMe: function () {
            this.showed = true;
            this.showModal = true;
            this.mode = 'shown';
        },
        hideMe: function () {
            this.showed = false;
            this.showModal = false;
            this.mode = 'notShown';
        },
        deletePost: function (id) {
            const self = this;
            this.$store.dispatch('suppressionPublication', id)
            .then(function () {
                self.refreshData();
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        refreshData: function () {
            const self = this;
            self.$store.dispatch('showPublications')
            .then(function (response) {
                console.log(response);
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        editPublication: function () {
            this.$router.push(`/editPublication/${this.publication.id}`);
        },
        goToProfile: function () {
            this.$router.push(`/profil/${this.publication.Utilisateur.id}`);
        },
        submitFormComment() {
            this.vComment$.$validate();
            if(!this.vComment$.$error) {
                return true;
            } else {
                this.error = '';
                return false;
            }
        },
        createComment: function () {
            console.log(this.state.input)
            console.log(this.submitFormComment());
            if(this.submitFormComment()) {
                const self = this;
                this.$store.dispatch('commentContent', this.state.input)
                .then(function () {
                    self.refreshData();
                }, function (error) {
                    self.error = error.response.data.error;
                })
            }
        },   
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
    color: blue;
    cursor: pointer;
}
li {
    list-style-type: none;
}
</style>
