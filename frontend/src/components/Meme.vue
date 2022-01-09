<template>
    <b-card
    :img-src="publication.post_image"
    img-alt="Meme"
    img-top
    class="mb-2 offset-2 col-8">
        <b-card-title>{{publication.title}}</b-card-title>
        <b-card-text>auteur : {{ publication.Utilisateur.prenom }} {{ publication.Utilisateur.nom }}</b-card-text>
        <b-card-text>{{publication.textContent}}</b-card-text>
        <b-card-footer>
        <li>Créé le : {{publication.createdAt}}</li>
        <li>Dernière modification : {{publication.updatedAt}}</li>
        <b-button 
        variant="primary"
        @click="deletePost(publication.id)">
        Supprimer</b-button><br>

        <b-button 
        variant="primary"
        class="mt-2"
        @click="editPublication()">
        Modifier</b-button>

        </b-card-footer>   
    </b-card> 
</template>

<script>
//import { mapState } from 'vuex';

export default {
    name: 'Meme',
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
            this.$router.push('/editPublication');
      },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
