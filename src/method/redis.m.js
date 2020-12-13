function testConn(ipcRenderer,add_server_params,success,error){
    ipcRenderer.invoke('redis-test-conn', add_server_params).then((result) => {
        if(result.type === 'success'){
            success('success')
        }else{
            error(result.info.message)
        }
    })
}

export {testConn as rTsConn}