<template>
  <el-container>
    <!-- 显示格式化后的日期和时间 -->
    <span>{{ dateFormat(date) }}</span>
  </el-container>
</template>

<script>
export default {
  name: 'clock',
  data() {
    return {
      // 初始化当前时间
      date: new Date()
    }
  },
  mounted() {
    // 组件挂载后，设置一个定时器每秒更新时间
    let that = this;
    this.timer = setInterval(function () {
      that.date = new Date();  // 更新当前时间
    }, 1000);
  },
  beforeDestroy() {
    // 组件销毁前清除定时器，避免内存泄漏
    clearInterval(this.timer);
  },
  methods: {
    // 辅助方法：如果数值小于10，前面加0
    padaDate(value) {
      return value < 10 ? '0' + value : value;
    },
    // 将传入的日期对象格式化为字符串 "YYYY-MM-DD HH:mm:ss"
    dateFormat(date) {
      const year = date.getFullYear();  // 获取年份
      const month = this.padaDate(date.getMonth() + 1);  // 获取月份，月份从0开始计数，所以加1
      const day = this.padaDate(date.getDate());  // 获取日期
      const hours = this.padaDate(date.getHours());  // 获取小时
      const minutes = this.padaDate(date.getMinutes());  // 获取分钟
      const seconds = this.padaDate(date.getSeconds());  // 获取秒数
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }
}
</script>

<style scoped>
</style>
