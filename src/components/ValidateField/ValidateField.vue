<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-10-27 10:13:55
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-12-08 10:26:36
-->
<template>
    <van-field v-bind="{...$attrs, ...$props, 'error-message': errorMessage }" v-on="{..._events, input: onInput, blur: onBlur, focus: onFocus}" format-trigger="onBlur" class="validate-field" >
        <template slot="label">
            <slot name="label"></slot>
        </template>
        <template slot="left-icon">
            <slot name="left-icon"></slot>
        </template>
        <template slot="right-icon">
            <slot name="right-icon"></slot>
        </template>
        <template slot="button">
            <slot name="button"></slot>
        </template>
    </van-field>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit, Watch} from "vue-property-decorator"
    import validators from "@/utils/utils"
    @Component
    export default class ValidateField extends Vue {
        /**
         *  用法和vant相同：https://youzan.github.io/vant/#/zh-CN/field
         *  
         */
        @Prop() value!: string  //value，用来绑定v-model
        @Prop() placeholder?: string //placeholder
        @Prop() label?: string  //文本框标签
        @Prop({default: "text"}) type?: string //文本框类型
        @Prop() size?: string //文本框大小
        @Prop({default: true}) border?: boolean //是否有边框
        @Prop({default: false}) disabled?: boolean //是否禁用
        @Prop({default: false}) readonly?: boolean  //是否只读
        @Prop({default: false}) clearable?: boolean  //是否显示清楚按钮
        @Prop({default: false}) required?: boolean  //是否必填，显示红色星号
        @Prop({default: false}) error?: boolean  //是否将输入的内容标红
        @Prop({default: false}) autosize?: boolean | object  //自适应内容高度，文本域下生效
        @Prop() rule?: any  //检验规则

        public errorMessage: string = ""

        @Watch("$attrs",{deep: true})
        onAttrsChange(newVal: any, old: any){
            if(newVal["error-message"] != old["error-message"]){
                this.errorMessage = newVal["error-message"]
            }
        }

        @Emit("blur")
        onBlur(e: Event){
            if(this.rule && this.rule.length>0){
                let validateResult = validators.validate(this.value, this.rule)
                this.errorMessage = validateResult ? validateResult :""
            } 
            return e
        }
        
        // @Emit("change")
        // onChange(e: Event){
        //     if(this.rule && this.rule.length>0){
        //         let validateResult = validators.validate(this.value, this.rule)
        //         this.errorMessage = validateResult ? validateResult :""
        //     } 
        //     return e
        // }
        @Emit("input")
        onInput(value: any){
            // if(this.rule && this.rule.length>0){
            //     let validateResult = validators.validate(this.value, this.rule)
            //     this.errorMessage = validateResult ? validateResult :""
            // } 
            return value
        } 
        @Emit("focus")
        onFocus(e: Event){
            if(this.errorMessage){
                this.errorMessage=""
            }
            return e
        }   

        mounted() {
            // console.log(this)   
        }
    }
</script>

<style scoped lang="less">

</style>