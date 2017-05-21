<template>
  <div id="app">
    <bar-header></bar-header>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BarHeader from './components/BarHeader'
import FooterBar from './components/FooterBar'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['setIssuesRef', 'getLocation', 'login', 'checkLogin'])
  },
  computed: {
    ...mapGetters(['authorized', 'issues'])
  },
  components: {
    BarHeader,
    FooterBar
  },
  created () {
    this.setIssuesRef()
  },
  mounted () {
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
$success: #0e8e5c;
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
html {
  background-color: #e6e6e6 !important;
}
body {
  margin:0;
  font-family: 'Kanit', sans-serif;
  padding:0;
  height:100% !important;
  background-color: #e6e6e6 !important;
  overflow-x: hidden;
  // overflow-y: hidden;
}
#app {
  /*height: 100%;*/
}
.coloraw{
  color: #0e8e5c !important;
}
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .1.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(50px);
  opacity: 0;
}
</style>
