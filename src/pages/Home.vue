<template lang="html">
  <div class="columns">
    <div class="column">
      <p class="title is-2">Home</p>
      <p class="title is-4">{{profile.displayName}}</p>
      <card v-for="issue in showIssues" :key="issue['.key']" :issue="issue"></card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../components/Card.vue'
var _ = require('lodash')
export default {
  name: 'Home',
  components: {
    Card
  },
  computed: {
    ...mapGetters(['issues', 'locationGps', 'profile']),
    showIssues () {
      var vm = this
      let newIssues = Object.keys(this.issues).map((key) => vm.issues[key])
      newIssues.forEach(issue => {
        issue.distance = this.HaversineInKM(issue.locationGps.lat, issue.locationGps.lng, this.locationGps.lat, this.locationGps.lng)
        issue.countVotes = this.countVotes(issue.votes)
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
.plus {
  color:red;
}
.posit {
  margin-left:0px;
}
.colortext {
  color:black;
}
.headsize {
  font-size: 25px
}
.detailsize {
  font-size: 20px
}
</style>
