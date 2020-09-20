<template>
      <div class="main">
            <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
                  <a-form-item>
                        <a-input
                                size="large"
                                v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
                                type="text"
                                placeholder="请输入帐户名 / admin">
                              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                  </a-form-item>

                  <a-form-item>
                        <a-input
                                v-decorator="['password',validatorRules.password]"
                                size="large"
                                type="password"
                                autocomplete="false"
                                placeholder="密码 / 123456">
                              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                  </a-form-item>


                  <!--<a-form-item>-->
                        <!--<a-checkbox v-decorator="['rememberMe', {initialValue: true, valuePropName: 'checked'}]">自动登陆-->
                        <!--</a-checkbox>-->
                        <!--<router-link :to="{ name: 'alteration'}" class="forge-password" style="float: right;">-->
                              <!--忘记密码-->
                        <!--</router-link>-->
                        <!--<router-link :to="{ name: 'register'}" class="forge-password"-->
                                     <!--style="float: right;margin-right: 10px">-->
                              <!--注册账户-->
                        <!--</router-link>-->
                  <!--</a-form-item>-->

                  <a-form-item style="margin-top:24px">
                        <a-button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                class="login-button"
                                :loading="loginBtn"
                                @click.stop.prevent="handleSubmit"
                                :disabled="loginBtn">确定
                        </a-button>
                  </a-form-item>

            </a-form>

      </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                requiredTwoStepCaptcha: false,
                stepCaptchaVisible: false,
                form: this.$form.createForm(this),
                encryptedString: {
                    key: "",
                    iv: "",
                },
                state: {
                    time: 60,
                    smsSendBtn: false,
                },
                validatorRules: {
                    username: {rules: [{required: true, message: '请输入用户名!'}, {validator: this.handleUsernameOrEmail}]},
                    password: {rules: [{required: true, message: '请输入密码!', validator: 'click'}]},
                    // mobile: {rules: [{validator: this.validateMobile}]},
                    captcha: {rule: [{required: true, message: '请输入验证码!'}]},
                    inputCode: {rules: [{required: true, message: '请输入验证码!'}]}
                },
                verifiedCode: "",
                inputCodeContent: "",
                inputCodeNull: true,

                departList: [],
                departVisible: false,
                departSelected: "",
                currentUsername: "",
                validate_status: "",
                currdatetime: '',
                randCodeImage: '',
                requestCodeSuccess: false
            }
        },
        created() {

        },
        methods: {
            handleSubmit(){
                this.$router.push('/tab/home')
            },
            handleUsernameOrEmail(){
                return true
            }
        }
    }
</script>

<style lang="scss" scoped>

      .container {
            width: 100%;
            min-height: 100%;
            background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
            background-size: 100%;
            padding: 110px 0 144px;
            position: relative;
            .main {
                  min-width: 260px;
                  width: 368px;
                  margin: 0 auto;
            }
      }
      .user-layout-login {
            label {
                  font-size: 14px;
            }

            .getCaptcha {
                  display: block;
                  width: 100%;
                  height: 40px;
            }

            .forge-password {
                  font-size: 14px;
            }

            button.login-button {
                  padding: 0 15px;
                  font-size: 16px;
                  height: 40px;
                  width: 100%;
            }

            .user-login-other {
                  text-align: left;
                  margin-top: 24px;
                  line-height: 22px;

                  .item-icon {
                        font-size: 24px;
                        color: rgba(0, 0, 0, .2);
                        margin-left: 16px;
                        vertical-align: middle;
                        cursor: pointer;
                        transition: color .3s;

                        &:hover {
                              color: #1890ff;
                        }
                  }

                  .register {
                        float: right;
                  }
            }
      }

</style>
<style>
      .valid-error .ant-select-selection__placeholder {
            color: #f5222d;
      }
</style>