<template>
  <transition name="fade" mode="out-in">
    <div class="main" ref="livemain">
      <div class="container" ref="livecon">
        <img src="../assets/icons/ecoplus.png" alt="" width="280"/>
        <form>
          <div class="col-auto">
            <el-input class="form-input-mobile" v-model="User.mobile" placeholder="请输入手机号" clearable/>
          </div>
          <div class="col-auto">
            <el-input
                class="form-input-password"
                v-model="User.password"
                type="password"
                placeholder="请输入密码"
                show-password
            />
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary mb-3 btn-register" @click="skipRegister">注册</button>
            <button type="button" class="btn btn-primary mb-3 btn-login" @click="queryUser">登录</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import {ElNotification} from 'element-plus'

export default {
  name: "UserLogin",
  data() {
    return {
      // show: true,
      // timer: null,
      User: {
        mobile: '',
        password: '',
        token: {},
      },
    }
  },
  methods: {
    async queryUser() {
      if (!!(this.User.mobile && this.User.password)) {
        let ret = await this.$http.post('user/login' + '?mobile=' + this.User.mobile + '&password=' + this.User.password)
        // console.log(ret.data)
        console.log(ret.data)
        if (ret.data.code === 20000) {
          localStorage.setItem('token', ret.data.data.uid)
          this.$router.push('/home/user').then(() => {
            ElNotification({
              title: 'Success',
              message: '登录成功！',
              type: 'success',
              offset: 50,
            })
          })
        } else if (ret.data.code === 500) {
          ElNotification({
            title: 'Error',
            message: '用户不存在！',
            type: 'error',
            offset: 50,
          })
          localStorage.removeItem('token')
        } else if (ret.data.code === 501) {
          ElNotification({
            title: 'Error',
            message: '密码错误！',
            type: 'error',
            offset: 50,
          })
          localStorage.removeItem('token')
        } else {
          console.log('unexpected error')
        }
      } else {
        ElNotification({
          title: 'Error',
          message: '用户名/密码不能为空！',
          type: 'error',
          offset: 50,
        })
        localStorage.removeItem('token')
      }
    }
    ,
    skipRegister() {
      // this.show = !this.show
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.$nextTick(function () {
      //
      //   })
      // }, 500)
      this.$router.push('/navigation/register')
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 740px;
  padding: 80px;
  background: linear-gradient(to right bottom, #FF6E7F, #BFE9FF);

  .container {
    width: 340px;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 30px;
    -webkit-transition: all .2s linear;

    .form-input-mobile {
      margin-top: 30px;
    }

    .form-input-password {
      margin: 10px 0 20px;
    }

    .btn-register {
      background-color: #E77C85;
      border: none;
      width: 130px;
    }

    .btn-login {
      background-color: #22A2C3;
      border: none;
      width: 130px;
      margin-left: 20px;
    }
  }
}

.container:hover {
  transform: translate(0, -2px);
  box-shadow: 0 0 50px rgba(50, 50, 50, 0.3);
  background-color: rgba(255, 255, 255, 1);
  -webkit-transition: all .2s linear;
}
</style>