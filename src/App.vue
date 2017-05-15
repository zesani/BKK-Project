<template>
  <div id="app">
    <div class="columns">
      <div class="column is-hidden-touch">
        <router-view v-if="authorized"></router-view>
        <div class="" v-else>
          <button type="button" name="button" @click="login">Login With Facebook</button>
        </div>
        <router-link :to="'/'">Home</router-link>
        <router-link :to="'report'">Report</router-link>
      </div>
      <div class="column is-hidden-desktop">
        <router-view v-if="authorized"></router-view>
        <div class="" v-else>
          <button type="button" name="button" @click="login">Login With Facebook</button>
        </div>
        <router-link :to="'/'" class="menusize">Home </router-link>
        <span class="menusize"> | </span>
        <router-link :to="'report'" class="menusize"> Report</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  methods: {
    ...mapActions(['setIssuesRef', 'getLocation', 'login', 'checkLogin'])
  },
  computed: {
    ...mapGetters(['authorized'])
  },
  created () {
  },
  mounted () {
    this.setIssuesRef()
    this.getLocation()
    this.checkLogin()
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
.menusize {
  font-size:25px;
}
</style>
