<template>
      <!-- , width: fixedHeader ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'  -->
      <a-layout-header
              class="header"
              :style="{ padding: '0' }">
            <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="$emit('toggle')"
            />
      </a-layout-header>
</template>

<script>
    export default {
        name: 'GlobalHeader',
        props:{
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
        }
    }
</script>

<style lang="scss" scoped>

      $height: 59px;

      .layout {

            .top-nav-header-index {

                  .header-index-wide {
                        margin-left: 10px;

                        .ant-menu.ant-menu-horizontal {
                              height: $height;
                              line-height: $height;
                        }
                  }
                  .trigger {
                        line-height: 64px;
                        &:hover {
                              background: rgba(0, 0, 0, 0.05);
                        }
                  }
            }

            .header {
                  z-index: 2;
                  /*color: white;*/
                  height: $height;
                  /*background: rgba(0, 0, 0, 0.05);*/
                  transition: background 300ms;

                  /* dark 样式 */
                  &.dark {
                        color: #000000;
                        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
                        background-color: white !important;
                  }
            }

            .header, .top-nav-header-index {
                  &.dark .trigger:hover {
                        background: rgba(0, 0, 0, 0.05);
                  }
            }
      }

      .ant-layout-header {
            height: $height;
            line-height: $height;
      }

</style>