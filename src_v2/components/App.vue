<template>
    <div class="app">
        <AppHeader />
        <AppBody />
    </div>
</template>

<script>
import AppHeader from 'components/AppHeader.vue';
import AppBody from 'components/AppBody.vue';

export default {
    components:{
        AppHeader,AppBody
    }
}
</script>

<style src="style/app.css" scoped></style>