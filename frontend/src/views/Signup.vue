<template>
<Header></Header>
    <form class="form">
        <h2>Créer votre compte</h2>
        <div>
            <label for="nom">Nom : </label><br>
            <input type="text" id="nom" name="nom">
        </div>
        <div>
            <label for="prenom">Prénom : </label><br>
            <input type="text" id="prenom" name="prenom">
        </div>
        <div>
            <label for="email">E-mail : </label><br>
            <input type="email" id="email" name="email">
        </div>
        <div>
            <label for="mot_de_passe">Mot de passe : </label><br>
            <input type="password" id="mot_de_passe" name="mot_de_passe">
        </div>
        <div>
            <label for="image_chemin">Photo : </label>
            <input type="file">
        </div>
        <div>
            <p>Fonction : </p>
                <input type="radio" id="employee" name="fonction" value="employee">
                <label for="employee">Employée : </label>
                <input type="radio" id="charge_com" name="fonction" value="charge_com">   
                <label for="charge_com">Chargé de la communication : </label>       
        </div>
        <div>
            <label for="mdpRh">Mot de passe fourni par les RH : </label><br>
            <input type="password" id="mdpRh" name="mdpRh">
        </div>
        <button type="submit">Envoyer</button>
    </form>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Signup',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
    .form{
        width: 400px;
        margin: 0 auto;
    }
</style>