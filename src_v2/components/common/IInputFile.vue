<template>
    <div class="inputfile">
        <div class="input"><input type="text" :value="value" v-on:input="$emit('input',$event.target.value)" /></div>
        <div class="select"><input type="button" value="select" v-on:click="$emit('select')" /></div>
    </div>
</template>

<script>
    export default {
        model: {
            prop: "value",
            event: "input",
        },
        props: {
            value: String,
        },
    };
</script>

<style src="style/common/i-input-file.css" scoped></style>