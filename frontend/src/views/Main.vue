<template>
  <div class="container">
    <div class="bg-light row">
      <div class="col-3 d-none d-xl-block">
        <Menu msg="Welcome to Your Vue.js App" />
      </div>
      <div class="col-xl-9 col-12">
        <div
          class="
            bg-white
            rounded-g
            d-flex
            pt-3
            flex-column
            p-3
            mb-4
            shadow
            mx-3
          "
        >
          <div class="d-flex input-group">
            <img
              class="rounded-g-start borderG border-end-0"
              src="https://i.pravatar.cc/60?img=1"
              alt=""
            />
            <input
              type="text"
              class="form-controlled border-start-0 ps-5"
              placeholder="Quoi de neuf Prénom ?"
            />
            <div
              type="button"
              class="
                btn-g btn-g-groupomania
                d-flex
                align-items-center
                border-start-0
              "
            >
              <i class="fas fa-share"></i>Envoyer
              <BIconPencilFill class="position-absolute pen red fs-4" />
              <BIconEmojiSmileFill class="position-absolute smileyh red fs-4" />
              <BIconImage class="position-absolute image red fs-4" />
            </div>
          </div>
        </div>
        <Post msg="Welcome to Your Vue.js App" />
        <Post msg="Welcome to Your hhgVue.js App" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Post from "@/components/Post.vue";

export default {
  name: "Main",
  components: {
    Menu,
    Post,
  },
};
</script>

<style lang="scss"></style>
