<template>
    <div class="client">
        <div class="header">
            <div class="item">
                <span>server 1</span>
            </div>
            <div class="item">
                <span>server 2</span>
            </div>
            <div class="item">
                <span>server 3</span>
            </div>
        </div>
        <Info />
    </div>
</template>

<script>
    import Info from 'components/redis/RedisInfo.vue';

    export default {
        components: {
            Info
        }
    }
</script>

<style src="style/redis-client.css" scoped></style>