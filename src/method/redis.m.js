function testConn(ipcRenderer,add_server_params,success,error){
    ipcRenderer.invoke('tsconn', add_server_params).then((result) => {
        if(result.type === 'success'){
            success('success')
            console.log('tsc','succ');
            //this.addSuccess('success');
        }else{
            console.log('tsc',result);
            error(result.info.message)
            //this.addError(result.info.message);
        }
    })
}

export {testConn as rTsConn}