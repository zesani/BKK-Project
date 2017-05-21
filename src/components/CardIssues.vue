<template lang="html">
  <div class="card set-mar">
    <div class="card-content">
      <div class="content">
        <edit-drop v-if="profile.uid === issue.profile.uid" :show="showEdit" :issue="issue" :show-edit-drop="showEditDrop"></edit-drop>
        ปัญหา:&nbsp;{{issue.topic}}
        <br>
        รายละเอียด: {{issue.description}}
        <br>
        สถานที่: {{issue.location}}
        <br>
        <div class="columns is-mobile is-multiline">
          <div :class="{'column is-4':photos.length >=3, 'column': photos.length <=4}" v-show="index < 3" v-for="(photo, index) in photos">
            <img :src="photo.img" alt="" @click="showSlidePhoto(index)">
          </div>
          <div class="column is-4" v-show ="index >= 3 && index < 5" v-for="(photo, index) in photos">
            <img  :src="photo.img" @click="showSlidePhoto(index)"alt="">
          </div>
          <div v-show="photos.length > 5" class="column is-4">
            <img @click="showSlidePhoto(0)"src="../../static/imagePlus1.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" v-show="checkVote(issue.votes)" @click="addV(issue)">
        <div class="level is-mobile">
          <div class="level-item">
            <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;
          </div>
          <div class="level-item has-text-centered">
            <h2 class="title is-4">{{issue.countVotes}}</h2>
          </div>
        </div>
      </a>
      <a class="card-footer-item" style="background-color:#f1f1f1;" v-show="!checkVote(issue.votes)" @click="removeV(issue)">
        <div class="level is-mobile">
          <div class="level-item">
            <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;
          </div>
          <div class="level-item has-text-centered">
            <h2 class="title is-4">{{issue.countVotes}}</h2>
          </div>
        </div>
      </a>
      <a class="card-footer-item comment" @click="showComment()">
        {{issue.countComments}} ความคิดเห็น &nbsp;
        <i class="fa fa-commenting" style="color:#6a6a6a;" aria-hidden="true"></i>
      </a>
    </footer>
    <comments :modal-style="modalStyle" :show-comment="showComment" :issue="issue"></comments>
    <slide-photos :photos="photos" :index="indexPhoto" :show="showPhoto" :show-slide-photo="showSlidePhoto" :next-photo="nextPhoto" :back-photo="backPhoto">  </slide-photos>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Comments from '../components/Comments'
import SlidePhotos from '../components/SlidePhotos'
import EditDrop from '../components/EditDrop'
export default {
  props: ['issue'],
  data () {
    return {
      modalStyle: false,
      indexPhoto: '',
      showPhoto: false,
      showEdit: false
    }
  },
  computed: {
    ...mapGetters(['locationGps', 'profile', 'authorized']),
    photos () {
      let newPhotos = this.issue.photos.filter(photo => photo.img !== '').map(photo => photo)
      return newPhotos
    }
  },
  mounted () {},
  methods: {
    ...mapActions(['logout', 'addVote', 'removeVote']),
    addV (issue) {
      if (!this.authorized) {
        this.$dialog.alert({
          message: 'กรุณา Login เข้าสู่ระบบก่อนทำการกดโหวตค่ะ',
          confirmText: 'ตกลง'
        })
        return
      }
      if (this.addVote({key: issue['.key'], profile: this.profile})) {
        this.$toast.open({
          message: 'โหวตสำเร็จ',
          type: 'is-primary'
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
    },
    showSlidePhoto (index) {
      this.showPhoto = !this.showPhoto
      this.indexPhoto = index
    },
    nextPhoto (index, length) {
      if (index === length - 1) {
        this.indexPhoto = 0
      } else {
        this.indexPhoto = index + 1
      }
    },
    backPhoto (index, length) {
      if (index === 0) {
        this.indexPhoto = length - 1
      } else {
        this.indexPhoto = index - 1
      }
    },
    showEditDrop () {
      this.showEdit = !this.showEdit
    }
  },
  components: {
    Comments,
    SlidePhotos,
    EditDrop
  }
}
</script>

<style lang="css">
.set-mar {
  margin-bottom: 10px;
}
.comment {
  padding: 10px !important;
}
</style>
