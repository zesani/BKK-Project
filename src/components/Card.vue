<template lang="html">
  <div class="">
    <div class="posit">
      <div class="card">
        <header class="card-header">
            <p class="card-header-title headsize">topic: {{issue.topic}}</p><br/>
            <p class="card-header-title headsize">สถานที่​: {{issue.location}}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <li>ระยะห่าง : {{issue.distance.toFixed(3)}}  km.</li>
            <li>ชื่อ: {{issue.fullName}}</li>
            <li>โทร: {{issue.phone}}</li>
            <div class="columns is-mobile">
              <div class="column photo">
                <img v-for="photo in issue.photos" :src="photo.img">
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item plus detailsize" v-show="checkVote(issue.votes)" @click="addV(issue)">+&nbsp;
            <p class="colortext">{{issue.countVotes}}</p>
          </a>
          <a class="card-footer-item plus detailsize" v-show="!checkVote(issue.votes)" @click="removeV(issue)">+&nbsp;
            <p class="colortext">{{issue.countVotes}}</p></a>
          <a class="card-footer-item detailsize">Comment</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['issue'],
  name: 'Card',
  computed: {
    ...mapGetters(['locationGps', 'profile'])
  },
  methods: {
    ...mapActions(['logout', 'addVote', 'removeVote']),
    addV (issue) {
      this.addVote({key: issue['.key'], profile: this.profile})
    },
    removeV (issue) {
      let temp = Object.keys(issue.votes).map((key) => {
        issue.votes[key].key = key
        return issue.votes[key]
      })
      let check = temp.find(item => item.uid === this.profile.uid)
      if (check === undefined) return
      this.removeVote({key: issue['.key'], keyProfile: check.key})
    },
    checkVote (votes) {
      if (votes === undefined) return true
      let temp = Object.keys(votes).map((key) => votes[key])
      let check = temp.find(item => item.uid === this.profile.uid)
      if (check === undefined) return true
      return false
    }
  }
}
</script>

<style lang="css" scope>
.photo {
}
.photo img {
  display: inline !important;
  width: 50% !important;
}
</style>
