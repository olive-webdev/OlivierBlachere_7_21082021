<template>
    <div class=" bg-white rounded-g d-flex pt-3 flex-column p-3 mb-4 shadow" >
        <div class="d-flex input-group">
            <img class="rounded-g-start borderG border-end-0" src="https://i.pravatar.cc/60?img=1" alt="" />
            <input type="text" class="form-controlled border-start-0 ps-5" placeholder="Quoi de neuf Prénom ?" />
            <div type="button" class=" btn-g btn-g-groupomania d-flex align-items-center border-start-0 " >
                <BIconArrowRightSquare class="fs-4 me-2"/>Envoyer
                <BIconPencilFill class="position-absolute pen red fs-4" />
                <BIconEmojiSmileFill class="position-absolute smileyh red fs-4" />
                <BIconImage class="position-absolute image red fs-4" />
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.smileyh {
  right: 8rem;
  top: 1.2rem;
}
.image {
  right: 10.5rem;
  top: 1.2rem;
}
</style>>
