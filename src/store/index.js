import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'
Vue.use(Vuex)
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
var provider = new firebase.auth.FacebookAuthProvider()
var Issues = db.ref('issues')

export default new Vuex.Store({
  state: {
    issues: [],
    authorized: false,
    profile: '',
    locationGps: {lat: 14.0224367, lng: 101.6217662}
  },
  getters: {
    issues: state => state.issues,
    locationGps: state => state.locationGps,
    profile: state => state.profile,
    authorized: state => state.authorized
  },
  actions: {
    setIssuesRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('issues', Issues)
    }),
    login () {
      firebase.auth().signInWithRedirect(provider)
    },
    logout (context) {
      context.commit('logout')
    },
    checkLogin (context) {
      context.commit('checkLogin')
    },
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
    },
    addVote ({commit}, payload) {
      Issues.child(payload.key + '/votes').push({
        uid: payload.uid
      })
    }
  },
  mutations: {
    ...firebaseMutations,
    addLocation: (state, location) => {
      state.locationGps = location
    },
    checkLogin (state) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          state.authorized = true
          state.profile = user
        }
      })
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {}
      }).catch((error) => {
        console.error(error)
      })
    },
    logout (state) {
      firebase.auth().signOut().then(function () {
        state.authorized = false
        state.profile = ''
      }, function (error) {
        console.error(error)
      })
    }
  }
})
