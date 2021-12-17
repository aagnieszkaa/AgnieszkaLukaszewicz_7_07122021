<template>
    <Header></Header>
    <b-container class="mt-4">
        <b-row>
            <b-card
                title="Agnieszka Lukaszewicz"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Photo de profil"
                img-top
                class="mb-2 offset-3 col-6">
                <b-card-text>Chargée de la communication</b-card-text>
                <b-card-text>a.lukaszewicz@outlook.com</b-card-text>
                <b-row>
                    <b-button 
                    variant="primary"
                    class="col-5"
                    >Supprimer le compte</b-button>

                    <b-button 
                    variant="primary"
                    class="offset-2 col-5"
                    >Modifier le compte</b-button>
                </b-row>
            </b-card>
        </b-row>
    </b-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Profil',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>

</style>