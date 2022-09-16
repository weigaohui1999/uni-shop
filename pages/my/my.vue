<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import tabbarBadge from "@/mixins/tabbar-badge";
import {mapState} from 'vuex'
export default {
  mixins:[tabbarBadge],
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
