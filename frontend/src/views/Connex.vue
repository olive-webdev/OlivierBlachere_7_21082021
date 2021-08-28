<template>
  <div class="container bg-light">
    <Header />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import Login from "@/components/Login.vue"

export default {
  name: "Connex",
  components:{
    Header,
    Login
  },
  methods:{
    disconnect(){
      this.$store.state.isConnected = false;
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    }
  },
  mounted(){
    this.disconnect()
  },
};
</script>

<style scoped lang="scss">
</style>
