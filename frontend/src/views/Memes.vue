<template>
    <div>
        <Header></Header>
        <Menu></Menu>
        <b-container class="mt-4">
            <b-row>
                <b-card
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Photo de profil"
                    img-top
                    class="mb-2 offset-3 col-6">
                    <b-card-title>Créé par : Agnieszka Lukaszewicz</b-card-title>
                    <b-card-text>27/12/2021</b-card-text>
                    <b-card-text>Description</b-card-text>
                    <b-row>
                        <b-button 
                        variant="primary"
                        class="col-5"
                        >Supprimer</b-button>

                        <b-button 
                        variant="primary"
                        class="offset-2 col-5"
                        >Modifier</b-button>
                    </b-row>
                </b-card>
            </b-row>
        </b-container>
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'Memes',
  components: {
    Header,
    Menu,
  },
}
</script>

<style lang="scss" scoped>

</style>