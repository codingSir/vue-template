<template>
      <global-layout>

            <a-tabs
                    :active-key="activePage"
                    class="tab-layout-tabs"
                    style="height:52px"
                    :hide-add="true"
                    type="editable-card"
                    @change="changePage"
                    @tabClick="tabCallBack"
                    @edit="editPage">
                  <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
                        <span slot="tab" :pagekey="page.fullPath">{{ page.meta.title }}</span>
                  </a-tab-pane>
            </a-tabs>
            <div style="margin: 12px 12px 0; background: white;height: calc(100% - 59px - 12px)">
                  <transition name="page-toggle">
                        <!--<keep-alive v-if="">-->
                              <!--<router-view v-if="reloadFlag"/>-->
                        <!--</keep-alive>-->
                        <template>
                              <router-view v-if="reloadFlag"/>
                        </template>
                  </transition>
            </div>
      </global-layout>
</template>

<script>
    import GlobalLayout from './pages/GlobalLayout'

    const indexKey = '/tab/home';

    export default {
        name: 'TabLayout',
        components: {
            GlobalLayout,
        },
        data() {
            return {
                pageList: [],
                linkList: [],
                activePage: '',
                menuVisible: false,
                menuItemList: [
                    { key: '4', icon: 'reload', text: '刷 新' },
                    { key: '1', icon: 'arrow-left', text: '关闭左侧' },
                    { key: '2', icon: 'arrow-right', text: '关闭右侧' },
                    { key: '3', icon: 'close', text: '关闭其它' }
                ],
                reloadFlag:true
            }
        },
        provide(){
            return{
                closeCurrent:this.closeCurrent
            }
        },
        computed: {

        },
        created() {
            if (this.$route.path != indexKey) {
                this.addIndexToFirst()
            }
            // // update-begin-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
            // let storeKey = 'route:title:' + this.$route.fullPath
            // let routeTitle = this.$ls.get(storeKey)
            // if (routeTitle) {
            //     this.$route.meta.title = routeTitle
            // }
            // // update-end-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
            console.log(this.$route)
            this.pageList.push(this.$route)
            this.linkList.push(this.$route.fullPath)
            this.activePage = this.$route.fullPath
        },
        watch: {
            '$route': function(newRoute) {
                this.activePage = newRoute.fullPath;

                if(indexKey === newRoute.fullPath) {
                    //首页时 判断是否缓存 没有缓存 刷新之
                    if (newRoute.meta.keepAlive === false) {
                        this.routeReload()
                    }
                }else if (this.linkList.indexOf(newRoute.fullPath) < 0) {

                    this.linkList.push(newRoute.fullPath);

                    this.pageList.push(Object.assign({},newRoute));

                    if (newRoute.meta.keepAlive) {
                        this.routeReload()
                    }

                } else if (this.linkList.indexOf(newRoute.fullPath) >= 0) {

                    let oldIndex = this.linkList.indexOf(newRoute.fullPath);

                    let oldPositionRoute = this.pageList[oldIndex];

                    this.pageList.splice(oldIndex, 1, Object.assign({},newRoute,{meta:oldPositionRoute.meta}))
                }
            },
            'activePage': function(key) {
                let index = this.linkList.lastIndexOf(key);

                let waitRouter = this.pageList[index];

                this.$router.push(Object.assign({},waitRouter));

                this.changeTitle(waitRouter.meta.title)
            },
        },
        methods: {
            // 将首页添加到第一位
            addIndexToFirst() {
                this.pageList.splice(0, 0, {
                    name: 'home',
                    path: indexKey,
                    fullPath: indexKey,
                    meta: {
                        icon: 'dashboard',
                        title: '首页'
                    }
                });
                this.linkList.splice(0, 0, indexKey)
            },

            changeTitle(title) {
                let projectTitle = "bct";
                // 首页特殊处理
                if (this.$route.path === indexKey) {
                    document.title = projectTitle
                } else {
                    document.title = title + ' · ' + projectTitle
                }
            },

            changePage(key) {
                this.activePage = key
            },
            tabCallBack(key) {

            },
            editPage(key, action) {
                this[action](key)
            },
            remove(key) {
                if (key == indexKey) {
                    this.$message.warning('首页不能关闭!')
                    return
                }
                if (this.pageList.length === 1) {
                    this.$message.warning('这是最后一页，不能再关闭了啦')
                    return
                }
                this.pageList = this.pageList.filter(item => item.fullPath !== key)
                let index = this.linkList.indexOf(key)
                this.linkList = this.linkList.filter(item => item !== key)
                index = index >= this.linkList.length ? this.linkList.length - 1 : index
                this.activePage = this.linkList[index]
            },
            routeReload(){
                this.reloadFlag = false

                this.$nextTick(()=>{
                    this.reloadFlag = true
                })
            }
        }
    }
</script>

<style lang="scss">

      .page-transition-enter {
            opacity: 0;
      }

      .page-transition-leave-active {
            opacity: 0;
      }

      .page-transition-enter .page-transition-container,
      .page-transition-leave-active .page-transition-container {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
      }

      /*美化弹出Tab样式*/
      .ant-tabs-nav-container {
            margin-top: 4px;
      }

      /* 修改 ant-tabs 样式 */
      .tab-layout-tabs.ant-tabs {
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            background-color: white;
            padding: 0 20px;

            .ant-tabs-bar {
                  margin: 4px 0 0;
                  border: none;
            }

      }

      .ant-tabs {

            &.ant-tabs-card .ant-tabs-tab {

                  padding: 0 24px !important;
                  background-color: white !important;
                  margin-right: 10px !important;

                  .ant-tabs-close-x {
                        width: 12px !important;
                        height: 12px !important;
                        opacity: 0 !important;
                        cursor: pointer !important;
                        font-size: 12px !important;
                        margin: 0 !important;
                        position: absolute;
                        top: 36%;
                        right: 6px;
                  }

                  &:hover .ant-tabs-close-x {
                        opacity: 1 !important;
                  }

            }

      }

      .ant-tabs.ant-tabs-card > .ant-tabs-bar {
            .ant-tabs-tab {
                  border: none !important;
                  border-bottom: 1px solid transparent !important;
            }
            .ant-tabs-tab-active {
                  border-color: $primary-color!important;
            }
      }


</style>