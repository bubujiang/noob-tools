<template>
	<div id="app">
		<Header />
		<Page />
	</div>
</template>

<script>
	import Header from './header/Header.vue'
	import Page from './page/Page.vue'

	export default {
		components: {
			Header,
			Page
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