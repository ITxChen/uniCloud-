<template>
  <view class="detail">
    <view v-if="loading">
      <view class="title">{{ dbItem.title }}</view>
      <view class="info">
        <text>{{ dbItem.author }}</text>
        <text>
          <uni-dateformat
            :date="dbItem.postTime"
            format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
        </text>
      </view>
      <view class="content">{{ dbItem.content }}</view>

      <view class="picurls" v-if="dbItem.picArrs&&dbItem.picArrs.length">
        <image mode="widthFix" v-for="item in dbItem.picArrs " :key="item._id" :src="item"></image>
      </view>

      <view class="btnGroup">
        <button size="mini" @click="onEdit">修改</button>
        <button size="mini" type="warn" @click="onRemove">删除</button>
      </view>
    </view>

    <view v-else>
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";
// 获取id
let id = ref("");
// 加载动画
const loading = ref(false);
// 1.获取数据
const dbItem = ref([]);
const getDbItem = () => {
  uniCloud
    .callFunction({
      name: "artGetRow",
      data: { id },
    })
    .then((res) => {
      dbItem.value = res.result.data[0];

      loading.value = true;
      uni.setNavigationBarTitle({
        title: dbItem.value.title,
      });
    });
};

// 2.删除数据
const onRemove = () => {
  uni.showModal({
    content: "是否确认删除",
    success: (res) => {
      if (res.confirm) {
        uniCloud
          .callFunction({
            name: "artRemove",
            data: { id },
          })
          .then((res) => {
            uni.showToast({
              title: "删除成功",
            });
            // 删除成功后返回首页
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index",
              });
            }, 500);
          });
      }
    },
  });
};
//  3.修改数据
const onEdit = () => {
  uni.navigateTo({
    url: "/pages/edit/edit?id=" + id,
  });
};
onMounted(() => {
  getDbItem();
});
onLoad((e) => {
  id = e.item;
});
</script>

<style lang="scss" scoped>
.detail {
  padding: 30rpx;
  .title {
    font-size: 50rpx;
    color: #000;
    text-align: justify;
    line-height: 1.4em;
  }
  .info {
    font-size: 30rpx;
    color: #666;
    padding: 30rpx 0 60rpx;
    text {
      padding-right: 30rpx;
    }
  }
  .content {
    font-size: 36rpx;
    line-height: 1.7em;
  }
  .picurls {
    padding-top: 50rpx;
    image {
      width: 100%;
      display: block;
      margin-bottom: 30rpx;
    }
  }
  .btnGroup {
    padding: 50rpx 0;
    button {
      margin-right: 30rpx;
    }
  }
}
</style>
