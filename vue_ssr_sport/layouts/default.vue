<template>
  <v-app>
    <v-toolbar fixed app>
      <img src="@/assets/img/logo.png" style="width:60px;" alt="" />
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container class="acontainer">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: '卓越直播'
    }
  }
}
</script>
<style lang="scss" scoped>
.acontainer {
  height: 100%;
  padding: 0px;
}
</style>
