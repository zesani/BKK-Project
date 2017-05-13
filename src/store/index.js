import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyDrf9oXp_xyvM4Pol5fdGLh6jm-XgN9ZMU',
  authDomain: 'bkk-project-51671.firebaseapp.com',
  databaseURL: 'https://bkk-project-51671.firebaseio.com',
  projectId: 'bkk-project-51671',
  storageBucket: 'bkk-project-51671.appspot.com',
  messagingSenderId: '696956552873'
}
firebase.initializeApp(config)
var db = firebase.database()
var Issues = db.ref('issues')
Vue.use(Vuex)
// var storage = firebase.storage()
// var storageRef = storage.ref('photos')
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    issues: []
  },
  getters: {
    issues: state => state.issues
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    setIssuesRef:
      firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
        bindFirebaseRef('issues', Issues)
      }),
    addIssue ({commit}, payload) {
      // let urlPhoto = []
      // let i = 0
      // payload.photos.forEach(photo => {
      //   storageRef.child(Date.now() + photo.name).put(photo.file).then(function (snapshot) {
      //     console.log(snapshot.downloadURL)
      //     photo.url = snapshot.downloadURL
      //     console.log('Upload success')
      //     i++
      //     if (i === (payload.photos.length)) {
      //       Issues.push(payload)
      //       console.log(payload.photos)
      //     }
      //   })
      // })
      Issues.push(payload)
    }
  }
})
