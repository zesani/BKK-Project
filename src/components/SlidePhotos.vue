<template lang="html">
  <transition name="slide-fade">
    <div class="modal is-active" v-if="show">
      <div class="modal-background"></div>
      <div class="modal-card">
        <div class="modal-card-body pop-photo" >
          <div class="close-photo">
            <span  @click="showSlidePhoto(0)"><i style="cursor:pointer;"class="fa fa-times-circle-o " aria-hidden="true"></i></span>
          </div>
          <div class="column is-hidden-tablet">
          </div>
          <div class="user-photo">
            <img :src="photos[index].img" class="" alt=""><br>
            <center>{{index + 1}}/ {{photos.length}}</a></center>
            <center><a class="button" @click="backPhoto(index, photos.length, -1)"><</a>
              <a class="button" @click="nextPhoto(index, photos.length, 1)">></a>
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
  padding-top: 6%;
}
.user-photo img{
  width: 100%;
  /*width: auto;*/
  height: auto;
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
  /*margin-left: 95%;*/
}
</style>
