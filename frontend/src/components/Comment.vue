<template>
    <div>
        <div class="comment bg-light mb-2 p-2">
            <h5 class="comment__creator text-dark" @click="goToProfile()">{{comment.Utilisateur.prenom}} {{comment.Utilisateur.nom}}</h5>
            <b-dropdown id="dropdown-1" text="" dropleft size="sm"
            variant="outline-danger"
            class="comment__dropdown"
            v-if="comment.UtilisateurId === this.utilisateurInfo.id || this.utilisateurInfo.fonction === true"
            >
                <template #button-content>
                    <p class="comment__dropdown__text">dropdown list</p>
                </template>
                <b-dropdown-item
                v-if="comment.UtilisateurId === this.utilisateurInfo.id || this.utilisateurInfo.fonction === true"
                variant="danger"
                size="sm"
                class="m-1"
                @click="deleteComment(comment.id)">
                    <span role="menuitem">Supprimer</span>
                </b-dropdown-item>
                <b-dropdown-item
                v-if="comment.UtilisateurId === this.utilisateurInfo.id"
                variant="dark"
                size="sm"
                class="m-1"
                @click="editComment()">
                    <span role="menuitem">Modifier</span>
                </b-dropdown-item>
            </b-dropdown>
            <p class="comment__date">
                <span>{{ formatDate(comment.createdAt) }}</span><br>
                <span
                v-if='comment.updatedAt != comment.createdAt'>
                    Modifié le : {{ formatDate(comment.updatedAt) }}
                </span>
            </p> 
            <p>{{comment.textComment}}</p> 
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from "moment";

export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object
        },
    },
    computed: {
        ...mapState({
        utilisateur_token_id: 'utilisateur',
        utilisateurInfo: 'utilisateurInfo'
        })
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY hh:mm')
        },
        deleteComment: function (id) {
            this.$store.dispatch('suppressionComment', id)
            .then(() => {
                this.$emit("delComment");
            }, (error) => {
                self.error = error.response.data.error;
            })
        },
        editComment: function () {
            this.$router.push(`/editComment/${this.comment.id}`);
        },
        goToProfile: function () {
            this.$router.push(`/profil/${this.comment.Utilisateur.id}`);
        },
    }
}
</script>

<style scoped lang="scss">
.comment {
    @include border;
    border-radius: 3%;
    position: relative;
    &__creator {
    height: 50px;
    line-height: 50px;
    display: inline;
    text-align: center;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    }
    &__dropdown {
        position: absolute;
        right: 5px;
        top: 5px;  
        &__text {
            display: none;
        }
    }
    &__date {
        font-size: 0.8em;
    }
}
</style>
