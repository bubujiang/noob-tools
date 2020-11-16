<template>
	<div id="app">
        <Header/>
		<Navi/>
        <Home/>
	</div>
</template>

<script>
import Header from './components/header/Header.vue'
import Navi from './components/navi/Navi.vue'
import Home from './components/home/Home.vue'


export default {
	components: {
		Navi,Home,Header
	}
}
</script>

<style lang="css">
body{
    margin: 0;
}
#app{
    display: flex;
        flex-wrap: wrap;
}
</style>