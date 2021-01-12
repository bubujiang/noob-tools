<template>
    <input type="checkbox" :checked="checked" v-on:change="$emit('change',$event.target.checked)"/>
</template>

<script>
    export default {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
                //required:true
            }
            //value: String
        },
    }
</script>

<style src="style/common/i-checkbox.css" scoped></style>