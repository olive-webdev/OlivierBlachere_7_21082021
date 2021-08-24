<template>
  <div class="d-flex mt-3">
    <img
      class="rounded-g borderG"
      src="https://i.pravatar.cc/60?img=2"
      height="60"
      alt=""
    />
    <div class="ms-3">
      <div class="bg-message rounded-g py-1 px-2  text-start">
        <h5 class="mb-0">Prénom Nom</h5>
        <p class="mb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio natus
          hic adipisci excepturi? Quaerat hic culpa corporis ut atque quas.
        </p>
      </div>
      <div class="text-secondary d-flex justify-content-between">
        <p class="">
          J'aime &#8226; Répondre &#8226; Signaler &#8226; il y a 2 minutes
        </p>
        <p><BIconHandThumbsUpFill class="" />12</p>
      </div>
      <div class="d-flex mt-3">
        <img
          class="rounded-g borderG"
          src="https://i.pravatar.cc/60?img=3"
          height="60"
          alt=""
        />
        <div class="ms-3">
          <div class="bg-message rounded-g py-1 px-2  text-start">
            <h5 class="mb-0">Prénom Nom</h5>
            <p class="mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              natus hic adipisci excepturi? Quaerat hic culpa corporis ut atque
              quas.
            </p>
          </div>
          <p class="text-secondary text-start">
            J'aime &#8226; Répondre &#8226; Signaler &#8226; il y a 2 minutes
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg-message{
    background-color: hsl(0, 44%, 96%);
}

</style>
