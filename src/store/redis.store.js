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
        add_server_popup_show: false,
        add_server_params:{
            host: '',
            port: '',
            auth: '',
            name: ''
        }
    },
    mutations: {
        popupSwitch(state) {
            state.add_server_popup_show = !state.add_server_popup_show;
        },
        resetAddServerParams(state){
            state.add_server_params = {
                host: '',
                port: '',
                auth: '',
                name: ''
            }
        },
        addServer(state){
            state.servers.push(state.add_server_params);
            state.add_server_params = {
                host: '',
                port: '',
                auth: '',
                name: ''
            };
            state.add_server_popup_show = false;
        }
    }
}