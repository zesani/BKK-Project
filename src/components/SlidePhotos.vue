<template lang="html">
  <transition name="slide-fade">
    <div class="modal is-active" v-if="show">
      <div class="modal-background" @click="showSlidePhoto(0)">
      </div>
      <div class="modal-card">
        <div class="modal-card-body pop-photo" >
          <div class="close-photo">
            <span  @click="showSlidePhoto(0)"><i style="cursor:pointer;"class="fa fa-times-circle-o " aria-hidden="true"></i></span>
          </div>
          <div class="column is-hidden-tablet">
          </div>
          <div class="user-photo">
            <div class="slide-btn">
              <div class="button slide-btn-l" @click="backPhoto(index, photos.length, -1)">
                <span class="fa fa-chevron-left" style="font-size: 3em;"></span>
              </div>
              <div class="button slide-btn-r" @click="nextPhoto(index, photos.length, 1)">
                <span class="fa fa-chevron-right" style="font-size: 3em;"></span>
              </div>
            </div>
            <center>
              <img :src="photos[index].img" class="" alt="">
            </center>
          </div>
        </div>
      </div>
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
  height: 90vh;
  border-radius: 5px !important;
  margin-left: 0% !important;;
  margin-right: 0% !important;;
  color: black !important;
  padding-top: 0px !important;
  /*overflow: hidden;*/
  padding-left: 2%;
  padding-right: 2%;
}
.user-photo {
  /*border: 1px solid black;*/
  padding-left: 0%;
  padding-right: 0%;
  /*padding-bottom: 20%;*/
  position: relative;
  padding-top: 6%;
}
.user-photo img{
  max-width: 100%;
  /*width: auto;*/
  max-height: 65vh;
}
.close-photo {
  /*border: 1px solid black;*/
  padding-top: 1% !important;
  padding-left: 90%;
  padding-right: 0% !important;
  /*padding-left: 95% !important;*/
  color: #cfcfcf;
}
.close-photo i {
  position: absolute;
  right: 7px;
  top: 4px;
  z-index: 1;
  font-size: 2em;
  /*margin-left: 95%;*/
}
.slide-btn {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.slide-btn .slide-btn-l {
  float: left;
  background: linear-gradient(to left, rgba(0,0,0,0) , rgba(0,0,0,0));
}
.slide-btn .slide-btn-r {
  float: right;
  background: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0));
}
.slide-btn .slide-btn-l, .slide-btn .slide-btn-r {
  height: 50%;
  width: 25%;
  color: #FFF;
  border: 0;
  padding: 0;
  opacity: 1;
}
.slide-btn:hover .slide-btn-l, .slide-btn:hover .slide-btn-r {
}
</style>
