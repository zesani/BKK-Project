<template lang="html">
  <transition name="slide-fade">
  <div v-if="modalStyle"class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">ความคิดเห็น</p>
        <button class="delete" @click="showComment"></button>
      </header>
      <div class="modal-card-body comments" >
        <div class="card" v-for="comment in issue.comments">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="comment.photoURL" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-5">{{comment.displayName}}</p>
                <p class="subtitle is-6">{{comment.message}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot level">
        <input class="input" v-model="message" type="text" placeholder="Text input">&nbsp;
        <span><a class="button" @click="addC">แสดงความคิดเห็น</a></span>
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
    ...mapGetters(['locationGps', 'profile'])
  },
  mounted () {
  },
  methods: {
    ...mapActions(['addComment']),
    addC () {
      this.addComment({key: this.issue['.key'], profile: this.profile, message: this.message})
      this.message = ''
    }
  },
  components: {}
}
</script>

<style lang="css">
.comments {
  height: 100vh;
  padding: 0px !important;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
