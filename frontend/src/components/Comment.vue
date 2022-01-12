<template>
    <div>
        <div>
            <p>{{comment.textComment}} textComment</p>
            <p>{{comment.Utilisateur.prenom}}</p>
            <b-button 
            variant="primary"
            @click="deleteComment(comment.id)">
            Supprimer</b-button>
        </div>


    </div>

</template>

<script>
//import { mapState } from 'vuex';
export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object
        },
    },
    /*
  computed: {
    ...mapState({
      comments: 'comments',
    })
  },*/
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
    list-style-type: none;
}
</style>
