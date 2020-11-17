<template>
  <li v-bind:class="currentNavi==item.component ? 'navi-item activity' : 'navi-item' "
    v-on:click="$emit('selected', item.component)">
    <span class="navi-title">{{ item.name }}</span>
  </li>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      currentNavi: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="css">
  @import './navi.css';
</style>