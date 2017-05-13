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
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    issues: [],
    locationGps: {lat: 14.0224367, lng: 101.6217662}
  },
  getters: {
    issues: state => state.issues,
    locationGps: state => state.locationGps
  },
  mutations: {
    ...firebaseMutations,
    addLocation: (state, location) => {
      state.locationGps = location
    }
  },
  actions: {
    setIssuesRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('issues', Issues)
    }),
    getLocation ({commit}) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let location = {lat: position.coords.latitude, lng: position.coords.longitude}
          commit('addLocation', location)
        })
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    addIssue ({commit}, payload) {
      Issues.push(payload)
    }
  }
})
