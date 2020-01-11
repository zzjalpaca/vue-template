<template>
  <div class="navbar-top">
    <el-menu
      :default-active="defaultActiveIndex"
      :router="true"
      :background-color="variables.navBarTopBg"
      :text-color="variables.navBarTopText"
      :active-text-color="variables.navBarTopTextActive"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item
        v-for="item in permissionRoutes"
        v-if="!item.hidden&&item.children"
        :key="item.path"
        :index="item.path" >
        <Navitem :icon="item.meta.icon||(item.meta&&item.meta.icon)" :title="item.meta.title" />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Navitem from './Navitem'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  components: {
    Navitem
  },
  data() {
    return {
      defaultActiveIndex: '/',
      loading: false,
      nickname: ''
    }
  },
  computed: {
    ...mapGetters([
      'permissionRoutes'
    ]),
    variables() {
      return variables
    }
  },
  mounted() {
    console.log(this.permissionRoutes)
  },
  methods: {
    handleSelect(index) {
      this.defaultActiveIndex = index
      const routers = this.permissionRoutes // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].path === index) {
          this.$store.dispatch('app/changeNavMenu', routers[i].children)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.navbar-top {
  height: 50px;
  line-height: 50px;
  transition: margin-left .18s;
  z-index: 1002;
  .logo-container {
    background-color: $navBarTopBg;
    height: 50px;
    .topbar-logos {
      color: $navBarTopLogo;
      line-height: 50px;
      font-size: 20px;
      position: absolute;
      left: 20px;
    }
  }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 0 #e6e6e6;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    position: absolute;
    right: 10px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: $navBarTopText;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 0px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 0;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -15px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
