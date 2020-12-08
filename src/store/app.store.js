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
        current_navigation_item: "Home",
        notice: { //正常提示，如少输名称
            msg: null
        },
        error: { //操作错误返回提示
            msg: null
        },
        success: { //操作成功返回提示
            msg: null
        }
    },
    mutations: {
        changeCurrentItem(state, item) {
            state.current_navigation_item = item
        },
        addNotice(state,msg){
            state.notice.msg = msg;
        },
        addError(state,msg){
            state.error.msg = msg;
        },
        cleanNotice(state){
            state.notice.msg = null;
        },
        cleanError(state){
            state.error.msg = null;
        },
        addSuccess(state,msg){
            state.success.msg = msg;
        },
        cleanSuccess(state){
            state.success.msg = null;
        }
    }
}