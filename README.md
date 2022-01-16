# Créez un réseau social d’entreprise

Projet 7 de la formation Développeur Web chez OpenClassrooms

## Démarrage du projet :

### 1. Entrez dans la ligne de commandes et cloner le projet avec la commande : 

$ git clone https://github.com/aagnieszkaa/AgnieszkaLukaszewicz_7_07122021.git

### 2. Entrez dans le fichier config.json (backend > config > config.json) et configurez les entrées suivantes de l'objet "development" selon les paramètres de votre base de données :

- "username"
- "password"
- "database"

### 3. Démarrez le backend :

- Ouvrez le terminal de votre éditeur de code et placez-vous dans le dossier backend : 
cd backend
- Installez les dépendances du projet :
npm install
- Lancez le backend :
nodemon server

### 4. Démarrez le frontend :

- Ouvrez un nouveau terminal de votre éditeur de code et placez-vous dans le dossier frontend : 
cd frontend
- Installez les dépendances du projet :
npm install
- Lancez le frontend :
npm run serve
- Allez à l'adresse : http://localhost:8080/

## Utilisation : 

### 1. Création du compte :

L'adresse e-mail doit être valide et vous ne pouvez pas l'utiliser pour 2 comptes différentes.

Il y a 2 types de compte : employé et chargé de la communication. Ce deuxième possède les droits d'administrateur et peut supprimer les publications et commentaires des autres utilisateurs. Afin de créer un compte en tant que chargé de la communication, renseignez le mot de passe suivant dans l'entrée 'Mot de passe fourni par les RH' : 
gyktlpo224

### 2. Connexion :

Votre compte sera bloqué pour 5 minutes après 5 tentatives de connexion. 

### 3. Fonctionnalités : 

Vous pouvez modifier votre profil ou le désactiver depuis l'onglet 'profil'.
Vous pouvez publier, modifier et supprimer les publications contenant des images. Chaque publication peut être commentée. 
Vous pouvez vous déconnecter depuis votre profil ou depuis le menu.

## Spécifiations de l’API

Base URL : http://localhost:3000/api/

Aucune entrée de la base de donnés ne peut pas être nulle.

### USER /auth

{ id : integer, nom : string, prenom : string, mot_de_passe : string, image_chemin : string, fonction : boolean, enabled : boolean, createdAt : datetime, updatedAt : datetime }

![USER_API](https://user-images.githubusercontent.com/81988403/149644642-e66e2c53-5cad-4803-8cec-9225cf19edc5.PNG)

### PUBLICATION /publications

{ id : integer, title : string, post_image : string, textContent : string, PublicationId : integer, createdAt : datetime, updatedAt : datetime }

![PUBLICATION_API](https://user-images.githubusercontent.com/81988403/149644648-a685de82-8133-4bb4-8c7f-cc46163b418c.PNG)
### COMMENT /comments

{ id : integer, textComment : string, PublicationId : integer, CommentId : integer, createdAt : datetime, updatedAt : datetime }

![COMMENT_API](https://user-images.githubusercontent.com/81988403/149644667-62450642-2114-40e8-96ca-3e4820e693eb.PNG)




