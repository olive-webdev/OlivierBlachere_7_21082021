<template>
    <div
      id="nav"
      class="
        container
        bg-light
        d-flex
        justify-content-between
        align-items-center
        py-2
        pt-3
        pb-4
      "
    >
      <router-link to="/">
        <img
          class="logo ms-3"
          src="./assets/icon-left-font-corrected.svg"
          alt=""
        />
      </router-link>

      <div v-if="none" class="d-flex flex-column align-items-center p-1 me-3">
        <div class="dropdown">
          <div
            class="d-flex"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="me-3 text-end fs-5 d-none d-md-block">
              <h3 class="red m-0">Prénom Nom</h3>
              <p class="red mb-0">@Administration</p>
            </div>
            <img
              class="rounded-g borderG shadow"
              src="https       : //i.pravatar.cc/60?img = 1"
              alt=""
            />
          </div>

          <div
            id="nav2"
            class="p-0 my-0 rounded-g dropdown-menu dropdown-menu-end wime"
            aria-labelledby="dropdownMenuButton1"
          >
            <router-link class="black" to="/">
              <div
                class="
                  d-flex
                  dropdown-item
                  justify-content-between
                  align-items-center
                  py-3
                  bckg
                  rounded-g-top
                "
              >
                <BIconJournalText class="ms-3 fs-2" />
                <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
              </div>
            </router-link>
            <router-link class="black" to="/profil">
              <div
                class="
                  d-flex
                  dropdown-item
                  justify-content-between
                  align-items-center
                  py-3
                  bckg
                "
              >
                <BIconPersonSquare class="ms-3 fs-2" />
                <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
              </div>
            </router-link>
            <router-link class="black" to="/admin">
              <div
                class="
                  d-flex
                  dropdown-item
                  justify-content-between
                  align-items-center
                  py-3
                  bckg
                  rounded-g-bottom
                "
              >
                <BIconTools class="fs-2 ms-3" />
                <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  <router-view />
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang                            = "scss">
#app {
  font-family                          : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing               : antialiased;
  -moz-osx-font-smoothing              : grayscale;
  text-align                           : center;
  color                                : #2c3e50;
  background-color                     : hsl(0, 0%, 85%);
}

.borderG {
  border                               : 1px solid rgb(233, 68, 38);
}

.rounded-g {
  border-radius                        : 0.75rem;
}

.logo {
  height                               : 50px;
}

.black {
  color                                : black;
}
#nav2 a {
  text-decoration                      : none;
  font-weight                          : bold;

  &.router-link-exact-active .bckg {
    background-color                   : hsl(0, 44%, 96%);
  }
}
.rounded-g-top {
  border-radius                        : 0.75rem 0.75rem 0 0;
}
.rounded-g-bottom {
  border-radius                        : 0 0 0.75rem 0.75rem;
}
.rounded-g-start {
  border-radius                        : 0.75rem 0 0 0.75rem;
}
.rounded-g-end {
  border-radius                        : 0 0.75rem 0.75rem 0;
}

.btn-g {
  font-weight                          : 400;
  line-height                          : 1.5;
  color                                : #212529;
  text-align                           : center;
  text-decoration                      : none;
  vertical-align                       : middle;
  -moz-user-select                     : none;
  user-select                          : none;
  background-color                     : rgb(235, 204, 204);
  border                               : 1px solid rgb(233, 68, 38);
  padding                              : 0.375rem 0.75rem;
  font-size                            : 1rem;
  border-top-right-radius              : 0.75rem;
  border-bottom-right-radius           : 0.75rem;
  transition                           : color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-gp {
  font-weight                          : 400;
  line-height                          : 1.5;
  color                                : #212529;
  text-align                           : center;
  text-decoration                      : none;
  vertical-align                       : middle;
  -moz-user-select                     : none;
  user-select                          : none;
  background-color                     : rgb(235, 204, 204);
  border                               : 1px solid rgb(233, 68, 38);
  padding                              : 0.375rem 0.75rem;
  font-size                            : 1rem;
  border-radius                        : 0.75rem;
  transition                           : color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-groupomania {
  background-color                     : rgb(235, 204, 204);
  border-color                         : rgb(235, 204, 204);
}
textarea:focus, input:focus {
  outline                              : none;
}
.form-controlled {
  display                              : block;
  width                                : calc(100% - 60px - 85px);
  padding                              : 0.375rem 0.75rem;
  font-size                            : 1rem;
  font-weight                          : 400;
  line-height                          : 1.5;
  color                                : #212529;
  background-color                     : #fff;
  background-clip                      : padding-box;
  border                               : 1px solid rgb(233, 68, 38);
  -webkit-appearance                   : none;
  transition                           : border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.borderG {
  border                               : 1px solid rgb(233, 68, 38);
}
.borderGB {
  border                               : 4px solid rgb(233, 68, 38);
  animation                            : 2s linear infinite;
  animation-name                       : border;
}
.pen {
  left                                 : 4.5rem;
  top                                  : 1.2rem;
}

.smiley {
  right                                : 1rem;
  top                                  : 1.2rem;
}
.smileyh {
  right                                : 6.3rem;
  top                                  : 1.2rem;
}
.image {
  right                                : 9rem;
  top                                  : 1.2rem;
}
.red {
  color                                : rgb(233, 68, 38);
}
.pink {
  color                                : rgb(235, 204, 204);
}
.wime {
  width                                : 290px;
  height                               : 192px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
