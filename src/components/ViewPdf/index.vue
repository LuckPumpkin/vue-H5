<!--
 * @Author: xiaoyu.ren
 * @Date: 2020-09-17 10:31:09
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-22 14:49:11
 * @Description: base64 预览/下载pdf
-->
<template>
  <div class="view-pdf">
    <!-- 预览pdf -->

    <van-popup v-model="showPop"
               round
               position="bottom"
               :style="{ height: '90%' }">
      <pdf v-for="i in numPages"
           :key="i"
           :src="src"
           :page="i"
          ></pdf>
      <!-- <div class="btn-group"
          >
        <van-button type="info"
                    block
                    round
                    @click="downloadPdf(data.content, '授权')">下载</van-button>
      </div> -->
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
// 引入pdf
import pdf from "vue-pdf";
// 解决部分文字不显示的问题
import CMapReaderFactory from "vue-pdf/src/CMapReaderFactory.js";
import axios from "axios";
@Component({
  components: {
    pdf,
  },
})
export default class index extends Vue {
  @Prop() data: any;

  src: any = "";
  numPages: number = 0;
  page: number = 1;
  currentPage: number = 0;
  showPop: boolean = false;
  isWX: boolean = true;

  created() {
    var ua: any = window.navigator.userAgent.toLowerCase();
    // 判断是否是微信打开
    this.isWX = ua.match(/MicroMessenger/i) == "micromessenger";
  }

  handleSee(url: any = '') {
    if (this.data.content) {
      if (this.data.type == "pdf") {
        let da = this.data.content;
        let loadingTask
        let _this = this
        if(url == 'base64') da = this.dataURLtoBlob(da)
        if(!url || url=='base64') {
          let win: any = window
          if (win.createObjectURL != undefined) { // basic
            _this.src = win.createObjectURL(da)
          } else if (win.webkitURL != undefined) { // webkit or chrome
            try {
              _this.src = win.webkitURL.createObjectURL(da)
            } catch (error) {

            }
          } else if (win.URL != undefined) { // mozilla(firefox)
            try {
              _this.src = win.URL.createObjectURL(da)
            } catch (error) {
            }
          }
        } else {
          _this.src = da
          console.log(_this.src)
        }
        console.log(_this.src,'src')
        // console.log(CMapReaderFactory,'CMapReaderFactory')
        loadingTask = pdf.createLoadingTask({url: _this.src, CMapReaderFactory})
        // let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.4.456/cmaps/";
        // loadingTask = pdf.createLoadingTask({
        //   url: _this.src,
        //   cMapUrl: CMAP_URL,
        //   cMapPacked: true,
        //   CMapReaderFactory
        // });
        this.showPop = true;
        loadingTask.promise.then((pdf: any) => {
          _this.numPages = pdf.numPages
          }).catch((err: any) => {
          console.error('pdf 加载失败', err)
        })
      } 
    } else {
      this.$toast.fail("内容不存在");
    }
  }

  //base64 转换 blob
  dataURLtoBlob(dataurl: any) {
    var bstr = atob(dataurl);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: "pdf" });
  }

  downloadPdf(content: any, name: any) {
    /**
     * @param content 后台返回的pdf文件base64编码
     * @param name 协议名称
     */
    var reader = new FileReader();
      reader.readAsDataURL(content);
      reader.onload = (e: any) => {
        // window.navigator.msSaveOrOpenBlob(content, `${name}.pdf`);
        var a: any = document.createElement("a");
        a.download = `${name}.pdf`;
        a.href = e.target.result;
        a.setAttribute("id", "export");
        a.click();
      }
    // if (!this.isWX) {
    //   let that = this;
    //   let URL = this.dataURLtoBlob(content);
    //   var reader = new FileReader();
    //   reader.readAsDataURL(URL);
    //   reader.onload = (e: any) => {
    //     // 兼容IE
    //     if (window.navigator.msSaveOrOpenBlob) {
    //       var bstr: any = atob(e.target.result.split(",")[1]);
    //       var n = bstr.length;
    //       var u8arr = new Uint8Array(n);
    //       while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //       }
    //       var blob = new Blob([u8arr]);
    //       window.navigator.msSaveOrOpenBlob(blob, `${name}.pdf`);
    //     } else {
    //       var a: any = document.createElement("a");
    //       a.download = `${name}.pdf`;
    //       a.href = e.target.result;
    //       a.setAttribute("id", "export");
    //       a.click();
    //     }
    //     that.showPop = false;
    //   };
    // }
  }

  /**预览、下载excel */
  handleViewExcel(content: any, name: any) {
    // 使用atob方法解码base64
    var raw = window.atob(content);
    // 创建一个存储解码后数据的数组
    var uInt8Array = new Uint8Array(raw.length);
    // blob只能接收二进制编码，需要讲base64转为二进制再塞进去
    for (var i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    // 这里给了一个返回值，在别的方法调用传入base64编码就可以得到转化后的blob
    const link = document.createElement("a");
    const blob = new Blob([uInt8Array], { type: "application/vnd.ms-excel" });
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    //设置下载的Excel表名
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
</script>

<style scoped lang="less">
.btn-group {
  padding: 24px;
}
</style>