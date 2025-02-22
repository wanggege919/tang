<template>
  <div class="c-page" :class="{ 'no-padding': noPadding, fixed }">
    <div v-if="isHeader" class="page-header-con" :style="headerStyle">
      <slot name="header">
        <c-page-header :referer="referer" :title="title" />
      </slot>
    </div>
    <div class="page-body-con" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useCurrentAppInstance } from '@zto/zpage'

const props = withDefaults(
  defineProps<{
    noPadding?: boolean
    fixed?: boolean
    title?: string
    referer?: string
    headerHeight?: string | number
  }>(),
  {
    fixed: true,
    headerHeight: '38px'
  }
)

const slots = useSlots()

const app = useCurrentAppInstance()

// 获取全局配置
const pageConfig = app.useComponentsConfig('page')

// 是否显示页面头部
const isHeader = computed(() => props.title || !!slots.header)

// 页面头部高度
const headerHeight = computed(() => props.headerHeight || pageConfig?.headerHeight)

// 页面头部样式
const headerStyle = computed(() => {
  return `height: ${headerHeight.value};`
})

// 页面主体样式
const bodyStyle = computed(() => {
  if (!isHeader.value) return ''
  return `padding-top: ${headerHeight.value || '0px'};`
})
</script>

<style scoped lang="scss">
.c-page {
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  padding: 10px;
  border-radius: 3px;

  & > .page-body-con {
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  &.fixed {
    height: 100%;
    overflow: auto;

    & > .page-body-con {
      height: 100%;
      overflow-x: auto;
    }
  }

  &.no-padding {
    padding: 0;

    & > .page-body-con {
      padding: 0;
    }
  }
}

.page-header-con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
