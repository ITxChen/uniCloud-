<template>
  <view class="edit">
    <form @submit="onSubmit">
      <view class="item">
        <input type="text" name="title" v-model="formData.title" />
      </view>

      <view class="item">
        <input type="text" name="author" v-model="formData.author" />
      </view>

      <view class="item">
        <textarea name="content" v-model="formData.content"></textarea>
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
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";
let id = ref("");
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
 const bool = Object.keys(obj).some((key, value) => {
   return obj[key] == '';
 });
 return bool
};
// 根据id获取数据进行回显
const showForm = () => {
  uniCloud
    .callFunction({
      name: "artGetRow",
      data: { id },
    })
    .then((res) => {
      formData.value = res.result.data[0];
	  console.log(formData.value)
      if (!formData.value.picArrs) return;
      const urls = formData.value.picArrs.map((v) => {
        return { url: v };
      });
      imageValue.value = urls;
    });
};
// 根据id修改数据
const onSubmit = (e) => {
  const picArrs = imageValue.value.map((item) => item.url);
  console.log(picArrs)
  let detail = e.detail.value;
  uniCloud
    .callFunction({
      name: "updateData",
      data: { detail, id, picArrs },
    })
    .then((res) => {
      uni.showToast({
        title: "修改成功",
      });
      setTimeout(() => {
        uni.navigateTo({
          url: "/pages/index/index",
        });
      }, 500);
    });
};

onMounted(() => {
  showForm();
});
onLoad((e) => {
  id = e.id;
});
</script>

<style lang="scss" scoped>
.edit {
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
