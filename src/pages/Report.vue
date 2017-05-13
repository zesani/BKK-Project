<template lang="html">
  <div class="">
    <h1>Report</h1>
    เรื่อง<input type="text" v-model="topic"><br>
    <button type="button" @click="getLocation">ใช้ข้อมูลตำแหน่ง</button>
    {{ locationGps }}<br>
    <gmap-map
      :center="locationGps"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px; margin: auto;"
    >
      <gmap-marker
        :position="locationGps"
        :clickable="true"
        :draggable="true"
        @click="showPosition (position)"
      ></gmap-marker>
    </gmap-map>
    สถานที่เกิดเหตุ<input type="text" v-model="location"><br>
    รายละเอียด<input type="text" v-model="description"><br>
    ชื่อ-สกุล<input type="text" v-model="fullName"><br>
    เบอร์โทร<input type="text" v-model="phone"><br>
    <button type="button" @click="add (topic, locationGps, location, description, fullName, phone)">เพิ่มปัญหา</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAvSSKt1Pi6QUmAayLmtMCUhoMijhCjeqM',
    v: '3.27'
  }
})

export default {
  data () {
    return {
      topic: '',
      location: '',
      locationGps: {lat: 14.0224367, lng: 101.6217662},
      fullName: '',
      phone: '',
      description: ''
    }
  },
  methods: {
    ...mapActions(['addIssue']),
    add (topic, locationGps, location, description, fullName, phone) {
      this.addIssue({
        topic,
        locationGps,
        location,
        description,
        fullName,
        phone
      })
      this.topic = ''
      this.locationGps = ''
      this.location = ''
      this.description = ''
      this.fullName = ''
      this.phone = ''
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.addLocation)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    addLocation (position) {
      var location = {lat: position.coords.latitude, lng: position.coords.longitude}
      this.locationGps = location
    }
  }
}
</script>

<style lang="css">
</style>
