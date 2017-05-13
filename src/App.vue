<template>
  <div id="app">
    <router-view></router-view>
    <router-link :to="'/'">Home</router-link>
    <router-link :to="'report'">Report</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  methods: {
    ...mapActions(['setIssuesRef', 'getLocation'])
  },
  created () {
    this.setIssuesRef()
    this.getLocation()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
