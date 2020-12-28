<template>
    <div class="body">
        <AppNavigation />
        <AppClient />
    </div>
</template>

<script>
import AppNavigation from 'components/AppNavigation.vue';
import AppClient from 'components/AppClient.vue';

export default {
    components:{
        AppNavigation,
        AppClient
    }
}
</script>

<style src="style/app-body.css" scoped>

</style>