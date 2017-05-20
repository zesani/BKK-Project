<template lang="html">
  <div class="card set-mar">
    <div class="card-content">
      <div class="content">
      <i class="fa fa-circle" aria-hidden="true"></i>&nbsp;{{issue.topic}}
      <br>
      สถานที่: {{issue.location}}
      <br>
      รายละเอียด: {{issue.description}}
      <br>
      <div class="columns">
        <!-- <div class="column" v-for="photo in issue.photos">
          <img :src="photo.img" alt="">
        </div> -->
        <div class="column">
          <img :src="issue.photos[0].img" alt="">
        </div>
      </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" v-show="checkVote(issue.votes)" @click="addV(issue)">+{{issue.countVotes}}</a>
      <a class="card-footer-item" v-show="!checkVote(issue.votes)" @click="removeV(issue)">+{{issue.countVotes}}</a>
      <a class="card-footer-item" @click="showComment()">{{issue.countComments}} ความคิดเห็น</a>
    </footer>
    <comments :modal-style="modalStyle" :show-comment="showComment" :issue="issue"></comments>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Comments from '../components/Comments'
export default {
  props: ['issue'],
  data () {
    return {
      modalStyle: false
    }
  },
  computed: {
    ...mapGetters(['locationGps', 'profile', 'authorized'])
  },
  mounted () {},
  methods: {
    ...mapActions(['logout', 'addVote', 'removeVote']),
    addV (issue) {
      if (!this.authorized) {
        this.$dialog.alert({
          message: 'กรุณา Login เข้าสู่ระบบก่อนทำการกดโหวตค่ะ',
          confirmText: 'รับทราบ'
        })
        return
      }
      if (this.addVote({key: issue['.key'], profile: this.profile})) {
        this.$toast.open({
          message: 'ขอบคุณสำหรับการโหวตค่ะ',
          type: 'is-success'
        })
      }
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
    },
    showComment () {
      this.modalStyle = !this.modalStyle
    }
  },
  components: {
    Comments
  }
}
</script>

<style lang="css">
.set-mar {
  margin-bottom: 10px;
}
</style>
