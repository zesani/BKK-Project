<template lang="html">
  <nav class="nav has-shadow colornav">
    <div class="nav-left" v-show="$route.name === 'Report'">
      <router-link :to="{path: '/'}" class="nav-item level" style="color: white;" >
        <span class="level-item">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </span>
      </router-link>
    </div>
    <div class="nav-center" v-show="$route.name === 'Feeds'">
      <a class="nav-item" style="color: white;" v-scroll-to="{el: '#header', duration: '1000'}">
        <span>
          <img src="../../static/logo1.png" alt="">
        </span>
      </a>
    </div>
    <transition name="slide-fade">
      <div class="modal is-active" v-show="showUser">
        <div class="modal-background"></div>
        <div class="modal-card">
          <div class="modal-card-body pop-info" >
            <div class="close-info">
              <span @click="showUser = false"><i class="fa fa-times-circle-o " aria-hidden="true"></i></span>
            </div>
            <div class="user-info">
              <img :src="profile.photoURL" class="company-header" alt=""><br>
              {{profile.displayName}}<br>
              <a style="cursor: pointer;" @click="signOut" v-show="authorized">
                <span class="level-item"><i class="fa fa-sign-out" aria-hidden="true"></i> &nbsp;logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="nav-right nav-menu">
      <a class="nav-item" style="color: white;" @click="login" v-show="!authorized">
        <i class="fa fa-facebook-square" aria-hidden="true"></i>&nbsp;
        <span class="level-item"> เข้าสู่ระบบ </span>
      </a>
      <a class="nav-item" style="color: white; cursor: default ;" v-show="authorized">
        <img :src="profile.photoURL" class="display-avatar" alt="">&nbsp;
        {{profile.displayName}}
      </a>
      <a class="nav-item" style="color: white; cursor: pointer;" @click="signOut" v-show="authorized">
        <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
        <span class="level-item">logout</span>
      </a>
    </div>
    <div class="nav-right is-hidden-tablet">
      <a class="nav-item" style="color: white;" @click="login" v-show="!authorized">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;
        <span class="level-item">login</span>
      </a>
      <a class="nav-item" style="color: white; cursor: pointer;" @click="showUser = !showUser" v-show="authorized">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      showUser: false
    }
  },
  computed: {
    ...mapGetters(['authorized', 'profile'])
  },
  mounted () {},
  methods: {
    ...mapActions(['login', 'logout']),
    signOut () {
      this.showUser = false
      this.logout()
    }
  },
  components: {}
}
</script>

<style lang="css">
.colornav{
  background-color: #0e8e5c !important;
  position: fixed !important;
  width: 100%;
  top: 0px;
  color: white;
}
.pop-info {
  border-radius: 5px !important;
  margin-left: 10%;
  margin-right: 10%;
  color: black !important;
  padding-top: 0px !important;
}
.user-info {
  padding-left: 12%;
  padding-right: 12%;
  padding-bottom: 5%;
  padding-top: 6%;
}
.close-info {
  padding-top: 1% !important;
  padding-left: 99% !important;
  color: #cfcfcf;
}
.company-header{
  width: 80px !important;
  height: 80px !important;
  -webkit-border-radius: 60px !important;
  -webkit-background-clip: padding-box !important;
  -moz-border-radius: 60px !important;
  -moz-background-clip: padding !important;
  border-radius: 60px !important;
  background-clip: padding-box !important;
  margin: 0px 0px 0px 5px !important;
}
.display-avatar {
  -webkit-border-radius: 60px !important;
  -webkit-background-clip: padding-box !important;
  -moz-border-radius: 60px !important;
  -moz-background-clip: padding !important;
  border-radius: 60px !important;
  background-clip: padding-box !important;
  margin: 0px 0px 0px 5px !important;
}
</style>
