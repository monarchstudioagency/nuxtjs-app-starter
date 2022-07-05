<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="24" :md="6" class="mb-1">
        <el-card shadow="never">
          <p class="text-xxl no-m">111</p>
          <p class="no-m text-small color-dark">Chiffre 1</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="6" class="mb-1">
        <el-card shadow="never">
          <p class="text-xxl no-m color-primary">222</p>
          <p class="no-m text-small color-primary">Chiffre 2</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="6" class="mb-1">
        <el-card shadow="never">
          <p class="text-xxl no-m color-warning">333</p>
          <p class="no-m text-small color-warning">Chiffre 3</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="6" class="mb-1">
        <el-card shadow="never">
          <p class="text-xxl no-m">444</p>
          <p class="no-m text-small">Chiffre 4</p>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  head() {
    return {
      title: `${process.env.NAME} | Tableau de bord`,
      meta: [
        {hid: 'description', name: 'description', content: 'Tableau de bord'}
      ]
    }
  }
}
</script>
