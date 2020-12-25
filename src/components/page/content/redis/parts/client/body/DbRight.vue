<template>
    <div class="right" v-if="val">
        <div class="top">
            <div class="op">
                <div class="type"><span>{{type}}</span></div>
                <div class="ttl"><span>ttl:{{ttl}}</span></div>
                <div class="vas"><select v-model="selected" @change="$emit('vas',$event);">
                        <option value="json">json</option>
                        <option value="raw">raw</option>
                        <option value="unserialize">unserialize</option>
                    </select></div>
                <div class="reload"><button>reload</button></div>
                <div class="copy"><button>copy</button></div>
                <div class="del"><button>delete</button></div>
                <div class="save"><button>save</button></div>
            </div>
        </div>
        <div class="view">{{val}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            val: {
                type: String,
                required: true
            },
            ttl: {
                type: Number,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            format: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                selected: ''
            }
        },
        created(){
            console.log('format',this.format);
            this.selected = this.format;
        },
        /*watch:{
            type:function(){
                this.selected = this.type;
            }
        },*/
        methods: {},
    }
</script>

<style lang="css" src="./db.css" scoped>
</style>