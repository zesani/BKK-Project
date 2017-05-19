<template lang="html">
  <!-- <div class="columns"> -->
    <div class="column is-12-mobile is-6-tablet x is-offset-3-tablet">
      <nav class="nav has-shadow button-issue ">
        <div class="nav-center level" v-show="$route.name === 'Feeds'">
          <router-link class="nav-item level-item" style="color: white;" :to="{ path: 'report' }">
            <i class="fa fa-plus-circle " aria-hidden="true"></i>&nbsp;
            <span class="">
              รายงานปัญหา
            </span>
          </router-link>
        </div>
      </nav>
    </div>
  <!-- </div> -->

</template>

<script>
export default {
}
</script>

<style lang="css" scope>
.button-issue{
  background-color: #0e8e5c !important;
  position: relative !important;
  /*right: 0px;*/
  /*width: 100px;*/
  color: white !important;
  /*left: 10px;*/
  /*right: 5px;*/
}
.x {
  padding: 0px !important;
  width: 100vw;
  position: fixed !important;
  bottom: 1px !important;
  /*border: 1px solid black;*/
}
</style>
