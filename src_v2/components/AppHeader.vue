<template>
    <div class="header">
        <CircleButton color="yellow" size="15px" right="10px" radius="10px" v-on:cb-click="min()" />
        <CircleButton color="green" size="15px" right="10px" radius="10px" v-on:cb-click="toggle()" />
        <CircleButton color="red" size="15px" right="5px" radius="10px" v-on:cb-click="close()" />
    </div>
</template>

<script>
import CircleButton from 'components/common/CircleButton.vue';

export default {
    components:{
        CircleButton
    },
    methods:{
        min(){},
        toggle(){},
        close(){}
    }
}
</script>

<style src="style/app-header.css" scoped>

</style>