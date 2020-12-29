<template>
    <span class="circle" :style="'border-radius: '+radius+';margin-right: '+right+';background-color:'+color+';height: '+size+';width: '+size+';'" v-on:click="$emit('cb-click')"></span>
</template>

<script>
export default {
    props:{
        color:{
            type:String,
            required:true
        },
        size:{
            type:String,
            required:true
        },
        right:{
            type:String,
            required:true
        },
        radius:{
            type:String,
            required:true
        }
    }
}
</script>

<style src="style/common/circle-button.css" scoped></style>