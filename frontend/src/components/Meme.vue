<template>
    <b-card
    no-body
    class="
    bg-light
    mb-4 
    col-12
    col-md-8
    card-parent
    ">
        <b-card-header class="card-parent__card-content">    
            <h3 @click="goToProfile()" class="card-parent__card-content__user text-dark">{{ publication.Utilisateur.prenom }} {{ publication.Utilisateur.nom }}</h3>
            <p class="card-parent__card-content__date">{{ formatDate(publication.updatedAt) }}</p> 
            <b-dropdown id="dropdown-1" dropleft size="sm"
            class="card-parent__card-content__dropdown"
            variant="outline-danger"
            role="menu"
            v-if="publication.UtilisateurId === utilisateurInfo.id || utilisateurInfo.fonction === true"
            >
                <template #button-content>
                <p class="card-parent__card-content__dropdown__p">dropdown list</p>
                </template>
                <b-dropdown-item
                role="menuItem"
                variant="danger"
                v-if="publication.UtilisateurId === utilisateurInfo.id || utilisateurInfo.fonction === true"
                @click="deletePost(publication.id)">
                    <span role="menuitem">Supprimer</span>
                </b-dropdown-item >
                <b-dropdown-item 
                variant="dark"
                role="menuItem"
                v-if="publication.UtilisateurId === utilisateurInfo.id"
                @click="editPublication()">
                    <span role="menuitem">Modifier</span>
                </b-dropdown-item>
            </b-dropdown>  
            <b-card-title>{{publication.title}}</b-card-title>
        </b-card-header>
        <b-card-img 
        :src="publication.post_image" 
        :alt="getImgAlt()" 
        bottom
        class="card-parent__card-content__img">
        </b-card-img>
        <b-card-body> 
            <span class="span">{{likesCount}}</span>
            <button class="button--like"
            @click="postLike()">
                <i class="fas fa-heart button--like__icon"></i> 
                J'aime
            </button>
            
            <b-card-text>{{publication.textContent}}</b-card-text>
            <div>
                <b-button 
                variant="danger"
                @click="hideMe()"
                v-if="mode == 'shown'"
                class="mb-2"
                >Cacher</b-button>
                <b-button 
                variant="dark"
                @click="showMe()"
                v-else
                class="mb-2"
                >Commentaires...</b-button>
                <b-row>
                    <ul v-if="mode === 'shown'">
                        <li v-for="item in comments" v-bind:key="item" class="col-12">
                            <Comment
                                :comment="item" 
                                @delComment="refreshComments()"
                                class="col-12">
                            </Comment>
                        </li>
                    </ul>
                </b-row>
                <b-form class="d-flex formulaire justify-content-between">
                    
                    <b-form-textarea
                    class="
                    border border-danger
                    formulaire__input
                    "
                    id="textarea"
                    v-model="state.input.textComment"
                    placeholder="Écrivez votre commentaire..."
                    ></b-form-textarea>
                    <b-button 
                    variant="danger"
                    class="formulaire__button"
                    @click="createComment()">
                        <span v-if="status == 'loading'">En cours...</span>
                        <span v-else>Envoyer</span>
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
            publications: 'publications',
            status: 'status',
        }),
    },
    mounted: function () {
        const self = this;
        self.state.input.creatorId = self.utilisateur_token_id.utilisateurId;
        self.state.input.publicationId = self.publication.id; 
        self.refreshComments();
        self.likesCount = self.publication.likes;
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
            comments: '',
            likesCount: null,
            like: false
        }
    },
    methods: {
        getImgAlt() {
            return 'Photo de publication ' + this.publication.id;
        },
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
            this.$store.dispatch('suppressionPublication', id)
            .then(() => {
                this.refreshData();
            }, (error) => {
                this.error = error.response.data.error;
            })
        },
        refreshData: function () {
            this.$store.dispatch('showPublications')
            .then(() => {
            }, (error) => {
                this.error = error.response.data.error;
            })
        },
        refreshComments: function () {
            const self = this;
            const postId = self.publication.id;
            this.$store.dispatch('showComments', postId)
            .then((response) => {
                this.comments = response.data;
            }, (error) => {
                this.error = error.response.data.error;
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
                this.$store.dispatch('commentContent', this.state.input)
                .then(() => {
                    this.refreshComments();
                    this.showMe();
                }, (error) => {
                    this.error = error.response.data.error;
                })
            }
        }, 
        postLike() {
            const self = this;
            const utilisateurId = self.utilisateur_token_id.utilisateurId;
            const publicationId = self.publication.id;
            console.log(utilisateurId);
            console.log(publicationId);
            this.$store.dispatch('publicationLike', {utilisateurId, publicationId})
            .then((response) => {
                if (response.data.like == false) {
                this.like = false;
                this.likesCount--;
                } else {
                    this.like = true;
                    this.likesCount++;   
            }
            });
        },  
    }
}
</script>

<style scoped lang="scss">
/*
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
*/
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.card-parent {
    @include border;
    border-radius: 2%;
    &__card-content {
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
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 40px;
            height: 40px;
            margin-bottom: 0;
            font-weight: bold;
        }
        &__date {
            color: grey;
            font-size: 0.8rem;
        }
        &__dropdown {
        position: absolute;
        right: 5px;
        top: 5px;
        &__p {
            display: none;
        }
        }
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
    &__textarea {
        display: none;
    }
}
.button--like {
    background: none;
    border: 0;
    margin-bottom: 6px;
    font-size: 1.5em;
    /*border-bottom: 2px solid black;*/
    font-family: 'Dancing Script', cursive;
    &__icon {
        background: linear-gradient(180deg, #9f6bf2 0%, black 100%);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
       -webkit-text-fill-color:transparent;
    }
}
.span {
    font-family: 'Dancing Script', cursive;
}
</style>