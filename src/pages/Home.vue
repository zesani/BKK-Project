<template lang="html">
  <div class="">
    <button type="button" name="button" @click="add">Add</button>
    <ul>
      <li v-for="issue in issues">{{ issue }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['issues'])
  },
  methods: {
    ...mapActions(['addIssue']),
    add () {
      this.addIssue({
        text: 'test1'
      })
    }
  }
}
</script>

<style lang="css">
</style>
