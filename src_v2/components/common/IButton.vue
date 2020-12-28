<template>
    <button v-on:click="$emit('b-click');">{{$t(val)}}</button>
</template>

<script>
export default {
  props: {
    val: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="style/common/i-button.css" scoped></style>