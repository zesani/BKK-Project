<template lang="html">
  <div class="">
    <h1>Report</h1>
    เรื่อง<input type="text" v-model="topic"><br>
    สถานที่เกิดเหตุ<input type="text" v-model="location"><br>
    รายละเอียด<input type="text" v-model="description"><br>
    ชื่อ-สกุล<input type="text" v-model="fullName"><br>
    เบอร์โทร<input type="text" v-model="phone"><br>
    <button type="button" @click="add (topic, location, description, fullName, phone)">เพิ่มปัญหา</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      topic: '',
      location: '',
      fullName: '',
      phone: '',
      description: ''
    }
  },
  methods: {
    ...mapActions(['addIssue']),
    add (topic, location, description, fullName, phone) {
      this.addIssue({
        topic,
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
    }
  }
}
</script>

<style lang="css">
</style>
