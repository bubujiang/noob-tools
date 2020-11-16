<template>
  <li v-bind:class="item.id==1 ? 'navi-item activity' : 'navi-item' ">
    <span class="navi-title">{{ item.name }}</span>
  </li>
</template>

<script>
  export default {
    props: {
     item: {
       type: Object,
       required: true
     }
   }
  }
</script>

<style lang="css">
@import './navi.css';
</style>