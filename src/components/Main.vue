<template>
	<div id="app">
		<p v-on:click="test">ddccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddd</p>
		<Header />
		<Page />
	</div>
</template>

<script>
	import Header from './header/Header.vue'
	import Page from './page/Page.vue'

	const ipcRenderer = window['require']('electron').ipcRenderer;
	import {testipc} from 'pbm/redis.m.js'

	export default {
		components: {
			Header,
			Page
		},
		methods:{
			test(){
				testipc(ipcRenderer);
			}
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