<template>
  <div class="bg-white round d-flex pt-3 flex-column p-4 mb-4 shadow">
    <div class="d-flex justify-content-between">
      <img class="round borderG" src="" height="60" alt="" />
      <div class="me-auto ms-3 text-secondary">
        <h3 class="m-0 red">Prénom Nom</h3>
        <p class="text-start">Il y a 8 minutes</p>
      </div>

      <div class="dropdown">
        <div class="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
          <img class="w-100 round mb-3" src="http://lorempixel.com/700/639" alt="" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between text-secondary">
      <a class="text-decoration-none text-secondary" data-bs-toggle="collapse" href="#collapseExample" role="button"
        aria-expanded="false" aria-controls="collapseExample">
        4 commentaires
      </a>
      <p>vu par 144 personnes</p>
    </div>

    <div class="collapse" id="collapseExample">
    </div>
    <div class="d-flex position-relative">
      <img class="round-start border-right-0 borderG border-end-0" src="https://i.pravatar.cc/60?img=1" />
      <input class=" form-controlled border-start-0 w-100 round-end position-relative ps-5 borderG " 
      type="text" placeholder="Écrivez un commentaire..." />
    </div>
  </div>
</template>

<script>

  export default {
    name: "PostFeed",
    components: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>