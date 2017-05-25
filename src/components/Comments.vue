<template lang="html">
  <transition name="slide-fade">
  <div v-if="modalStyle"class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><center>ความคิดเห็น</center></p>
        <button class="delete" @click="showComment"></button>
      </header>
      <div class="modal-card-body comments" v-chat-scroll>
        <div class="card" v-for="(comment, key) in issue.comments">
          <div class="card-content">
            <div class="media">
              <div class="media-left is-48x48">
                <figure class="image">
                  <img :src="comment.photoURL" class="company-header-avatar" alt="Image">
                </figure>
              </div>
              <div class="media-content close-comment"  v-chat-scroll>
                <span v-if="profile.uid === comment.uid" @click="remove(key)"class="close-icon">
                  <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                </span>
                <p class="title is-5">{{comment.displayName}}</p>
                <p class="subtitle is-6">{{comment.message}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot s">
        <textarea class="message" v-model="message" :rows="line"  placeholder="เขียนความคิดเห็น ..." autofocus></textarea>
        <span><a :class="{'button disabled post':message === '', 'button is-primary post': message !==''}" @click="addC">โพสต์</a></span>
      </footer>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['modalStyle', 'showComment', 'issue'],
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters(['locationGps', 'profile', 'authorized']),
    line () {
      if (this.message === '' || this.message.split('\n').length === 1) return 2
      if (this.message.split('\n').length >= 5) {
        return 5
      } else {
        return this.message.split('\n').length
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['addComment', 'removeComment']),
    addC () {
      if (!this.authorized) {
        this.$dialog.alert({
          message: 'กรุณา Login เข้าสู่ระบบก่อนทำการแสดงความคิดค่ะ',
          confirmText: 'ตกลง'
        })
        return
      }
      if (this.message !== '') {
        this.addComment({key: this.issue['.key'], profile: this.profile, message: this.message})
      }
      this.message = ''
    },
    remove (keyComment) {
      this.removeComment({key: this.issue['.key'], keyComment})
    }
  },
  components: {}
}
</script>

<style lang="css" scope>
.comments {
  height: 100vh;
  padding: 0px !important;
}
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .1.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
a.can-sent {
  color: white;
}
a.disabled {
   pointer-events: none;
   cursor: default;
}
.company-header-avatar{
  width: 48px !important;
  height: 48px !important;
  -webkit-border-radius: 60px !important;
  -webkit-background-clip: padding-box !important;
  -moz-border-radius: 60px !important;
  -moz-background-clip: padding !important;
  border-radius: 60px !important;
  background-clip: padding-box !important;
  margin: 0px 0px 0px 5px !important;
  float: left;
}
.message {
  width: 90% !important;
}
.post {
  margin-left: 16%;
  margin-bottom: 45%;
}
.close-comment {
  position: relative;
}
.close-icon {
  position: absolute;
  right: 0px;
}
</style>
