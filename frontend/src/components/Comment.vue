<template>
<div>
        <div class="comment bg-light mb-2 p-2">

                <p class="comment__creator" @click="goToProfile()">{{comment.Utilisateur.prenom}} {{comment.Utilisateur.prenom}}</p>
                <b-dropdown id="dropdown-1" text="" dropleft size="sm"
                    variant="outline-success"
                    class="comment__dropdown"
                    v-if="comment.UtilisateurId === this.utilisateurInfo.id || this.utilisateurInfo.fonction === true"
                    >
                        <b-dropdown-item
                        v-if="comment.UtilisateurId === this.utilisateurInfo.id || this.utilisateurInfo.fonction === true"
                        variant="primary"
                        size="sm"
                        class="m-1"
                        @click="deleteComment(comment.id)">
                        Supprimer</b-dropdown-item>

                        <b-dropdown-item
                        v-if="comment.UtilisateurId === this.utilisateurInfo.id"
                        variant="primary"
                        size="sm"
                        class="m-1"
                        @click="editComment()">
                        Modifier</b-dropdown-item>
                    </b-dropdown>

            <p class="comment__date">{{comment.updatedAt}}</p>
            <p>{{comment.textComment}}</p> 
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object
        },
    },
  computed: {
    ...mapState({
      comments: 'comments',
      utilisateur_token_id: 'utilisateur',
      utilisateurInfo: 'utilisateurInfo'
    })
  },
    mounted: function () {
        //console.log(this.comment);
    },
    methods: {
        deleteComment: function (id) {
            const self = this;
            this.$store.dispatch('suppressionComment', id)
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
        editComment: function () {
            this.$router.push(`/editComment/${this.comment.id}`);
        },
        goToProfile: function () {
            this.$router.push(`/profil/${this.comment.Utilisateur.id}`);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
    list-style-type: none;
}
.comment {
    border: 1px solid #bdc7d0;
    border-radius: 3%;
    position: relative;
    &__creator {
    height: 50px;
    line-height: 50px;
    display: inline;

    text-align: center;
    color: blue;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;

    }
    &__dropdown {
        position: absolute;
        right: 5px;
        top: 5px;
        
    }
    &__date {
        font-size: 0.8em;
    }
}


</style>
