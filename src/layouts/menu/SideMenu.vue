<template>
      <a-layout-sider
              :class="['sider']"
              width="200px"
              :collapsible="collapsible"
              them="dark"
              v-model="collapsed"
              :trigger="null">
            <div class="logo" >
                  <img src="../../assets/logo.png" width="40px"/>
            </div>

            <a-menu  mode="inline"
                     theme="dark"
                     @click="handleClick"
                     :openKeys.sync="openKeys"
                     :selectedKeys="selectedKeys"
                     :defaultSelectedKeys="defaultSelected">
                  <a-menu-item key="/tab/home">
                        <a-icon type="user" />
                        <span>首页</span>
                  </a-menu-item>
                  <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="appstore" /><span>主档设定</span></span>
                        <a-menu-item key="/tab/product">产品</a-menu-item>
                        <a-menu-item key="/tab/about">检查清单</a-menu-item>
                  </a-sub-menu>
            </a-menu>
      </a-layout-sider>

</template>

<script>
     import { mapState } from 'vuex'
    export default {
        name: "SideMenu",
        props:{
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        data(){
            return {
                defaultSelected:['/tab/home'],
                selectedKeys:['/tab/home'],
                openKeys:[]
            }
        },
        mounted(){
            this.updateMenu()
        },
        methods:{
            handleClick(e){
                console.log(e)
                this.$router.push(e.key)
            },
            updateMenu () {
                const routes = this.$route.matched.concat()
                const { hidden } = this.$route.meta

                this.selectedKeys = [routes.pop().path]
                // if (routes.length >= 3 && hidden) {
                //     routes.pop()
                //     this.selectedKeys = [routes[routes.length - 1].path]
                // } else {
                //     this.selectedKeys = [routes.pop().path]
                // }
                // const openKeys = []
                // if (this.mode === 'inline') {
                //     routes.forEach(item => {
                //         openKeys.push(item.path)
                //     })
                // }
            },
        },
        watch:{
            openKeys:function (e) {
                console.log(e)
            },
            $route:function (e) {
               this.updateMenu()
            }
        }

    }
</script>
<style lang="scss" scoped>

      $height:59px;

      .sider {
            $scrollBarSize: 10px;

            .logo{
                  height: $height;
                  line-height: $height;
            }
            /*background: #fff;*/
            ul.ant-menu {

                  /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                  &::-webkit-scrollbar {
                        width: $scrollBarSize;
                        height: $scrollBarSize;
                        background-color: transparent;
                        display: none;
                  }

                  & .-o-scrollbar {
                        display: none;
                  }

                  /* 兼容IE */
                  -ms-overflow-style: none;
                  -ms-scroll-chaining: chained;
                  -ms-content-zooming: zoom;
                  -ms-scroll-rails: none;
                  -ms-content-zoom-limit-min: 100%;
                  -ms-content-zoom-limit-max: 500%;
                  -ms-scroll-snap-type: proximity;
                  -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);

                  /* 定义滚动条轨道 */
                  &::-webkit-scrollbar-track {
                        background-color: transparent;
                  }

                  /* 定义滑块 */
                  &::-webkit-scrollbar-thumb {
                        border-radius: $scrollBarSize;
                        background-color: #eee;
                        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

                        &:hover {
                              background-color: #dddddd;
                        }

                        &:active {
                              background-color: #bbbbbb;
                        }
                  }
            }

            /** 暗色系滚动条样式 */
            &.dark ul.ant-menu {
                  &::-webkit-scrollbar-thumb {
                        background-color: #666666;

                        &:hover {
                              background-color: #808080;
                        }

                        &:active {
                              background-color: #999999;
                        }
                  }
            }
      }

</style>

<style lang="scss">
      .ant-menu.ant-menu-root {
            & > .ant-menu-item:first-child {
                  /*background-color: transparent;*/

                  & > a, & > a:hover {
                        color: rgba(0, 0, 0, 0.65);
                  }

                  &.ant-menu-item-selected {
                        & > a, & > a:hover {
                              color: $primary-color;
                        }
                  }
            }

            &.ant-menu-dark > .ant-menu-item:first-child {
                  & > a, & > a:hover {
                        color: rgba(255, 255, 255, 0.65);
                  }

                  &.ant-menu-item-selected {
                        & > a, & > a:hover {
                              color: rgba(255, 255, 255, 1);
                        }
                  }
            }
      }
</style>