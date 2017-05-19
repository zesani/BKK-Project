<template>
  <div id="app">
    <bar-header></bar-header>
    <router-view></router-view>
    <!-- <login></login> -->
    <footer-bar></footer-bar>
  </div>
  <!-- <section class="app">
     <div class="container"> -->
       <!-- <nav-menu></navMenu> -->
       <!-- <router-view v-if="authorized"></router-view>
       <div class="" v-else>
         <button type="button" name="button" @click="login">Login With Facebook</button>
       </div>
       <router-link :to="'/'">Home</router-link>
       <router-link :to="'report'">Report</router-link>
     </div>
 </section> -->

      <!-- <div class="column is-hidden-desktop">
        <router-view v-if="authorized"></router-view>
        <div class="" v-else>
          <button type="button" name="button" @click="login">Login With Facebook</button>
        </div>
        <router-link :to="'/'" class="menusize">Home </router-link>
        <span class="menusize"> | </span>
        <router-link :to="'report'" class="menusize"> Report</router-link>
      </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BarHeader from './components/BarHeader'
import FooterBar from './components/FooterBar'
import Login from './components/Login'
export default {
  name: 'app',
  methods: {
    ...mapActions(['setIssuesRef', 'getLocation', 'login', 'checkLogin'])
  },
  computed: {
    ...mapGetters(['authorized'])
  },
  components: {
    BarHeader,
    FooterBar,
    Login
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
@import url('https://fonts.googleapis.com/css?family=Kanit:300&subset=thai');
html, body {
  margin:0;
  padding:0;
  height:100% !important;
  background-color: #e6e6e6 !important;
}
#app {
  font-family: 'Kanit', sans-serif;
  /*height: 100%;*/
}
.coloraw{
  color: #0e8e5c !important;
}
</style>
