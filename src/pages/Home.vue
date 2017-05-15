<template lang="html">
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter is-hidden-touch">
        <h1 class="title is-1">Home</h1>
        <h2>{{profile.displayName}}</h2>
        <button type="button" name="button" @click="logout">Logout</button>
          <div v-for="issue in issues">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">topic: {{issue.topic}}</p><br/>
                    <p class="card-header-title">สถานที่​: {{issue.location}}</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <li>GPS: {{issue.locationGps}}</li>
                    <li>ชื่อ: {{issue.fullName}}</li>
                    <li>โทรซ: {{issue.phone}}</li>
                    <img v-for="photo in issue.photos" :src="photo.img" alt="">
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item plus">+&nbsp;<p class="colortext">250</p></a>
                  <a class="card-footer-item">Comment</a>
                  <a class="card-footer-item">Report</a>
                </footer>
            </div>
          <br />
        </div>
      </div>
      <div class="column is-hidden-desktop">
        <h1 class="title is-1">Home</h1>
          <div v-for="issue in issues" class="posit">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title headsize">topic: {{issue.topic}}</p><br/>
                    <p class="card-header-title headsize">สถานที่​: {{issue.location}}</p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <li>GPS: {{issue.locationGps}}</li>
                    <li>ชื่อ: {{issue.fullName}}</li>
                    <li>โทรซ: {{issue.phone}}</li>
                    <img v-for="photo in issue.photos" :src="photo.img" alt="">
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item plus detailsize">+&nbsp;<p class="colortext">250</p></a>
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
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['issues', 'locationGps', 'profile'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="css">
.plus {
  color:red;
}
.posit {
  margin-left:15px;
}
.colortext {
  color:black;
}
.headsize {
  font-size: 40px
}
.detailsize {
  font-size: 35px
}
</style>
