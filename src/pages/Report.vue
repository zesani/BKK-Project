<template lang="html">
  <div class="">
    <h1>Report</h1>
    เรื่อง<input type="text" v-model="topic"><br>
    <button type="button" @click="getLocation">ใช้ข้อมูลตำแหน่ง</button>
    {{ locationGps }}<br>
    สถานที่เกิดเหตุ<input type="text" v-model="location"><br>
    รายละเอียด<input type="text" v-model="description"><br>
    ชื่อ-สกุล<input type="text" v-model="fullName"><br>
    เบอร์โทร<input type="text" v-model="phone"><br>
    <button type="button" @click="add (topic, locationGps, location, description, fullName, phone)">เพิ่มปัญหา</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      topic: '',
      location: '',
      locationGps: '',
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
      var location = [position.coords.latitude, position.coords.longitude]
      this.locationGps = location
    }
  }
}
</script>

<style lang="css">
</style>
