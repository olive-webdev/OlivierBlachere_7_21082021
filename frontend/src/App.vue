<template>
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
