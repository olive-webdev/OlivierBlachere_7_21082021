<template>
  <div>
    <Header />

      <div class="container h d-flex bg-light px-4">
        <Menu />
        <div class="col-9">
          <WhatsUp />
        <Post msg="Welcome to Your Vue.js App" />
        <Post msg="Welcome to Your hhgVue.js App" />
        </div>
        </div>
      </div>


</template>

<script>
import Header from "@/components/Header.vue"
import Menu from "@/components/Menu.vue";
import WhatsUp from "@/components/WhatsUp.vue"
import Post from "@/components/Post.vue";

export default {
  name: "Main",
  components: {
    Header,
    Menu,
    WhatsUp,
    Post,
  },
};
</script>

<style lang="scss"></style>
