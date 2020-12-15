function testConn(ipcRenderer,add_server_params,success,error){
    ipcRenderer.invoke('redis-render-test-conn', add_server_params).then((result) => {
        if(result.type === 'success'){
            success('success')
        }else{
            error(result.info.message)
        }
    })
}

function testipc(ipcRenderer){
    /*ipcRenderer.send('test1');
    console.log('ddddddddddddddd');
    ipcRenderer.send('test2');
    console.log('ffffffffffffffffffffffff');*/
    ipcRenderer.invoke('test3').then((result) => {
        console.log(result);
    });
}

export {testConn as rTsConn,testipc}