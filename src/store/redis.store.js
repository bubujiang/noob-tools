export default {
    namespaced: true,
    state: {
        servers: [],
        add_server_popup_show: false,
        add_server_params:{
            host: null,
            port: null,
            auth: null,
            name: null
        }
    },
    mutations: {
        popupSwitch(state) {
            state.add_server_popup_show = !state.add_server_popup_show;
        },
        resetAddServerParams(state){
            state.add_server_params = {
                host: null,
                port: null,
                auth: null,
                name: null
            }
        },
        addServer(state){
            state.servers.push(state.add_server_params);
            state.add_server_params = {
                host: null,
                port: null,
                auth: null,
                name: null
            };
            state.add_server_popup_show = false;
        }
    }
}