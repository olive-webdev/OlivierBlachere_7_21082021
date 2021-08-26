<template>
      <div class="container bg-light d-flex justify-content-between align-items-center py-3 pb-4">
      <router-link to="/">
        <img class="logo ms-3" src="../assets/icon-left-font-corrected.svg" alt="" />
      </router-link>

      <div class="d-flex flex-column align-items-center p-1 me-3">
        <div class="dropdown">
          <div class="d-flex" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="me-3 text-end fs-5 d-none d-md-block">
              <h3 class="red m-0">Prénom Nom</h3>
              <p class="red mb-0">@Administration</p>
            </div>
            <img class="rounded-g borderG shadow" src="@/assets/defaultProfilPicture.jpeg" height="60" width="60" alt="" />
          </div>

          <div id="nav" class="p-0 my-0 rounded-g dropdown-menu dropdown-menu-end wime" aria-labelledby="dropdownMenuButton1">
            <router-link class="black" to="/">
              <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg rounded-g-top ">
                <BIconJournalText class="ms-3 fs-2" />
                <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
              </div>
            </router-link>
            <router-link class="black" to="/profil">
              <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg " >
                <BIconPersonSquare class="ms-3 fs-2" />
                <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
              </div>
            </router-link>
            <router-link class="black" to="/admin">
              <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg rounded-g-bottom " >
                <BIconTools class="fs-2 ms-3" />
                <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name: "Header",
}
</script>

<style>

</style>