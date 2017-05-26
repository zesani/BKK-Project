<template lang="html">
  <div class="columns is-multiline report">
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
    <div class="column is-12-tablet"></div>
    <div class="space column is-6-tablet is-offset-3">
      <div class="field">
        <label class="label">เรื่อง </label>
        <input class="input" type="text" placeholder="(Ex.ท่อน้ำปะปาแตก)" v-model="topic"><br><br>
        <label class="label">สถานที่เกิดเหตุ</label>
        <input class="input" type="text" placeholder="(Ex.สี่แยกราชประสงค์)" v-model="location"><br><br>
        <gmap-map :center="centerMap" :zoom="15" map-type-id="terrain" style="width: 100%; height: 200px; margin: auto;">
          <gmap-marker :position="locationGps" :clickable="true" :draggable="true" @mouseup="setLocation($event)"></gmap-marker>
        </gmap-map><br>
        <label class="label">รายละเอียด</label>
        <textarea class="textarea" placeholder="(Ex.น้ำท่วมขัง ถนนลื่น แมลงสาบเอ่อล้นที่ห้องครัว)" v-model="description"></textarea><br>
        <label class="label">เลือกหมวดหมู่ปัญหา</label>
        <b-dropdown v-model:value="issueType">
          <button class="button" slot="trigger">
            <span>{{ issueType.name }}</span>
          </button>
          <b-dropdown-option :value="{name:'ไฟฟ้า', email: '5706021622051@fitm.kmutnb.ac.th', agency: 'การไฟฟ้านครหลวง'}">ไฟฟ้า</b-dropdown-option>
          <b-dropdown-option :value="{name:'อุทกภัย', email: '5706021631123@fitm.kmutnb.ac.th', agency: ' สำนักการระบายน้ำ กรุงเทพมหานคร'}">อุทกภัย</b-dropdown-option>
          <b-dropdown-option :value="{name: 'ปัญหาผลพิษทางอากาศ ขยะมูลฝอย', email: 'koaittipong@gmail.com', agency: 'สำนักสิ่งแวดล้อม'}">ปัญหาผลพิษทางอากาศ ขยะมูลฝอย</b-dropdown-option>
          <b-dropdown-option :value="{name:'ท้องถนน', email: 'n.pboat@gmail.com', agency:'กรมโยธาธิการและผังเมือง'}">ท้องถนน</b-dropdown-option>
        </b-dropdown>
        <br><br>
        <div class="fileUpload button is-primary" @change="onFileChange" @click="indexPhoto = photos.length-1">
          <span v-if="!upImage">เพิ่มรูปภาพ</span>
          <span v-else>กำลังอัพโหลด...</span>
          <input :disabled="upImage" type="file" accept="image/*" class="upload" />
        </div>
        <div class="columns is-mobile is-multiline is-gapless">
          <div v-if="photo.img !== ''" class="column box-x" v-for="(photo, index) in photos">
            <span class="level-center" @click="removePhoto(index)">
              <i class="fa fa-times-circle fa-5x level-item" aria-hidden="true"></i>
            </span>
            <img :src="photo.img" alt="">
          </div>
          <div v-if="upImage" class="column box-x">
            <center><beat-loader :color="color" :size="size"></beat-loader></center>
          </div>
        </div>
        <label class="label">เบอร์โทรศัพท์</label>
        <input class="input" type="number" placeholder="xxx-xxxxxxx" v-model="phone"><br><br>
      </div>
      <div class="field  has-addons-centered">
        <p class="control">
          <center>
            <button class="button is-primary font-issue" @click="add (topic, photos, locationGps, location, description, phone, issueType)">แจ้งเหตุ</button>
          </center>
        </p>
      </div>
    </div>
    <div class="column is-12-tablet"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
export default {
  data () {
    return {
      topic: '',
      location: '',
      fullName: '',
      phone: '',
      description: '',
      photos: [{
        img: '',
        name: ''
      }],
      issueType: {
        name: 'รายการปัญหา',
        email: '',
        agency: ''
      },
      indexPhoto: 0,
      votes: [],
      upImage: false,
      color: '#0e8e5c',
      size: '10px'
    }
  },
  components: {
    BeatLoader
  },
  computed: {
    ...mapGetters(['locationGps', 'centerMap', 'profile'])
  },
  methods: {
    ...mapActions(['addIssue', 'markLocation', 'upPhoto']),
    add (topic, photos, locationGps, location, description, phone, issueType) {
      if (topic === '' || description === '' || phone === '' || issueType.name === 'รายการปัญหา') {
        this.$dialog.alert({
          message: 'กรุณากรอกข้อมูลให้ครบค่ะ',
          confirmText: 'ตกลง'
        })
        return
      }
      let newPhotos = this.photos.filter(photo => photo.img !== '').map(photo => photo)
      let nowDate = new Date()
      let date = nowDate.toDateString()
      this.addIssue({
        topic,
        photos: newPhotos,
        locationGps,
        location,
        description,
        phone,
        profile: this.profile,
        date,
        issueType,
        state: 'wait'
      })
      this.topic = ''
      this.location = ''
      this.description = ''
      this.fullName = ''
      this.phone = ''
      this.photos = [{
        img: '',
        name: ''
      }]
      this.issueType = {
        name: 'รายการปัญหา',
        email: '',
        agency: ''
      }
      this.$router.push('/')
    },
    addPhoto () {
      this.photos.push({
        img: '',
        name: '',
        file: ''
      })
    },
    removePhoto (index) {
      this.photos.splice(index, 1)
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      this.upImage = true
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        // vm.photos[vm.indexPhoto].img = e.target.result
        vm.photos[vm.indexPhoto].name = file.name
        vm.photos[vm.indexPhoto].file = file
        vm.upPhoto(vm.photos[vm.indexPhoto]).then(response => {
          vm.photos[vm.indexPhoto].img = response
          console.log(response)
          this.upImage = false
        })
        vm.addPhoto()
      }
      reader.readAsDataURL(file)
    },
    setLocation (event) {
      var location = {}
      location.lat = event.latLng.lat()
      location.lng = event.latLng.lng()
      this.markLocation(location)
    }
  }
}
</script>

<style lang="css" scope>
.photo img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.upload {
    width: 20%;
    overflow: hidden;
    float: right;
    background: url('http://www.free-icons-download.net/images/plus-logo-icon-27956.png');
    background-size: 57px;
    background-repeat: no-repeat;
}
.upload input {
    float: right;
    display: block !important;
    height: 57px !important;
    opacity: 1 !important;
    overflow: hidden !important;
}
.report {
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.space{
  background-color: white;
  border-radius: 2px;
}
.font-issue {
  padding-left: 12%;
  padding-right: 12%;
}
.box-x img{
  width: 98%;
}
.fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
}
.fileUpload input.upload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);

}
</style>
