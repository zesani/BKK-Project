<template lang="html">
  <div class="">
    <h1>Report</h1>
    เรื่อง<input type="text" v-model="topic"><br>
    <gmap-map
      :center="centerMap"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px; margin: auto;"
    >
      <gmap-marker
        :position="locationGps"
        :clickable="true"
        :draggable="true"
        @mouseup="setLocation($event)"
      ></gmap-marker>
    </gmap-map>
    สถานที่เกิดเหตุ<input type="text" v-model="location"><br>
    <div class="" v-for="(photo, index) in photos">
      <img :src="photo.img" /><input type="file" @change="onFileChange" @click="indexPhoto = index"><br>
    </div>
    <button type="button" name="button" @click="addPhoto">add</button><br>
    รายละเอียด<input type="text" v-model="description"><br>
    ชื่อ-สกุล<input type="text" v-model="fullName"><br>
    เบอร์โทร<input type="text" v-model="phone"><br>
    <button type="button" @click="add (topic, photos, locationGps, location, description, fullName, phone)">เพิ่มปัญหา</button>
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
