<template lang="html">
  <div class="columns is-multiline">
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
    <div class="column cards is-6-tablet is-offset-3-tablet">
      <card-issues v-for="issue in showIssues" :key="issue['.key']" :issue="issue"></card-issues>
    </div>
    <div class="column is-12-table"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardIssues from '../components/CardIssues'
var _ = require('lodash')
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    CardIssues
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
      return _.orderBy(newIssues, 'distance')
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
  /*padding-top: 18% !important;*/
  /*height: 100%;*/
  overflow: auto;
}
</style>
