<template lang="html">
  <transition name="fade">
    <!--
    <div class="modal is-active" v-if="show">
      <div class="modal-background" @click="showSlidePhoto(0)">
      </div>
      <div class="modal-content">
        <div class="pop-photo">
          <img :src="photos[index].img" class="pop-photo" alt="">
        </div>
      </div>
      <button class="modal-close" @click="showSlidePhoto(0)"></button>
    </div>
    -->
    <div class="modal is-active" v-if="show">
      <div class="modal-background" @click="showSlidePhoto(0)"></div>
      <div class="modal-content">
        <div class="pop-photo">
          <div class="image">
            <img :src="photos[index].img" class="pop-photo" alt="">
          </div>
          <div class="button slide-btn-l" @click="backPhoto(index, photos.length, -1)">
            <span class="fa fa-chevron-left" style="font-size: 3em;"></span>
          </div>
          <div class="button slide-btn-r" @click="nextPhoto(index, photos.length, 1)">
            <span class="fa fa-chevron-right" style="font-size: 3em;"></span>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="showSlidePhoto(0)"></button>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['photos', 'index', 'showSlidePhoto', 'show', 'nextPhoto', 'backPhoto']
}
</script>

<style lang="css" scoped>
.pop-photo {
  max-height: 90vh;
  width: auto;
  margin: auto;
}
.slide-btn-l {
  left: 0;
  background: linear-gradient(to left, rgba(0,0,0,0) , rgba(0,0,0,0));
}
.slide-btn-l span {
  position: absolute;
  left: 10%;
}
.slide-btn-r {
  right: 0;
  background: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0));
}
.slide-btn-r span {
  position: absolute;
  right: 10%;
}
.slide-btn-l, .slide-btn-r {
  position: absolute;
  top: 0;
  height: 100%;
  width: 30%;
  color: #FFF;
  border: 0;
  padding: 0;
}
</style>
