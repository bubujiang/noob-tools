<template>
    <div class="inputfile">
        <div class="input"><input type="text" /></div>
        <div class="select"><input type="button" value="select" v-on:click="$emit('select')" /></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style src="style/common/i-input-file.css" scoped></style>