<template>
    <li class="server">
        <span class="server-name">{{ server.name }}</span>
    </li>
</template>

<script>
    export default {
        props: {
            server: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="css">
</style>