<!-- 游戏列表 -->
<template>
  <div class="app-container">
    <fix-header v-model="show"></fix-header>

    <sport-list-item
      v-for="(item, index) in 3"
      :key="index"
      @click.native="handleClick(index)"
    ></sport-list-item>
    <!-- <button @click="show= !show">点击出现header</button> -->
    <nuxt-link to="/gamelist">跳转到gamelist</nuxt-link>
    <ul>
      <li v-for="(tab, index) in tabs" :key="index">
        {{ tab.typeID }} - {{ tab.typeName }} - {{ tab.LV }}
      </li>
    </ul>
  </div>
</template>

<script>
import sportListItem from 'components/page-list-components/sport-list-item'
import fixHeader from 'components/site-components/fix-header'
// import { getGameList, test } from '@/api/index'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'GameList',
  components: { fixHeader, sportListItem },

  data() {
    return {
      data: {},
      show: true
    }
  },
  computed: mapGetters({
    tabs: 'tabs/tabs'
  }),
  asyncData({ app }) {
    app.$axios.get('/api/GetTabs/GetReMen?FNum=3&SNum=4&TNum=5').then(res => {
      console.log(res)
    })
  },
  // fetch({ app }) {
  //   app.$axios.get('/api/GetTabs/3').then(res => {
  //     console.log(res)
  //   })
  // },
  mounted() {
    console.log(this)
  },
  methods: {
    ...mapMutations({
      push: 'tabs/push'
    }),
    handleClick(num) {
      console.log(num)
      const tabItem = {
        typeID: num,
        typeName: `名称${num}`,
        LV: 'Thrid'
      }
      console.log(num)
      this.$store.commit('tabs/push', { tabItem })
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  overflow: scroll;
}
</style>
