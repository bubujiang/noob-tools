let id = 1;
export default {
    namespaced: true,
    state: {
        navis: [{
            id: id++,
            name: "welcome",
            component:'Home'
        }, {
            id: id++,
            name: "redis",
            component:'Redis'
        }, {
            id: id++,
            name: "mysql",
            component:'Mysql'
        }]
    }
}