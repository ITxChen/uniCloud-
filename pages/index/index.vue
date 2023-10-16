<template>
  <view class="home">
    <view class="content">
      <navigator
        class="item"
        v-for="item in dataList"
        :url="'/pages/detail/detail?item=' + item._id">
        <view class="text">
          <view class="title">{{ item.title }}</view>
          <view class="info">
            <text>{{ item.author }}</text>
            <text>
              <uni-dateformat
                :date="item.postTime"
                format="yyyy/MM/dd"
                :threshold="[60000, 3600000]"></uni-dateformat>
            </text>
          </view>
        </view>

        <view class="pic">
          <image
            mode="aspectFill"
            v-if="item.picArrs&&item.picArrs.length"
            :src="item.picArrs[0]"></image>
          <image
            mode="aspectFill"
            src="../../static/images/ts.png"
            v-else></image>
        </view>
      </navigator>
    </view>

    <view class="goAdd" @click="goAdd">
      <uni-icons type="plusempty" size="20" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
// 1.获取数据
const dataList = ref([]);
const getData = () => {
  uniCloud
    .callFunction({
      name: "artGetAll",
      data: {
        skip: dataList.value.length,
      },
    })
    .then((res) => {
      const oldList = dataList.value;
      const newList = [...oldList, ...res.result.data];
      dataList.value = newList;
    });
};
// 2.点击跳转新增
const goAdd = () => {
  uni.navigateTo({
    url: "/pages/add/add",
  });
};
// 触底
onReachBottom(() => {
  getData();
});
onPullDownRefresh(() => {
  uni.stopPullDownRefresh();
});
stop;
// 下拉刷新

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.home {
  .content {
    padding: 30rpx;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #eee;
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 20rpx;
        .title {
          font-size: 44rpx;
          color: #333;
          text-align: justify;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .info {
          font-size: 28rpx;
          color: #888;
          text {
            padding-right: 20rpx;
          }
        }
      }
      .pic {
        width: 260rpx;
        height: 180rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .goAdd {
    width: 120rpx;
    height: 120rpx;
    background: #2b9939;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 50rpx;
    position: fixed;
    right: 60rpx;
    bottom: 100rpx;
    box-shadow: 0 0 20rpx rgba(43, 153, 57, 0.7);
  }
}
</style>
