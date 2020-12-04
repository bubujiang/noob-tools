<template>
    <option value="volvo">{{db}}</option>
</template>

<script>
export default {
    props: {
            db: {
                type: String,
                required: true
            }
        }
}
</script>

<style lang="less" scoped>

</style>