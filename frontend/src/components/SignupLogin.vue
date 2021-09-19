<template>
    <div class="d-flex justify-content-center">
        <div id="login" class="bg-white rounded px-5 shadow mt-0 mt-lg-5 d-flex flex-column align-items-center">
            <img src="@/assets/icon.svg" height="150" alt="" class="my-3 mx-auto" />
            <form @submit.prevent="">
                <div v-if="status == 'errorLogin'" class="text-danger mb-4">Impossible de se connecter, vérifier votre email et votre mot de passe</div>
                <div v-if="status == 'errorSignup'" class="text-danger mb-4">Impossible de créer ce compte, utilisateur déjà enregistré</div>
                <div class="mb-3 text-center">
                    <label for="InputEmail" class="form-label" >Adresse Email</label >
                    <input v-model="email" @change="validationEmail()" type="email" @focus="validEmail = true" class="form-control " id="InputEmail" aria-describedby="emailHelp"
                    placeholder="Entrer votre email..." />
                    <div v-if="!validEmail" class="form-text text-danger">L'email n'est pas valide</div>
                </div>
                <div v-if="$route.params.logorsign === 'signup'" class="mb-3 text-center">
                    <label for="InputSurname" class="form-label" >Nom</label >
                    <input v-model="nom" @change="validationNom()" type="text" @focus="validNom = true" class="form-control " id="InputSurname" aria-describedby="emailHelp"
                    placeholder="Entrer votre nom..." />
                    <div v-if="!validNom" class="form-text text-danger">Le nom doit être renseigné</div>
                </div>
                <div v-if="$route.params.logorsign === 'signup'" class="mb-3 text-center">
                    <label for="InputName" class="form-label" >Prénom</label >
                    <input v-model="prenom" @change="validationPrenom()" type="text" @focus="validPrenom = true" class="form-control " id="InputName" aria-describedby="emailHelp"
                    placeholder="Entrer votre prénom..." />
                    <div v-if="!validPrenom" class="form-text text-danger">Le prénom doit être renseigné</div>
                </div>
                <div class="mb-3 text-center">
                    <label for="InputPassword" class="form-label" >Mot de passe</label>
                    <input v-model="password" @change="validationPassword()" @focus="validPassword = true" type="password" class="form-control " id="InputPassword"
                    placeholder="Entrer votre mot de passe" />
                    <div v-if="!validPassword" class="form-text text-danger">Le mot de passe n'est pas valide,
                         il doit comporter au moins 8 caractères dont un chiffre, des minuscules et majuscules</div>
                </div>
                <button v-if="$route.params.logorsign == 'login'" :disabled="!validForm" type="submit" class="btn btn-secondary border-primary py-2 my-3 w-100" @click="login()">
                    <span v-if="status == 'connecting...'">Connection en cours</span><span v-else>Se connecter</span>
                </button>
                <button v-if="$route.params.logorsign == 'signup'" :disabled="!validForm" type="submit" class="btn btn-secondary border-primary py-2 my-3 w-100" @click="signup()">S'inscrire</button>
                <div class="text-center py-3">
                    <router-link :to="{ name: 'Connexion', params:{logorsign: 'login'}}" v-if="$route.params.logorsign === 'signup'" class="text-dark w-100 mx-auto">Déjà enregistré ?</router-link>
                    <router-link :to="{ name: 'Connexion', params:{logorsign: 'signup'}}" v-if="$route.params.logorsign === 'login'" class="text-dark w-100 mx-auto">Pas encore de compte ?</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { mapState } from 'vuex';
var validator = require("email-validator");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits(1).has().not().spaces()
export default {
    data(){
        return{
            email: ref(''),password: ref(''),nom: ref(''),prenom: ref(''),
            validEmail: Boolean,validPassword: Boolean,validNom: Boolean,validPrenom: Boolean,
        }
    },
    computed:{
        validForm: function(){
            if(this.$route.params.logorsign == 'login' && validator.validate(this.email) && schema.validate(this.password)){return true;}
            else if(this.$route.params.logorsign == 'signup' && validator.validate(this.email) && schema.validate(this.password) && this.nom.length > 2 && this.prenom.length > 2){return true;}
            else{return false;}
        },
        ...mapState(['status'])
    },
    methods:{
        validationEmail: function(){
            if(validator.validate(this.email)){this.validEmail = true;
            }else this.validEmail = false;
        },
        validationPassword: function(){
             if(schema.validate(this.password)){this.validPassword = true;
            }else this.validPassword = false;
        },
        validationNom: function(){
            if(this.nom.length > 2){this.validNom = true;
            }else this.validNom = false;
        },
        validationPrenom: function(){
            if(this.prenom.length > 2 ){this.validPrenom = true;
            }else this.validPrenom = false;
        },
        login(){
            const self = this;
            this.$store.dispatch('login', {
            email: this.email,
            password: this.password})
            .then(function (){console.log();self.$router.push('/postfeed')})
            .catch(function (error){console.log(error)})
        },
        signup(){
            const self = this;
            this.$store.dispatch('signup', {
            email: this.email,
            surname: this.nom,
            name: this.prenom,
            password: this.password})
            .then(function (){self.login()})
            .catch(function (error){console.log(error)})
        },
    }
}
</script>
