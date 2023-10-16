<template>
  <view class="add">
    <form @submit="onSubmit">
      <view class="item">
        <input
          type="text"
          v-model="formData.title"
          name="title"
          placeholder="请输入标题" />
      </view>

      <view class="item">
        <input
          type="text"
          v-model="formData.author"
          name="author"
          placeholder="请输入作者" />
      </view>

      <view class="item">
        <textarea
          name="content"
          v-model="formData.content"
          placeholder="请输入详细内容"></textarea>
      </view>

      <view class="item">
        <uni-file-picker
          v-model="imageValue"
          fileMediatype="image"
          mode="grid"
          @success="upLoadSuccess"
          @fail="fail" />
      </view>

      <view class="item">
        <button form-type="reset">重置</button>
        <button
          form-type="submit"
          type="primary"
          :disabled="isDisabled(formData)">
          提交
        </button>
      </view>
    </form>
  </view>
</template>

<script setup>
import { ref } from "vue";
// 数据
const formData = ref({
  title: "",
  author: "",
  content: "",
});
// 上传图片
const imageValue = ref([]);
const picArr = ref([]);
const upLoadSuccess = (e) => {
  picArr.value = e.tempFilePaths;
};
// 判断是否为空
const isDisabled = (obj) => {
  // for (let key in obj) {
  //   if (!obj[key]) {
  //     return true;
  //   }
  // }
  const bool = Object.keys(obj).some((key, value) => {
    return obj[key] == '';
  });
  return bool
};
// 提交按钮
const onSubmit = (e) => {
  let detail = e.detail.value;
  const picArrs = picArr.value;
  uniCloud
    .callFunction({
      name: "pushDataToDB",
      data: { detail, picArrs },
    })
    .then((res) => {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }, 500);
      uni.showToast({
        title: "发布成功",
      });
    });
};
</script>

<style lang="scss" scoped>
.add {
  padding: 30rpx;
  .item {
    padding-bottom: 20rpx;
    input,
    textarea {
      border: 1rpx solid #eee;
      height: 80rpx;
      padding: 0 20rpx;
    }
    textarea {
      height: 200rpx;
      width: 100%;
      box-sizing: border-box;
    }
    button {
      margin-bottom: 20rpx;
    }
  }
}
</style>
