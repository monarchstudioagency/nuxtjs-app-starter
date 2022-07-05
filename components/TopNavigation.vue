<template>

  <el-container>
    <el-header class="top-navigation d-flex h-space-between v-align-center">
      <div>
        <div class="d-flex v-align-center">
          <el-avatar
            icon="el-icon-suitcase" size="small" shape="square"
            src="/svg/icon-light.svg"></el-avatar>
          <div class="ml-1">
            <p class="text-600 color-dark no-m">GES</p>
          </div>
        </div>
      </div>
      <div class="d-flex v-align-center">
        <el-dropdown trigger="click" class="pointer">
          <div class="d-flex v-align-center t_pointer t_company_content">
            <p class="mb-0 mt-0 mr-1">Thomas Sellem <i class="el-icon-arrow-down"></i></p>
            <!--
            <p class="mb-0 mt-0 mr-1">{{ $auth.user.identity.firstname }} {{ $auth.user.identity.lastname }} <i class="el-icon-arrow-down"></i></p>
            -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-link type="danger" :underline="false" @click="userLogout">Se déconnecter</el-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

  </el-container>

</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      search: ''
    };
  },
  methods: {
    async userLogout(){
      await this.$auth.logout().then(() => {
        this.$router.push('/');
        return this.$message.success('Vous êtes déconnecté');
      });
    }
  }
}
</script>
