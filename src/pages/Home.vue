<template lang="html">
  <div class="">
    <h1>Home</h1>
      <div v-for="issue in issues">
        <ul>
          <li>topic: {{issue.topic}}</li>
          <li>GPS: {{issue.locationGps}}</li>
          <li>สถานที่​: {{issue.location}}</li>
          <li>ชื่อ: {{issue.fullName}}</li>
          <li>โทรซ: {{issue.phone}}</li>
        </ul>
        <img v-for="photo in issue.photos" :src="photo.img" alt="">
      </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['issues', 'locationGps'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>

<style lang="css">
</style>
