<template lang="html">
  <div class="">
    <h1>Home</h1>
    <ul>
      <li v-for="issue in issues">{{ issue }}</li>
    </ul>
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
