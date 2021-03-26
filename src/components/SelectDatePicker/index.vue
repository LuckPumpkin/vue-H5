<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-05-28 13:54:55
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-06-30 18:17:40
--> 
<template>
    <div class="selected-picker">
        <van-cell :title="label" title-class="selected-picker-title" class="for-add-border">
            <div :class="contentClass" @click="onHandUpPicker">
                <span>{{value?(value.length>0?value.join(" "):value):placeholder}}</span>
                <span class="extra-con"></span>
            </div>
            <div :class="['van-field__error-message', getTextAlign($attrs['error-message-align'])]" v-show="!!errorMessage">{{errorMessage}}</div>
        </van-cell>
        <popup-picker :show="showDialog" :columns="columns" :columnsLength="columnsLength" @onCancel="onCancelPopup" @onConfirm="onConfirmPopup" @onPickerChange="onPickerChange"></popup-picker>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit, Watch} from "vue-property-decorator"
    import {PopupPicker} from "@/components"
    import validators from "@/utils/utils"
    @Component({
        components:{
            "popup-picker": PopupPicker
        }
    })
    export default class SelectedPicker extends Vue{
        /**
         *  @param error-message-align 错误信息位置
         *  @param input-align 输入框文本位置
         *  @param required-value  触发点击事件之前必须存在且不为false的值
         *  @event onCalcel 点击取消时的回调
         *  @event onConfirm 点击确定时的回调
         *  @event input 触发oninput事件的回调，主要用来绑定v-model
         *  @event onPickerChange picker的值被修改时被触发
         *  @event required 校验required-value未通过时触发
         * */

        @Prop() label?: string  //表单名称
        @Prop() placeholder?: string  //placeholder
        @Prop() columns!: Array<any>  //下拉选择列表
        @Prop() columnsLength!: number  //已选择的列数
        @Prop() value!: any  //value，与v-model对应
        @Prop() rule?: any  //校验规则
        @Prop() disabled?: boolean
        
        public contentClass: Array<string> = ["selected-picker-show", this.getTextAlign(this.$attrs["input-align"])]
        public showDialog: boolean = false
        public errorMessage: string = ""

        onHandUpPicker(){
            if(this.disabled) return 
            if(this.$attrs["required-value"] == ""){
                this.onRequired()
                return 
            }
            this.showDialog = true
        }

        @Emit("onCancel")
        onCancelPopup(){
            this.showDialog = false
        }

        @Emit("onConfirm")
        onConfirmPopup(values: any, index: any){
            this.showDialog = false
            console.log(values, index)
            this.onChange(values)
            this.errorMessage = ""
            return values
        }

        @Emit("input")
        onChange(values: any){
            this.contentClass.push("has-selected-picker")
            return values
        }

        @Emit("onPickerChange")
        onPickerChange( {values, index}: any ){
            this.errorMessage = ""
            return { values, index }
        }

        @Emit("required")
        onRequired(){

        }

        @Watch("$attrs",{deep: true})
        onAttrsChange(newVal: any, old: any){
            if(newVal["error-message"] != old["error-message"]){
                this.errorMessage = newVal["error-message"]
            }
        }

        getTextAlign(align: string): string{
            let propTextAlign = align || "left"
            let classify: any = {
                left: "text-left",
                right: "text-right",
                center: "text-center"
            }
            return classify[propTextAlign]
        }

        mounted(){
            
        }

    }
</script>

<style scoped lang="less">
    .selected-picker:not(:last-child){
        .for-add-border{
            &::after{
                content: ' ';
                position: absolute;
                pointer-events: none;
                box-sizing: border-box;
                left: 0.4rem;
                right: 0;
                bottom: 0;
                -webkit-transform: scaleY(.5);
                transform: scaleY(.5);
                border-bottom: 0.026667rem solid #ebedf0;
            }
        }
    }
    .selected-picker-title{
        // max-width: 112.5px; 
    }
    .selected-picker-show{
        // text-align: left;
        clear:both;
    }
    .has-selected-picker{
        color: #323233;
    }
    .extra-con{
        float: right;
    }
</style>