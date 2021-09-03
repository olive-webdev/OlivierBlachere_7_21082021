<template>
    <div class="d-flex justify-content-center">
        <div id="login" class="bg-white round px-5 shadow mt-5 w-25">
            <img src="@/assets/icon.svg" height="150" alt="" class="mb-3" />
            <form @submit.prevent="">
                <div v-if="status == 'errorLogin'" class="text-danger mb-4">Impossible de se connecter, vérifier votre email et votre mot de passe</div>
                <div v-if="status == 'errorSignup'" class="text-danger mb-4">Impossible de créer ce compte, utilisateur déjà enregistré</div>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label red" >Adresse Email</label >
                    <input v-model="email" @change="validationEmail()" type="email" class="form-control " id="InputEmail" aria-describedby="emailHelp"
                    placeholder="Entrer votre email..." />
                    <div v-if="!validEmail" class="form-text text-danger">L'email n'est pas valide</div>
                </div>
                <div v-if="!toggle" class="mb-3">
                    <label for="InputSurname" class="form-label red" >Nom</label >
                    <input v-model="nom" @change="validationNom()" type="text" class="form-control " id="InputSurname" aria-describedby="emailHelp"
                    placeholder="Entrer votre nom..." />
                    <div v-if="!validNom" class="form-text text-danger">Le nom doit être renseigné</div>
                </div>
                <div v-if="!toggle" class="mb-3">
                    <label for="InputName" class="form-label red" >Prénom</label >
                    <input v-model="prenom" @change="validationPrenom()" type="text" class="form-control " id="InputName" aria-describedby="emailHelp"
                    placeholder="Entrer votre prénom..." />
                    <div v-if="!validPrenom" class="form-text text-danger">Le prénom doit être renseigné</div>
                </div>
                <div class="mb-3">
                    <label for="InputPassword" class="form-label red" >Mot de passe</label>
                    <input v-model="password" @change="validationPassword()" type="password" class="form-control " id="InputPassword"
                    placeholder="Entrer votre mot de passe" />
                    <div v-if="!validPassword" class="form-text text-danger">Le mot de passe n'est pas valide, il doit comporter au moins 8 caractères dont un chiffre, des minuscules et majuscules</div>
                </div>
                <button v-if="toggle" :disabled="!validForm" type="submit" class="btn btn-primary my-3 w-100" @click="login()">
                    <span v-if="status == 'connecting...'">Connection en cours</span><span v-else>Se connecter</span>
                </button>
                <button v-else :disabled="!validForm" type="submit" class="btn btn-primary my-3 w-100" @click="signup()">S'inscrire</button>
                <p v-if="toggle" @click="switching()" class="mt-3 pointer">Pas encore de compte ?</p>
                <p v-else @click="switching()" class="mt-3 pointer">Déjà enregistré ?</p>
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
            toggle: true,email: ref(''),password: ref(''),nom: ref(''),prenom: ref(''),
            validEmail: Boolean,validPassword: Boolean,validNom: Boolean,validPrenom: Boolean,
        }
    },
    computed:{
        validForm: function(){
            if(this.toggle && validator.validate(this.email) && schema.validate(this.password)){return true;}
            else if(!this.toggle && validator.validate(this.email) &&
             schema.validate(this.password) && this.nom.length > 2 && this.prenom.length > 2){return true;}
            else{return false;}
        },
        ...mapState(['status'])
    },
    methods:{
        switching(){
            this.toggle = !this.toggle;
        },
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
            .then(function (){console.log();self.$router.push('postfeed')})
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

<style lang="scss" scoped>


</style>>

