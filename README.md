Installation Projet 7
=====================

Pré-requis
----------

NodeJs version 14.17.4

MYSQL version 8.0.26

Sequelize CLI \[Node: 14.17.4, CLI: 6.2.0, ORM: 6.6.5\]

Nodemon version 2.0.12

## La base de données

L'application nécessite une base de données Mysql. Vous devez avoir un utilisateur avec les droits pour la base de données que l'on va créer.

Si vous n'avez pas d'utilisateur créé, vous pouvez en créer un de la façon suivante, en étant connecté en tant que root :
```
CREATE USER 'votreUtilisateur'@'localhost' IDENTIFIED BY 'votreMotDePasse';
```
Ensuite, nous allons créer la base de données qui servira au projet.
```
CREATE DATABASE groupomania_development;
```
Donnons les droits à l'utilisateur à la base de données
```
GRANT ALL PRIVILEGES ON groupomania_development.* TO 'votreUtilisateur'@'localhost';
```
On quitte la session root, on se connecte avec l'utilisateur
```
exit mysql -u votreUtilisateur -p
```
On sélectionne la base de données à utiliser
```
USE groupomania_development;
```
La base de données est prête.

## Le code du projet sur Github

Il faut le télécharger en vous rendant sur cette [page](https://github.com/olive-webdev/OlivierBlachere_7_21082021)

Veillez à avoir Sequelize CLI d'installé, sinon vous pouvez l'installer en global de la manière suivante :
```
npm install -g sequelize-cli
```
Veillez à avoir mysql2 d'installé, sinon vous pouvez l'installer en global de la manière suivante :
```
npm install -g mysql2
```
Veillez à avoir nodemon d'installé, sinon vous pouvez l'installer en global de la manière suivante :
```
npm install -g nodemon
```
Maintenant dans le dossier backend, il faut créer un fichier .env qui servira à stocker les données sensibles comme l'utilisateur de la base de données et son mot de passe et les variables tel que les ports
```
DB_USER=votreUtilisateur  
DB_PASS=votreMotDePasse  
TOKEN_PRIVATE_KEY=uneCléDeCryptagePourLeToken  
PORT=3000  
SERVER=http://localhost:3000
```
Toujours dans le dossier backend, exécutez les commandes suivants afin de faire une migration depuis Sequelize vers la base de données, et d'y ajouter des données nécessaires au bon fonctionnement de l'application. Et enfin d'installer les dépendances liés au projet et de lancer le serveur
```
cd backend  
sequelize db:migrate  
sequelize db:seed:all  
npm install  
nodemon serve
```
>Note: le serveur se lance sur le port 3000 par défault, vous pouvez toutefois le lancer sur un autre port en modifiant le fichier .env à la racine du dossier backend, et le fichier .env.development.local à la racine du dossier frontend (comme nous allons voir ci-après)_

Maintenant, dans le dossier frontend, créer un fichier .env.development.local
```
VUE_APP_SERVER=http://localhost:3000
```
Nous pouvons maintenant installer les dépendances liées au projet et lancer le serveur
```
cd frontend  
npm install  
npm run serve
```
Le serveur se lance sur le port 8080, rendez-vous sur votre navigateur à l'adresse [suivante](http://localhost:8080)

Vous pouvez vous connecter en tant qu'administrateur avec le login et mot de passe suivants

login : mentor@openclassrooms.fr  
mot de passe : password1A

Où vous pouvez créer un ou même plusieurs comptes utilisateur pour tester l'application  
En espérant que vous ayez une bonne expérience, sinon n'hésiter pas à me [contacter](mailto:olivier.blachere.dev@gmail.com)