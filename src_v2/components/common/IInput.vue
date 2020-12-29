<template>
    <input class="iinput" @input="$emit('input',$event.target.value)" />
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style src="style/common/i-input.css" scoped></style>