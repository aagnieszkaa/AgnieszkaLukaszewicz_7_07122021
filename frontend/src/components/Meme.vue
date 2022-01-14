<template>
    <b-card
    no-body
    class="
    mb-4 
    col-12
    col-md-8
    card-parent
    ">
        <b-card-header class="card-content">    
            <b-card-text @click="goToProfile()" class="card-content__user">{{ publication.Utilisateur.prenom }} {{ publication.Utilisateur.nom }}</b-card-text>
            <p class="card-content__date">{{ formatDate(publication.updatedAt) }}</p> 
            <b-dropdown id="dropdown-1" text="" dropleft size="sm"
            class="card-content__dropdown"
            variant="outline-success"
            v-if="publication.UtilisateurId === utilisateurInfo.id || utilisateurInfo.fonction === true"
            >
                <b-dropdown-item
                v-if="publication.UtilisateurId === utilisateurInfo.id || utilisateurInfo.fonction === true"
                @click="deletePost(publication.id)">
                Supprimer</b-dropdown-item >

                <b-dropdown-item 
                v-if="publication.UtilisateurId === utilisateurInfo.id"
                @click="editPublication()">
                Modifier</b-dropdown-item>
            </b-dropdown>
              
            <b-card-title>{{publication.title}}</b-card-title>
        </b-card-header>
        <b-card-img 
        :src="publication.post_image" 
        alt="Publication" 
        bottom
        class="mb-2 card-content__img">
        </b-card-img>
        <b-card-body>
            
            <b-card-text>{{publication.textContent}}</b-card-text>
            <div>


                <b-button 
                variant="primary"
                @click="hideMe()"
                v-if="mode == 'shown'"
                class="mb-2"
                >Cacher</b-button>

                <b-button 
                variant="primary"
                @click="showMe()"
                v-else
                class="mb-2"
                >Commentaires...</b-button>
                <p>{{comments}}</p>
                <b-row>
                    <ul v-if="mode === 'shown'">
                        <li v-for="item in publication.Comments" v-bind:key="item" class="col-12">
                        <Comment
                            :comment="item" class="col-12">
                        </Comment>
                        </li>
                    </ul>
                </b-row>
                <b-form class="d-flex formulaire justify-content-between">
                    <b-form-textarea
                    class="
                    border border-success
                    formulaire__input
                    "
                    v-model="state.input.textComment"
                    placeholder="Écrivez votre commentaire..."
                    ></b-form-textarea>

                    <b-button 
                    variant="success"
                    class="
                    formulaire__button
                    "
                    @click="createComment()">
                    Envoyer
                    </b-button>
                </b-form>
                <span class="error" v-if="vComment$.input.textComment.$error">
                    {{ vComment$.input.textComment.$errors[0].$message }}
                </span>
            </div>
        </b-card-body>
  
    </b-card> 

</template>

<script>
import { mapState } from 'vuex';
import Comment from '@/components/Comment.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import moment from "moment";

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
        }),
    },
    mounted: function (){
        const self = this;
        self.state.input.creatorId = self.utilisateur_token_id.utilisateurId;
        self.state.input.publicationId = self.publication.id; 
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
                    textComment: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
                },
            }
        })
        const vComment$ = useVuelidate(rulesComment, state, { $scope: false })
        return { state, vComment$ }
    },
    data: function () {
        return {
            error: '',
            mode: '',
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY hh:mm')
        },
        showMe: function () {
            this.mode = 'shown';
        },
        hideMe: function () {
            this.mode = '';
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
            .then(function () {
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
            if(this.submitFormComment()) {
                const self = this;
                self.$store.dispatch('commentContent', this.state.input)
                .then(function () {
                    self.refreshData();
                    self.showMe();
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
/*
@mixin desktop {
  @media screen and (min-width: 993px){
    @content;
  }
}
*/

.card-parent {
    border: 1px solid #bdc7d0;
    border-radius: 2%;
}
.card-content {
    position: relative;
    width: 100%;
    &__img {
        height: 250px;
        object-fit: cover;
        @include desktop {
            height: 400px;
        }
    }
    &__user {
        color: blue;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 40px;
        height: 40px;
        margin-bottom: 0;
    }
    &__date {
        color: grey;
        font-size: 0.8rem;
    }
    &__dropdown {
    position: absolute;
    right: 5px;
    top: 5px;
    }
}

.formulaire {
    width: 100%;
    padding: 2px;

    &__input {
        width: 69%;
    }
    &__button {
        width: 30%;
    }
}

</style>