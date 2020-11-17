<template>
	<div id="app">
		<Header />
		<Navi v-bind:navis="navis" v-bind:currentNavi="currentNavi" v-on:change-navi="currentNavi = $event" />
		<component v-bind:is="currentNaviComponent"></component>
	</div>
</template>

<script>
	import {
		Header,
		Navi,
		Home,
		Mysql,
		Redis
	} from './components/Components.js'

	//import {
	//	mapState
	//} from 'vuex'

	//let nextItemId = 1;

	export default {
		components: {
			Navi,
			Home,
			Header,
			Mysql,
			Redis
		},
		computed: {
			currentNaviComponent: function () {
				return this.currentNavi;
			}
			// ...mapState('OStore', {
			// 	navis: state => state.navis
			// })
		},
		data() {
			return {
				currentNavi: "Home",
				//navis:this.$store.state.OStore.navis
				...this.$store.state.OStore
			};
		}
	}
</script>

<style lang="css">
	body {
		margin: 0;
		overflow: hidden;
	}

	#app {
		display: flex;
		flex-wrap: wrap;
		height: 800px;
	}
</style>