<template>
  <div class="home">
    <el-container class="hero-image">
      <el-header class="weather-widget">
        <div class="weather-report">
          <el-row :gutter="20">
            <el-col :span="24" class="weather-content">
              <el-badge value="实时" class="weather-badge">
                <span>{{ weatherData.temperature }}°C | {{
                    getWeatherDescription(weatherData.condition)
                  }}</span>
              </el-badge>
              <div>位置：{{ weatherData.location }}</div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main class="hero-text">
        <h1>宿舍生活，从这里开始</h1>
        <p>提供舒适安全的居住环境，尽在我们的宿舍管理系统。</p>
      </el-main>
    </el-container>
  </div>
</template>

<script src="@/assets/js/Home.js"></script>

<style scoped>@import '../assets/css/Home.css';</style>