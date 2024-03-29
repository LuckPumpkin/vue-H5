<template>
    <div class="selected-picker">
        <van-field :label='label' :required='required' readonly class="for-add-border" input-align='right' :error-message='!errorMessage?"":errorMessage' error-message-align='right'>
            <template #input > 
                <span @click="onHandUpPicker">{{value?(value.length>0?value.join(" "):value.length == 0?placeholder: value):placeholder}}</span>
                <span @click="onHandUpPicker" class="extra-con"></span>
            </template>
            <template #button v-if='!readonly && value && value.length>0'> 
                <van-icon name="close" class="close-icon" @click="handleClear"/>
            </template>
        </van-field>
        <popup-picker :selected='value && value.length>0 ? Number(columns[0].values.indexOf(value[0])): 0' :show="showDialog" :columns="columns" :columnsLength="columnsLength" @onCancel="onCancelPopup" @onConfirm="onConfirmPopup" @onPickerChange="onPickerChange"></popup-picker>
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
        @Prop() readonly?:{
            type: boolean,
            default: false
        }  
        @Prop() required?:{
            type: boolean,
            default: false
        }
        
        public showDialog: boolean = false
        public errorMessage: string = ""

        onHandUpPicker(){
            if(this.$attrs["required-value"] == ""){
                this.onRequired()
                return 
            }
            if(this.readonly || this.columns[0].values.length == 0) return 
            this.showDialog = true
        }
        handleClear() {
            this.onConfirmPopup('', 0)
        }

        @Emit("onCancel")
        onCancelPopup(){
            this.showDialog = false
        }

        @Emit("onConfirm")
        onConfirmPopup(values: any, index: any){
            this.showDialog = false
            this.onChange(values)
            this.errorMessage = ""
            return !values[0] ? '' : values
        }

        @Emit("input")
        onChange(values: any){
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