<template>
  <div>
    <TopNavigation/>
    <SideMenu/>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        id: 'default-layout'
      }
    }
  }
}
</script>
