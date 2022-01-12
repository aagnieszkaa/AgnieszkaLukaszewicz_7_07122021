<template>
    <b-card
    :img-src="publication.post_image"
    img-alt="Meme"
    img-top
    class="mb-2 offset-2 col-8">
        <b-card-title>{{publication.title}}</b-card-title>
        <b-card-text>auteur : <span @click="goToProfile()">{{ publication.Utilisateur.prenom }} {{ publication.Utilisateur.nom }}</span></b-card-text>
        <b-card-text>{{publication.textContent}}</b-card-text>

        <ul>
            <li v-for="item in publication.Comments" v-bind:key="item">
            <Comment
                :comment="item">
            </Comment>
            </li>
        </ul>

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
    data: function () {
        return {
            error: '',
        }
    },
    computed: {
        ...mapState({
        utilisateurInfo: 'utilisateurInfo',
        //comments: 'comments',
        })
    },
    mounted: function (){
        console.log(this.publication.Comments);
        const self = this;
        self.$store.dispatch('showComments');
    },
    methods: {
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
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
    color: blue;
}
</style>
