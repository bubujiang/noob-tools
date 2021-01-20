<template>
    <button v-on:click="$emit('b-click');" v-on:mouseenter="$emit('b-on');" :style="'border-color:'+color+';background-color:'+color+';'">{{$t(val)}}</button>
</template>

<script>
export default {
  props: {
    val: {
      type: String,
      required: true,
    },
    color:{
      type: String,
      required: true
    }
  },
};
</script>

<style src="style/common/i-button.css" scoped></style>