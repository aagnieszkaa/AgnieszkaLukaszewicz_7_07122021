<template>
    <ul>
        <li>{{comment.textContent}}</li>
        <!-- not working
        <li>{{comment.Utilisateur.prenom}}</li>
        -->
    </ul>
</template>

<script>

export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object
        },
    },
    mounted: function () {
        //console.log(this.comment);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
