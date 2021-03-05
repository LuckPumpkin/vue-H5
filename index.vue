<!--
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-02 15:14:54
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-05 11:47:09
-->
<template>
  <div class="br_background">
    {{ name }}
    <van-button type="primary">anniu</van-button>
    <popupPicker
      :showPicker="false"
      :columns="columns"
      @onConfirm="onConfirms"
    ></popupPicker>
    <van-cell-group>
      <van-field v-model="name" label="文本" placeholder="请输入用户名" />
      <selected-picker
        :columns="columns"
        placeholder="请选择"
        @onConfirm="onConfirms"
        label="小南瓜"
        v-model="name"
      >
      </selected-picker>
      <vaildate-field
        label="小鱼仔"
        v-model="name"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入' }]"
        :error-message="errorInfo.name"
      ></vaildate-field>
      <search-fild
        label="小西瓜"
        :value="name"
        placeholder="请输入"
        :activeList='activeList'
        :error-message='errorInfo.name'
        :showButton='true'
        :showActionlist='showActionlist'
        @select='handleSelect'
        @handleButton='handleButton'>
      </search-fild>
    </van-cell-group>
  </div>
</template>

<script>
import popupPicker from '../components/popupPicker/index.vue';
import selectedPicker from '../components/selectedPicker/index.vue';
import vaildateField from '../components/validataField/index.vue';
import searchFild from '../components/searchField/index.vue'
export default {
  components: {
    popupPicker,
    'selected-picker': selectedPicker,
    'vaildate-field': vaildateField,
    'search-fild': searchFild
  },
  data() {
    return {
      name: '',
      columns: [{ values: [1, 2, 3, 4, 5, 6, 7, 8, 9] }],
      errorInfo: {
        name: '',
      },
      activeList: [],
      showActionlist: false
    };
  },
  methods: {
    onConfirms(value) {
      console.log(value);
    },
    handleButton() {
      this.showActionlist = true
      this.activeList = [1]
    },
    handleSelect() {
      this.showActionlist = false
    }
  },
};
</script>

<style type="less" scoped>
.br_background {
  background-color: #fff;
}
</style>
