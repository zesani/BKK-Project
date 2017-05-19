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
      <a class="nav-item" style="color: white;">
        <span>
          ปัญหา
        </span>
      </a>
    </div>
    <div class="nav-right">
      <a class="nav-item" style="color: white;" @click="login" v-show="!authorized">
        <i class="fa fa-facebook-square" aria-hidden="true"></i>&nbsp;
        <span class="level-item"> Login </span>
      </a>
      <a class="nav-item" style="color: white;" @click="logout" v-show="authorized">
        <i class="fa fa-facebook-square" aria-hidden="true"></i>&nbsp;
        <span class="level-item">{{profile.displayName}} Logout  </span>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['authorized', 'profile'])
  },
  mounted () {},
  methods: {
    ...mapActions(['login', 'logout'])
  },
  components: {}
}
</script>

<style lang="css">
.colornav{
  background-color: #0e8e5c !important;
  position: fixed !important;
  width: 100%;
  /*left: 0px;
  right: 0px;*/
  top: 0px;
  color: white;
}
</style>
