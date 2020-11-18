<template>
	<div id="app">
		<Header />
		<Navi v-bind:navis="navis" v-bind:currentNavi="currentNavi" v-on:change-navi="currentNavi = $event" />
		<component v-bind:is="currentNaviComponent"></component>
	</div>
</template>

<script>
import Header from './components/header/Header.vue'
import Navi from './components/navi/Navi.vue'
import Home from './components/home/Home.vue'
import Mysql from './components/mysql/Mysql.vue'
import Redis from './components/redis/Redis.vue'

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
				navis:this.$store.state.OStore.navis
				//...this.$store.state.OStore
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