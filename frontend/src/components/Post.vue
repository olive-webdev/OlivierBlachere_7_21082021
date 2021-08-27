<template>
  <div class="bg-white rounded-g d-flex pt-3 flex-column p-4 mb-4 shadow">
    <div class="d-flex justify-content-between">
      <img class="rounded-g borderG" src="https://i.pravatar.cc/60" height="60" alt="" />
      <div class="me-auto ms-3 text-secondary">
        <h3 class="m-0 red">Prénom Nom</h3>
        <p class="text-start">Il y a 8 minutes</p>
      </div>

      <div class="dropdown">
        <div class="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <BIconCaretDownSquare class="red fs-4" />
        </div>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
          <li>
            <a class="dropdown-item" href="#"><i class="bi bi-exclamation-circle-fill me-3"></i>Signaler</a>
          </li>
          <li>
            <a class="dropdown-item" href="#"><i class="bi bi-pencil-fill me-3"></i>modifier</a>
          </li>
          <li>
            <a class="dropdown-item" href="#"><i class="bi bi-person-fill me-3"></i>Voir le profil</a>
          </li>
          <li>
            <a class="dropdown-item" href="#"><i class="bi bi-pencil-fill me-3"></i>Répondre</a>
          </li>
          <li>
            <a class="dropdown-item text-danger" href="#"><i class="bi bi-trash-fill me-3"></i>Supprimer</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="">
      <p class="text-start">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium,
        sunt? &#x1F61C;
      </p>
      <div class="">
        <div class="">
          <img class="w-100 rounded-g mb-3" src="http://lorempixel.com/700/639" alt="" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between text-secondary">
      <p>
        <BIconHandThumbsUpFill class="red fs-5 mb-2" />12</p>

      <a class="text-decoration-none text-secondary" data-bs-toggle="collapse" href="#collapseExample" role="button"
        aria-expanded="false" aria-controls="collapseExample">
        4 commentaires
      </a>
      <p>vu par 144 personnes</p>
    </div>

    <div class="collapse" id="collapseExample">
      <Message />
      <Message />
    </div>
    <div class="d-flex position-relative">
      <img class="rounded-g-start border-right-0 borderG border-end-0" src="https://i.pravatar.cc/60?img=1" />
      <input class=" form-controlled border-start-0 w-100 rounded-g-end position-relative ps-5 borderG " 
      type="text" placeholder="Écrivez un commentaire..." />
      <BIconPencilFill class="position-absolute pen red fs-4" />
      <BIconEmojiSmileFill class="position-absolute smiley red fs-4" />
    </div>
  </div>
</template>

<script>
  import Message from "@/components/Message.vue";

  export default {
    name: "Post",
    props: {
      msg: String,
    },
    components: {
      Message,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>