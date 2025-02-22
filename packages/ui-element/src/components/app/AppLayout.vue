<template>
  <el-container class="c-app fs" :class="{ 'no-frame': !showFrame, 'no-nav': !showNav }" direction="vertical">
    <template v-if="showFrame">
      <el-header class="app-header-con">
        <app-header />
      </el-header>
      <app-container class="app-container" />
    </template>
    <template v-else>
      <app-content />
    </template>
  </el-container>
</template>

<script setup lang="ts">
import { _, ref, computed, useCurrentAppInstance, onMounted, onUnmounted } from '@zto/zpage'

import AppHeader from './app-header.vue'
import AppContent from './app-content.vue'
import AppContainer from './app-container.vue'

import Watermark from '../../utils/watermark'

const app = useCurrentAppInstance()

const frameConfig = app.useAppConfig('frame')
const menuConfig = app.useAppConfig('menu', {})

/** 是否显示框架 */
const showFrame = computed(() => {
  if (app.isMicro && _.isNil(frameConfig)) return false

  return frameConfig !== false
})

/** 是否显示菜单 */
const showNav = computed(() => {
  return showFrame.value && !!menuConfig.showNav
})

// 水印相关
const { userStore } = app.stores
const watermark = ref<any>(null)
const watermarkContent = computed(() => {
  const { nickname, deptName, positionName , mobile } = userStore.data.basic || {}
  return `${nickname}\n${deptName}\n${positionName}\n${mobile}`
})
onMounted(() => {
  // 调用
  watermark.value = new Watermark({
    content: watermarkContent.value,
  });
})
onUnmounted(() => {
  watermark.value.unload()
})
</script>

<style lang="scss" scoped>
.c-app {
  background: var(--app-bg-color);

  &.no-nav {
    .app-main-con {
      height: calc(100% - 20px);
    }
  }
}

.app-header-con {
  padding: 0;
  height: var(--app-header-height);
}

.app-container {
  height: calc(100vh - var(--app-header-height));
}
</style>

<style lang="scss">
.c-app.no-frame > .c-page {
  min-width: 100%;
  margin: 0;
}
</style>
