<!--
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-04 10:51:07
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-04 16:21:28
-->
<template>
  <van-popup
    v-model="showPicker"
    round
    position="bottom"
    :close-on-click-overlay="false"
  >
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="clickCancel"
      @confirm="onConfirm"
    ></van-picker>
  </van-popup>
</template>

<script>
export default {
  props: ['showPicker', 'columns'],
  data() {
    return {
      pickerResult: [this.columns[0].values[0]],
    };
  },
  methods: {
    clickCancel() {
      this.$emit('cancel');
    },
    onConfirm(value) {
      this.pickerResult = value;
      this.$emit('onConfirm', this.pickerResult);
    },
  },
};
</script>
