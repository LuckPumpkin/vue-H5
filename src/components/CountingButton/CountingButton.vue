<template>
    <van-button v-bind="{...$attrs, ...$props}" v-on="_events" class="counting-button" :disabled="disabled || CBdisabled" @click="onClickButton">{{showWords}}</van-button>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch, Emit} from "vue-property-decorator"
    @Component
    export default class CountingButton extends Vue {
        @Prop({default: 60}) time?: number
        @Prop() start!: boolean
        @Prop({default: '发送验证码'}) defaultMessage?: string
        @Prop() disabled?: boolean

        public showWords:any = this.defaultMessage
        public CBdisabled: boolean = false
        
        @Watch("start")
        onStartChange(newVal: boolean, old: boolean){
            if(newVal){
                this.onStartCounting()
            }
        }

        @Emit("click")
        onClickButton(e: Event){
            this.onStartCounting()
            return e
        }

        onStartCounting(){
            let counting: number = this.time || 60
            this.CBdisabled = true
            let timer = setInterval(() => { 
                this.showWords = counting
                counting -- 
                if(counting < 0){
                    clearInterval(timer)
                    this.showWords = this.defaultMessage
                    this.CBdisabled = false   
                }
            },1000)
        }

        mounted() {
            console.log(this)   
        }
    }
</script>

<style scoped lang="less">
    .counting-button{
        height: auto;
        line-height: 26px;
        width: 102px;
    }
</style>