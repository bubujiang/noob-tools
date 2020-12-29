<template>
    <div class="info">
        <div class="body">
            <div class="db">
                <div class="header">
                    <span>DB</span><span>Keys</span><span>Expires</span><span>Avg TTL</span><span></span>
                </div>
                <div class="list">
                    <div class="row">
                        <span>DB</span><span>Keys</span><span>Expires</span><span>Avg TTL</span><div class="ibutton"><span><IButton val="open" /></span></div>
                    </div>
                </div>
            </div>
            <div class="parts">
                <div class="part">
                    <div class="title">cpu</div>
                    <div class="params">
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                        <div class="param"><span>aaa</span><span>nnn</span></div>
                    </div>
                </div>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
        </div>
    </div>
</template>

<script>
import IButton from 'components/common/IButton.vue';

export default {
    components:{
        IButton
    }
}
</script>

<style src="style/redis/redis-info.css" scoped></style>