<template>
  <div class="main">
    <carouse-card class="advertise" :adgroup="adgroup"/>
    <div class="container">
      <p class="title m-0">注册</p>
      <p class="subtitle m-0">Register</p>
      <div class="sub-form">
        <form class="form-control-sm">
          <div class="col-auto mt-2">
            <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="User.username"
                   autocomplete="off">
          </div>
          <div class="col-auto mt-3">
            <input type="text" class="form-control" id="realname" placeholder="请输入真实姓名" v-model="User.realname"
                   autocomplete="off">
          </div>
          <div class="col-auto mt-3">
            <input type="text" class="form-control" id="mobile" placeholder="请输入手机号" v-model="User.mobile"
                   autocomplete="off">
          </div>
          <div class="col-auto mt-3">
            <input type="email" class="form-control" id="email" placeholder="请输入邮箱（可选）" v-model="User.email"
                   autocomplete="off">
          </div>
          <div class="col-auto mt-3">
            <input autocomplete=“off” type="password" class="form-control" id="password" placeholder="请输入密码"
                   v-model="User.password">
          </div>
          <div class="col-auto mt-3">
            <input autocomplete=“off” type="password" class="form-control" id="confirm" placeholder="请确认密码"
                   v-model="cfm">
          </div>
          <div class="col-auto mt-3">
            <el-select class="form-con" v-model="User.type" placeholder="账户类型">
              <el-option label="用户" value="1"/>
              <el-option label="管理员" value="0"/>
            </el-select>
          </div>
          <div class="col-auto mt-4">
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
          url: '../../src/assets/img/register/register_demo1.jpg',
        },
        {
          id: '1',
          url: '../../src/assets/img/register/register_demo2.jpg',
        },
        {
          id: '2',
          url: '../../src/assets/img/register/register_demo3.jpg',
        },
      ],
      User: {
        username: '',
        mobile: '',
        email: '',
        password: '',
        realname: '',
        type: ''
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
    async addUser() {
      if (!!(this.User.username && this.User.mobile && this.User.password && this.cfm)) {
        if (!!this.User.username.match(this.reg_username)) {
          if (this.User.realname !== '') {
            if (!!this.User.mobile.match(this.reg_mobile)) {
              if (!!this.User.password.match(this.reg_password)) {
                if (this.User.password === this.cfm) {
                  if (this.User.type !== '') {
                    console.log(this.User)
                    let ret = await this.$http.post('user/register', this.User)
                    // console.log(ret.data)
                    if (ret.data.code === 20000) {
                      localStorage.setItem('token', ret.data.data.uid)
                      this.$router.push('/home/user').then(() => {
                        ElMessage({
                          showClose: true,
                          message: '注册成功！已为您自动跳转到主页',
                          type: 'success',
                          offset: -2
                        })
                        console.log(localStorage.getItem('token'))
                      })
                    } else if (ret.data.code === 500) {
                      ElMessage({
                        showClose: true,
                        message: '手机号已被占用！',
                        type: 'error',
                        offset: -2
                      })
                      localStorage.removeItem('token')
                    } else {
                      console.log('unexpected error')
                      localStorage.removeItem('token')
                    }
                  } else {
                    ElMessage({
                      showClose: true,
                      message: '账户类型不能为空！',
                      type: 'error',
                      offset: -2
                    })
                    localStorage.removeItem('token')
                  }
                } else {
                  ElMessage({
                    showClose: true,
                    message: '两次密码输入不一致！',
                    type: 'error',
                    offset: -2
                  })
                  localStorage.removeItem('token')
                }
              } else {
                ElMessage({
                  showClose: true,
                  message: '密码6位字符以上，支持且至少一个数字、一个字母',
                  type: 'error',
                  offset: -2
                })
                localStorage.removeItem('token')
              }
            } else {
              ElMessage({
                showClose: true,
                message: '请输入正确的手机号！',
                type: 'error',
                offset: -2
              })
              localStorage.removeItem('token')
            }
          } else {
            ElMessage({
              showClose: true,
              message: '真实姓名不能为空！',
              type: 'error',
              offset: -2
            })
            localStorage.removeItem('token')
          }
        } else {
          ElMessage({
            showClose: true,
            message: '用户名4到16位字符，支持数字、字母、下划线',
            type: 'error',
            offset: -2
          })
          localStorage.removeItem('token')
        }
      } else {
        ElMessage({
          showClose: true,
          message: '必填项不能为空！',
          type: 'error',
          offset: -2
        })
        localStorage.removeItem('token')
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
      top: -90px;

      .form-control-sm {
        .form-control {
          font-size: 15px;
          font-family: "等线 Light", serif;
        }

        .form-con {
          width: 264px;
        }

        #username {
          background-image: url("../assets/icons/icon_register/用户名.svg");
          background-repeat: no-repeat;
          background-size: 8%;
          padding-left: 40px;
          background-position: 5px 7px;
        }

        #realname {
          background-image: url("../assets/icons/icon_register/姓名.svg");
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
      bottom: 100px;

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