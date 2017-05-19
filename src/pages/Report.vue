<template lang="html">
  <div class="columns is-multiline report">
    <!-- <h1>Report</h1>
    เรื่อง<input type="text" v-model="topic"><br> -->
    <!-- <gmap-map :center="centerMap" :zoom="15" map-type-id="terrain" style="width: 500px; height: 300px; margin: auto;">
      <gmap-marker :position="locationGps" :clickable="true" :draggable="true" @mouseup="setLocation($event)"></gmap-marker>
    </gmap-map> -->
    <!-- สถานที่เกิดเหตุ<input type="text" v-model="location"><br>
    <div class="photo" v-for="(photo, index) in photos">
      <img :src="photo.img" v-show="photo.img !== ''"/>
      <div class="upload" v-show="photo.img === ''">
        <input type="file" @change="onFileChange" @click="indexPhoto = index">
      </div>
    </div> -->
    <!-- <button type="button" name="button" @click="addPhoto">add</button><br> -->
    <!-- รายละเอียด<input type="text" v-model="description"><br>
    ชื่อ-สกุล<input type="text" v-model="fullName"><br>
    เบอร์โทร<input type="text" v-model="phone"><br>
    <button type="button" @click="add (topic, photos, locationGps, location, description, fullName, phone)">เพิ่มปัญหา</button> -->
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
    <div class="space column is-6-tablet is-offset-3">
      <div class="field">
        <label class="label">เรื่อง </label>
        <input class="input" type="text" placeholder="(Ex.ท่อน้ำปะปาแตก)" v-model="topic"><br><br>
        <label class="label">สถานที่เกิดเหตุ</label>
        <input class="input" type="text" placeholder="(Ex.สี่แยกราชประสงค์)" v-model="location"><br><br>
        <input type="file" class="button is-primary font-issue" @change="onFileChange" @click="indexPhoto = photos.length-1"><br><br>
        <!-- <button class="button is-primary font-issue">เพิ่มรูป</button><br><br> -->
        <div class="columns is-mobile is-multiline is-gapless">
          <div v-if="photo.img !== ''" class="column box-x" v-for="(photo, index) in photos">
            <span class="level-center" @click="removePhoto(index)">
              <i class="fa fa-times-circle fa-5x level-item" aria-hidden="true"></i>
            </span>
            <img :src="photo.img" alt="">
          </div>
        </div>
        <label class="label">รายละเอียด</label>
        <textarea class="textarea" placeholder="รายละเอียด" v-model="description"></textarea><br>
        <label class="label">เบอร์โทรศัพท์</label>
        <input class="input" type="text" placeholder="xxx-xxxxxxx" v-model="phone"><br><br>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary font-issue" @click="add (topic, photos, locationGps, location, description, fullName, phone)">แจ้งเหตุ</button>
        </p>
        <p class="control">
          <button class="button is-link font-issue">ยกเลิก</button>
        </p>
      </div>
    </div>
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      topic: '',
      location: '',
      fullName: '',
      phone: '',
      description: '',
      photos: [{
        img: '',
        name: ''
      }],
      indexPhoto: 0,
      votes: []
    }
  },
  computed: {
    ...mapGetters(['locationGps', 'centerMap'])
  },
  methods: {
    ...mapActions(['addIssue', 'markLocation']),
    add (topic, photos, locationGps, location, description, fullName, phone) {
      this.addIssue({
        topic,
        photos,
        locationGps,
        location,
        description,
        fullName,
        phone
      })
      this.topic = ''
      this.location = ''
      this.description = ''
      this.fullName = ''
      this.phone = ''
      this.photos = [{
        img: '',
        name: ''
      }]
      this.$router.push('/')
    },
    addPhoto () {
      this.photos.push({
        img: '',
        name: '',
        file: ''
      })
    },
    removePhoto (index) {
      this.photos.splice(index, 1)
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.photos[vm.indexPhoto].img = e.target.result
        vm.photos[vm.indexPhoto].name = file.name
        vm.photos[vm.indexPhoto].file = file
        vm.addPhoto()
      }
      reader.readAsDataURL(file)
    },
    setLocation (event) {
      var location = {}
      location.lat = event.latLng.lat()
      location.lng = event.latLng.lng()
      this.markLocation(location)
    }
  }
}
</script>

<style lang="css" scope>
.photo img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.upload {
    /*width: 157px;
    height: 57px;*/
    width: 20%;
    overflow: hidden;
    float: right;
    background: url('http://www.free-icons-download.net/images/plus-logo-icon-27956.png');
    background-size: 57px;
    background-repeat: no-repeat;
    /*border: 1px solid black;*/
}
.upload input {
    float: right;
    display: block !important;
    /*width: 157px !important;*/
    height: 57px !important;
    opacity: 1 !important;
    overflow: hidden !important;
}
.report {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.space{
  background-color: white;
  border-radius: 2px;
}
.font-issue {
  font-family: 'Kanit', sans-serif;
}
.box-x img{
  width: 98%;
}
</style>
