<template>
  <div class="nav-group">
    <ul>
      <li
        v-for="tab in tabList"
        :key="tab.typeID"
        @click="handleTabClick(tab.typeID)"
      >
        <a href="#">{{ tab.typeName }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavGroup',
  data() {
    return {}
  },
  computed: mapGetters({
    tabList: 'sport/getTabList'
  }),
  methods: {
    ...mapActions({
      changeParams: 'sport/changeParams'
    }),
    handleTabClick(id) {}
  }
}
</script>
<style lang="scss" scoped>
.nav-group {
  background-color: #f7f7f7;
  ul {
    padding: rem(5) 0;
    border-bottom: solid 1px #ddd;
    &::after {
      content: '.';
      display: block;
      height: 0;
      clear: both;
      overflow: hidden;
    }
    li {
      position: relative;
      float: left;
      width: 20%;
      line-height: rem(37);
      text-align: center;
      list-style-type: none;
    }
  }
}
</style>
