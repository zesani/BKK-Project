<template lang="html">
  <div class="columns is-multiline" id="header">
    <div class="column is-12"></div>
    <div class="column is-12"></div>
    <div class="column is-12" v-if="issues.length === 0"></div>

    <div class="column cards is-6-tablet is-offset-3-tablet" v-if="issues.length !== 0">
      <transition-group name="list" tag="p">
        <card-issues v-for="issue in showIssues" :key="issue['.key']" :issue="issue"></card-issues>
      </transition-group>
    </div>
  </transition>
    <div class="column data-load is-6-tablet is-offset-3-tablet" v-else>
      <div class="columns">
        <div class="column is-hidden-tablet">
        </div>
        <div class="column is-hidden-tablet">
        </div>
        <div class="column is-6 is-offset-3 load-sync">
          <center><sync-loader :color="color" :size="size"></sync-loader></center>
        </div>
      </div>
    </div>
    <div class="column is-12"></div>
    <div class="column is-12"></div>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import { mapGetters, mapActions } from 'vuex'
import CardIssues from '../components/CardIssues'
var _ = require('lodash')
export default {
  name: 'Home',
  data () {
    return {
      color: '#0e8e5c',
      size: '50px'
    }
  },
  components: {
    CardIssues,
    SyncLoader
  },
  computed: {
    ...mapGetters(['issues', 'locationGps', 'profile']),
    showIssues () {
      var vm = this
      let newIssues = Object.keys(this.issues).map((key) => vm.issues[key])
      newIssues.forEach(issue => {
        issue.distance = this.HaversineInKM(issue.locationGps.lat, issue.locationGps.lng, this.locationGps.lat, this.locationGps.lng)
        issue.countVotes = this.countVotes(issue.votes)
        issue.countComments = this.countComments(issue.comments)
      })
      return _.orderBy(newIssues, ['distance', 'countVotes'], ['asc', 'desc'])
    }
  },
  methods: {
    ...mapActions(['logout', 'addVote', 'removeVote']),
    countVotes (votes) {
      let size = 0
      for (let key in votes) {
        if (votes.hasOwnProperty(key)) size++
      }
      return size
    },
    countComments (comments) {
      let size = 0
      for (let key in comments) {
        if (comments.hasOwnProperty(key)) size++
      }
      return size
    },
    HaversineInKM (Lat, Long, LatHere, LongHere) {
      var d2r = (Math.PI / 180)
      var dlong = (LongHere - Long) * d2r
      var dlat = (LatHere - Lat) * d2r
      var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(Lat * d2r) * Math.cos(LatHere * d2r) * Math.pow(Math.sin(dlong / 2), 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = 6378.1370 * c
      return d
    }
  }
}
</script>

<style lang="css">
.cards{
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
.data-load {
  height: 82vh;

  background-color: white;
}
.load-sync{
  padding-top: 40%;
}
</style>
