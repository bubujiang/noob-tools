<template>
    <div class="header  text-white">
        <span>我是一个标题栏</span>
        <span class="float-right btn-opt text-white">
            <a class="el-icon-minus mr-10" @click="toMin()">最小化</a>
            <a class="el-icon-close" @click="toClose()">关闭</a>
        </span>
    </div>
</template>

<script>
    let ipcRenderer = window['require']('electron').ipcRenderer;
    export default {
        methods: {
            toMin() {
                ipcRenderer.send('min-app')
            },
            toClose() {
                ipcRenderer.send('close-app')
            }
        }
    }
</script>

<style lang="scss">
    .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        -webkit-app-region: drag; // 设置可拖动
    }
</style>