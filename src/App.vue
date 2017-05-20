<template>
  <div id="app">
    <bar-header></bar-header>
    <router-view></router-view>
    <!-- <login></login> -->
    <div class="data-load" v-show="loading">
      <sync-loader :color="color" :size="size"></sync-loader>
    </div>
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
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
export default {
  name: 'app',
  data () {
    return {
      color: '#0e8e5c',
      size: '70px'
    }
  },
  methods: {
    ...mapActions(['setIssuesRef', 'getLocation', 'login', 'checkLogin'])
  },
  computed: {
    ...mapGetters(['authorized', 'issues']),
    loading () {
      return this.issues === []
    }
  },
  components: {
    BarHeader,
    FooterBar,
    Login,
    SyncLoader
  },
  mounted () {
    this.setIssuesRef()
    this.getLocation()
    this.checkLogin()
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
$family-serif: 'Kanit', sans-serif;
// Set your colors
$primary: #ff8d00;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

$family-primary: $family-serif;
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

@import url('https://fonts.googleapis.com/css?family=Kanit:300&subset=thai');
html, body {
  margin:0;
  font-family: 'Kanit', sans-serif;
  padding:0;
  height:100% !important;
  background-color: #e6e6e6 !important;
  // overflow-x: hidden;
  // overflow-y: auto;
}
#app {
  /*height: 100%;*/
}
.coloraw{
  color: #0e8e5c !important;
}
.data-load {
  height: 100vh;
  background-color: white;
  position: fixed;
  z-index: 100;
  left: 0px;
  top: 0px;
  right: 0px;
  padding-top: 50%;
  padding-left: 24%;
}
</style>
