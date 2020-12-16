function testConn(ipcRenderer,add_server_params,success,error){
    ipcRenderer.invoke('redis-render-test-conn', add_server_params).then((result) => {
        if(result.type === 'success'){
            success('success')
        }else{
            error(result.msg)
        }
    })
}

export {testConn as rTsConn}