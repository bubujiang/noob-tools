<template>
	<div id="app">
		<Header />
		<Page />
	</div>
</template>

<script>
	import Header from './header/Header.vue'
	import Page from './page/Page.vue'

	import {Message} from 'msg/renderer.process.msg.js'

	export default {
		components: {
			Header,
			Page
		},
		created(){
			Message.onMessage.call(this);
		},
		mounted: function () {
			
		}
	}
</script>

<style lang="css">
	#app {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
	}
</style>