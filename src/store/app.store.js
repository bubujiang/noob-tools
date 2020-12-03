let id = 1;
export default {
    namespaced: true,
    state: {
        navigation_items: [{
            id: id++,
            name: "welcome",
            component: "Home"
        }, {
            id: id++,
            name: "redis",
            component: "Redis"
        }, {
            id: id++,
            name: "mysql",
            component: "Mysql"
        }],
        current_navigation_item: "Home"
    },
    mutations: {
        changeCurrentItem(state, item) {
            state.current_navigation_item = item
        }
    }
}