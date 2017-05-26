<template lang="html">
  <div class="div-drop">
    <div class="button-drop">
      <a @click="showEditDrop"><span><i class="fa fa-chevron-down" aria-hidden="true"></i></span></a>
    </div>
    <transition name="slide-fade">
      <div class="edit-drop" v-if="show">
        <div @click="remove" class="edit-drop-item">
          <a >ลบ</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['show', 'showEditDrop', 'issue'],
  methods: {
    ...mapActions(['removeIssues']),
    remove () {
      this.$dialog.confirm({
        title: 'ลบรายการปัญหา',
        message: 'คุณต้องการที่จะลบรายการปัญหานี้ใช่หรือไม่ หากลบแล้วจะไม่สามารถนำกลับมาได้',
        confirmText: 'ใช่',
        cancelText: 'ไม่ใช่',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.removeIssues(this.issue)
          this.$toast.open('รายการปัญหาได้ถูกลบเรียบร้อยแล้ว')
        }
      })
      this.showEditDrop()
    }
  }
}
</script>

<style lang="css">
.div-drop {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30%;
  padding: 0px;
}
.button-drop {
  position: relative;
  text-align: right;
  width: 100%;
}
.edit-drop {
  position: relative;
  right: 0px;
  top: 5px;
  width: 100%;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  z-index: 100;
}
.edit-drop-item {
  background-color: white;
  position: relative;
  padding: 10px;
  width: 100%;
  cursor: pointer;
}
</style>
