<template>

  <el-container>

    <el-header id="mobile_header" height="50px">
      <button id="icon_menu_trigger" type="button" @click="openSidebar">
        <i class="el-icon-menu" style="font-size: 20px"></i>
      </button>
      <img src="/img/madate-logo.png" alt="Ziplo Logo Mobile" style="width: 100px;">
      <div style="width: 20px;"></div>
    </el-header>

    <el-aside id="sidebar_navigation" width="256px" :class="sidebar_state">

      <el-menu class="side_menu">

        <el-menu-item>
          <n-link to="/dashboard" class="el-link el-link--default text-600"><i class="el-icon-menu"></i> Tableau de bord
          </n-link>
        </el-menu-item>

        <el-divider></el-divider>

        <el-menu-item>
          <n-link to="/examples" class="el-link el-link--default text-600"><i class="el-icon-office-building"></i> Examples
          </n-link>
        </el-menu-item>

      </el-menu>

    </el-aside>

    <div id="overlay_sidebar" v-if="visible" @click="closeSidebar"></div>

  </el-container>

</template>

<script>
export default {
  data() {
    return {
      activeIndex: '',
      sidebar_state: '',
      visible: false,
      hideBadge: '',
      container: {
        name: '',
        logo: { url: '' }
      }
    };
  },
  methods: {
    openSidebar() {
      this.sidebar_state = 'open'
      this.visible = !this.visible
    },
    closeSidebar() {
      this.sidebar_state = ''
      this.visible = !this.visible
    }
  }
}
</script>
