<template>
    <div>
        <p>{{comment.textContent}}</p>
        <!-- not working
        <p>{{comment.Utilisateur.prenom}}</p>
        -->
    </div>

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
        console.log(this.comment);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
    list-style-type: none;
}
</style>
