<template>
    <ul>
        <li>{{comment.textContent}}</li>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
