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
// var provider = new firebase.auth.GoogleAuthProvider()
var Issues = db.ref('issues')
var storage = firebase.storage()
var storageRef = storage.ref('photos')
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    issues: [],
    authorized: false,
    profile: {},
    locationGps: {lat: 14.0224367, lng: 101.6217662},
    centerMap: {lat: 14.0224367, lng: 101.6217662}
  },
  getters: {
    issues: state => state.issues,
    locationGps: state => state.locationGps,
    profile: state => state.profile,
    authorized: state => state.authorized,
    centerMap: state => state.centerMap
  },
  actions: {
    setIssuesRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('issues', Issues)
    }),
    login () {
      firebase.auth().signInWithRedirect(provider)
    },
    logout ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('logout')
      }, function (error) {
        console.error(error)
      })
    },
    checkLogin ({commit}) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('checkLogin', user)
        }
      })
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {}
      }).catch((error) => {
        console.error(error)
      })
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
    upPhoto ({commit}, payload) {
      return new Promise((resolve, reject) => {
        storageRef.child(Date.now() + payload.name).put(payload.file).then(function (snapshot) {
          resolve(snapshot.downloadURL)
        })
      })
    },
    addIssue ({commit}, payload) {
      Issues.push(payload)
    },
    addVote ({commit}, payload) {
      Issues.child(payload.key + '/votes').push({
        uid: payload.profile.uid,
        displayName: payload.profile.displayName
      })
    },
    removeVote ({commit}, payload) {
      Issues.child(payload.key + '/votes/' + payload.keyProfile).remove()
    },
    markLocation ({commit}, location) {
      commit('setLocation', location)
    },
    addComment ({commit}, payload) {
      Issues.child(payload.key + '/comments').push({
        uid: payload.profile.uid,
        displayName: payload.profile.displayName,
        photoURL: payload.profile.photoURL,
        message: payload.message
      })
    },
    removeIssues ({commit}, payload) {
      Issues.child(payload['.key']).remove()
    },
    removeComment ({commit}, payload) {
      Issues.child(payload.key + '/comments/' + payload.keyComment).remove()
    }
  },
  mutations: {
    ...firebaseMutations,
    addLocation: (state, location) => {
      state.locationGps = location
      state.centerMap = location
    },
    setLocation (state, location) {
      state.locationGps = location
    },
    checkLogin (state, user) {
      state.profile.displayName = user.displayName
      state.profile.uid = user.uid
      state.profile.photoURL = user.photoURL
      state.profile.email = user.email
      state.authorized = true
    },
    logout (state) {
      state.authorized = false
      state.profile = {}
    }
  }
})
