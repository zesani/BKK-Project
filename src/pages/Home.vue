<template lang="html">
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter is-hidden-touch">
        <p class="title is-1">Home</p>
        <p class="title is-3">{{profile.displayName}}</p>
        <button class="button is-danger" name="button" @click="logout">Logout</button><hr/>
          <div v-for="issue in showIssues">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">topic: {{issue.topic}}</p><br/>
                    <p class="card-header-title">สถานที่​: {{issue.location}}</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <li>GPS: {{issue.locationGps}}</li>
                    <li>ระยะห่าง : {{issue.distance.toFixed(3)}}  km.</li>
                    <li>ชื่อ: {{issue.fullName}}</li>
                    <li>โทรซ: {{issue.phone}}</li>
                    <img v-for="photo in issue.photos" :src="photo.img" alt="">
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item plus" v-show="checkVote(issue.votes)" @click="addV(issue)">+&nbsp;
                    <p class="colortext">{{issue.countVotes}}</p>
                  </a>
                  <a class="card-footer-item plus" v-show="!checkVote(issue.votes)">+&nbsp;
                    <p class="colortext">{{issue.countVotes}}</p>
                  </a>
                  <a class="card-footer-item">Comment</a>
                  <a class="card-footer-item">Report</a>
                </footer>
            </div>
          <br />
        </div>
      </div>
      <div class="column is-hidden-desktop">
        <p class="title is-2">Home</p>
        <p class="title is-4">{{profile.displayName}}</p>
          <div v-for="issue in showIssues" class="posit">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title headsize">topic: {{issue.topic}}</p><br/>
                    <p class="card-header-title headsize">สถานที่​: {{issue.location}}</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <li>GPS: {{issue.locationGps}}</li>
                    <li>ระยะห่าง : {{issue.distance.toFixed(3)}}  km.</li>
                    <li>ชื่อ: {{issue.fullName}}</li>
                    <li>โทรซ: {{issue.phone}}</li>
                    <img v-for="photo in issue.photos" :src="photo.img" alt="">
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item plus detailsize" v-show="checkVote(issue.votes)" @click="addV(issue)">+&nbsp;
                    <p class="colortext">{{issue.countVotes}}</p>
                  </a>
                  <a class="card-footer-item plus detailsize" v-show="!checkVote(issue.votes)" >+&nbsp;
                    <p class="colortext">{{issue.countVotes}}</p></a>
                  <a class="card-footer-item detailsize">Comment</a>
                  <a class="card-footer-item detailsize">Report</a>
                </footer>
            </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
var _ = require('lodash')
export default {
  name: 'Home',
  data () {
    return {
    }
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
    ...mapActions(['logout', 'addVote']),
    addV (issue) {
      this.addVote({key: issue['.key'], uid: this.profile.uid})
    },
    countVotes (votes) {
      let size = 0
      for (let key in votes) {
        if (votes.hasOwnProperty(key)) size++
      }
      return size
    },
    checkVote (votes) {
      if (votes === undefined) return true
      let temp = Object.keys(votes).map((key) => votes[key])
      let check = temp.find(item => item.uid === this.profile.uid)
      if (check === -1) return true
      return false
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
