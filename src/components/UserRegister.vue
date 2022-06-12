<template>
  <div class="main">
    <carouse-card class="advertise" :adgroup="adgroup"/>
    <div class="container">
      <p class="title m-0">注册</p>
      <p class="subtitle m-0">Register</p>
      <div class="sub-form">
        <form class="form-control-sm">
          <div class="col-auto mt-3">
            <input type="text" class="form-control" id="username" placeholder="请输入用户名"
                   v-model="User.username">
          </div>
          <div class="col-auto mt-3">
            <input type="text" class="form-control" id="mobile" placeholder="请输入手机号" v-model="User.mobile">
          </div>
          <div class="col-auto mt-3">
            <input type="email" class="form-control" id="email" placeholder="请输入邮箱（可选）" v-model="User.email">
          </div>
          <div class="col-auto mt-3">
            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="User.password">
          </div>
          <div class="col-auto mt-3">
            <input type="password" class="form-control" id="confirm" placeholder="请确认密码" v-model="cfm">
          </div>
          <div class="col-auto mt-5">
            <button type="button" class="btn btn-primary mb-3" @click="addUser">注册</button>
          </div>
        </form>
      </div>
      <span class="link" @click="skipLogin">
        已有账号？去
        <a href="">登录</a>
      </span>
    </div>
  </div>
</template>

<script>
import CarouseCard from './CarouselCard.vue'
import {ElMessage} from "element-plus"

export default {
  name: "UserRegister",
  data() {
    return {
      adgroup: [
        {
          id: '0',
          url: 'src/assets/img/register_demo1.jpg',
        },
        {
          id: '1',
          url: 'src/assets/img/register_demo2.jpg',
        },
        {
          id: '2',
          url: 'src/assets/img/register_demo3.jpg',
        },
      ],
      User: {
        username: '',
        mobile: '',
        email: '',
        password: '',
      },
      cfm: '',
      reg_username: /^\w{4,16}$/,
      reg_mobile: /^(13\d|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18\d|19[0-35-9])\d{8}$/,
      reg_password: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/,
    }
  },
  components: {
    CarouseCard
  },
  methods: {
    skipLogin() {
      this.$router.push('/navigation/login')
    },
    checkNull() {
      return !!(this.User.username && this.User.mobile && this.User.password && this.cfm)
    },
    checkName() {
      return !!this.User.username.match(this.reg_username)
    },
    checkMobile() {
      return !!this.User.mobile.match(this.reg_mobile)
    },
    checkPassword() {
      return !!this.User.password.match(this.reg_password)
    },
    verifyPassword() {
      return this.User.password === this.cfm
    },
    async addUser() {
      if (this.checkNull()) {
        if (this.checkName()) {
          if (this.checkMobile()) {
            if (this.checkPassword()) {
              if (this.verifyPassword()) {
                let ret = await this.$http.post('user/register', this.User)
                // console.log(ret.data)
                if (ret.data.code === 20000) {
                  this.$router.push('/home/user').then(r => {
                    ElMessage({
                      showClose: true,
                      message: '注册成功！已为您自动跳转到主页',
                      type: 'success',
                      offset: -2
                    })
                  })
                } else if (ret.data.code === 500) {
                  ElMessage({
                    showClose: true,
                    message: '手机号已被占用！',
                    type: 'error',
                    offset: -2
                  })
                } else {
                  console.log('unexpected error')
                }
              } else {
                ElMessage({
                  showClose: true,
                  message: '两次密码输入不一致！',
                  type: 'error',
                  offset: -2
                })
              }
            } else {
              ElMessage({
                showClose: true,
                message: '密码支持数字、字母且至少一个数字、一个字母',
                type: 'error',
                offset: -2
              })
            }
          } else {
            ElMessage({
              showClose: true,
              message: '请输入正确的手机号！',
              type: 'error',
              offset: -2
            })
          }
        } else {
          ElMessage({
            showClose: true,
            message: '用户名4到16位字符，支持数字、字母、下划线',
            type: 'error',
            offset: -2
          })
        }
      } else {
        ElMessage({
          showClose: true,
          message: '必填项不能为空！',
          type: 'error',
          offset: -2
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 740px;
  padding: 80px;
  background: linear-gradient(to left top, #70E1F5, #FFD194);
  position: relative;

  .advertise {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100px;
  }

  .container {
    width: 340px;
    height: 500px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 30px;
    -webkit-transition: all .2s linear;
    position: absolute;
    right: 120px;
    z-index: 999;
    opacity: 0.9;

    .title {
      font-size: 48px;
      font-family: "等线 Light", serif;
      color: rgba(47, 144, 185, 0.6);
      text-align: center;
      position: relative;
      top: -70px;
    }

    .subtitle {
      font-size: 18px;
      font-family: "等线 Light", serif;
      color: rgba(47, 144, 185, 0.6);
      text-align: center;
      position: relative;
      top: -85px;
    }

    .sub-form {
      position: relative;
      top: -60px;

      .form-control-sm {
        .form-control {
          font-size: 15px;
          font-family: "等线 Light", serif;
        }

        #username {
          background-image: url("../assets/icons/icon_register/用户名.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 7px;
        }

        #mobile {
          background-image: url("../assets/icons/icon_register/dianhua.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 7px;
        }

        #email {
          background-image: url("../assets/icons/icon_register/tubiao_youxiang.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 6px;
        }

        #password {
          background-image: url("../assets/icons/icon_register/mima.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 5px;
        }

        #confirm {
          background-image: url("../assets/icons/icon_register/yaochi.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 7px;
        }

        .btn-primary {
          background-color: #22A2C3;
          border: none;
          width: 60%;
          display: block;
          margin: auto;
        }
      }
    }

    .link {
      font-size: 16px;
      font-family: "等线 Light", serif;
      cursor: pointer;
      display: block;
      text-align: center;
      position: relative;
      bottom: 60px;

      a {
        text-decoration: underline;
        color: rgba(47, 144, 185);
      }
    }
  }

  .container:hover {
    transform: translate(0, -2px);
    box-shadow: 0 0 50px rgba(50, 50, 50, 0.3);
    -webkit-transition: all .2s linear;
    opacity: 1;
  }
}
</style>