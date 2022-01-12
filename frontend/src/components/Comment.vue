<template>
    <div>
        <p>{{comment.textContent}}</p>
        <p>{{comment.textComment}} dupa</p>
<!--
        <p>{{comment.Utilisateur.prenom}}</p>
-->
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
    list-style-type: none;
}
</style>
