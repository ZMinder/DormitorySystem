<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">登录</div>
      <el-form ref="form" :model="form" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item :model="form" prop="identity">
          <el-radio v-model="form.identity" label="stu">学生</el-radio>
          <el-radio v-model="form.identity" label="dormManager">宿舍管理员</el-radio>
          <el-radio v-model="form.identity" label="admin">后勤管理中心</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!disabled" class="login-button" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script src="@/assets/js/Login.js"></script>
<style scoped>
@import '../assets/css/Login.css';
</style>