<template>
    <div>
        <Header></Header>
        <Menu></Menu>
        
        <b-container class="mt-4 mb-4">
            <b-row class="form">
                <b-form class="offset-1 col-10">
                    <h2>Modifier votre profil</h2>
                    <b-form-group
                    label="Nom :"
                    label-for="input-nom"
                    class="mb-2 mt-4">
                        <b-form-input
                        id="input-nom"
                        type="text">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Prénom :"
                    label-for="input-prenom"
                    class="mb-2">
                        <b-form-input
                        id="input-prenom"
                        type="text">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="E-mail :"
                    label-for="input-prenom"
                    class="mb-2">
                        <b-form-input
                        id="input-email"
                        type="email">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Mot de passe :"
                    label-for="input-mot_de_passe"
                    class="mb-2">
                        <b-form-input
                        id="input-mot_de_passe"
                        type="password">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Photo :"
                    label-for="input-photo"
                    class="mb-2">
                        <input type="file" 
                        id="input-photo"
                        accept="image/*">
                    </b-form-group>

                    <b-button variant="primary">Enregistrer</b-button>
                </b-form>
                <span>{{ error }}</span>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'


export default {
  name: 'EditUser',
  components: {
    Header,
    Menu
  },
}
</script>

<style lang="scss" scoped>
</style>




