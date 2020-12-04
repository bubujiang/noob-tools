export default {
    namespaced: true,
    state: {
        servers: [{
            host: '',
            port: '',
            auth: '',
            name: 'server1',
            db:['0','1','1','1','1','1','1','1']
        }],
        add_server_popup_show: false
    },
    mutations: {
        popupSwitch(state) {
            state.add_server_popup_show = !state.add_server_popup_show;
        }
    }
}