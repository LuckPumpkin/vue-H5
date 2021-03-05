<!--
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-04 16:22:21
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-05 11:22:52
-->
<template>
  <div class="selected-picker">
    <van-field
      class="for-add-border"
      :label="label"
      readonly
      input-align="right"
      error-message-align="right"
    >
      <template #input>
        <span @click="onHandleUpPicker">{{
          !value ? placeholder : value
        }}</span>
        <span @click="onHandleUpPicker" class="extra-con"></span>
      </template>
      <template #button v-if="!readonly && value">
        <van-icon name="close" class="close-icon" @click="handleClear" />
      </template>
    </van-field>
    <popup-picker
      :showPicker="showPicker"
      :columns="columns"
      @cancel="onCancel"
      @onConfirm="onConfirm"
    ></popup-picker>
  </div>
</template>
<script>
import popupPicker from '../popupPicker/index.vue';
export default {
  props: ['value', 'placeholder', 'label', 'columns', 'readonly'],
  data() {
    return {
      showPicker: false,
      errorMessage: '',
    };
  },
  components: {
    'popup-picker': popupPicker,
  },
  watch: {
    $attrs: {
      handler(n, o) {
        if (n['error-message'] != o['error-message']) {
          this.errorMessage = n['error-message'];
        }
      },
      deep: true,
    },
  },
  methods: {
    onHandleUpPicker() {
      if (!this.$attrs['required-value'] == false) {
        this.$emit('required');
        return;
      }
      if (this.readonly) return;
      if (this.columns.length === 0) {
        this.$toast({
          type: 'fail',
          message: '暂无数据',
          transition: 1000,
        });
        return;
      }
      this.showPicker = true;
    },
    onCancel() {
      this.showPicker = false;
    },
    onConfirm(value) {
      this.showPicker = false;
      this.value = value[0];
    },
    handleClear() {
      this.onConfirm([]);
    },
  },
};
</script>

<style lang="less" scoped>
.selected-picker:not(:last-child) {
  .for-add-border {
    &::after {
      content: ' ';
      position: absolute;
      pointer-events: none;
      box-sizing: border-box;
      left: 0.4rem;
      right: 0;
      bottom: 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      border-bottom: 0.026667rem solid #ebedf0;
    }
  }
}
.extra-con {
  float: right;
}
</style>
