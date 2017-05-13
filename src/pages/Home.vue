<template lang="html">
  <div class="">
    <h1>Home</h1>
      <div v-for="issue in issues">{{ issue }}
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
    ...mapGetters(['issues'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>

<style lang="css">
</style>
