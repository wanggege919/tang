<template>
  <c-page class="w-renderer-page" :fixed="false">
    <div class="w-renderer-page__body">
      <div id="app-renderer"></div>
      <!-- <slot /> -->
    </div>
  </c-page>
</template>

<script setup lang="ts">
// import { vue } from '@zto/zpage'
// import { useAppStore, useWidgetSchema } from '@zto/zpage-ui-element'

// const { computed, onMounted } = vue

// const store = useAppStore()

// // 属性
// const props = defineProps<{
//   schema: Record<string, any>
// }>()

// const wSchema = useWidgetSchema(props.schema)

// const currentApp = computed(() => {
//   return store.getters.app?.currentApp
// })

// onMounted(async () => {
//   setTimeout(async () => {
//     await App.render({
//       el: '#app-renderer',
//       path: '/demo/rendere/x',
//       schema: {
//         type: 'page'
//       }
//     })
//     App.instance.router.push('/demo/rendere/x')
//   }, 100)
// })
</script>

<style lang="scss" scoped>
.w-renderer-page {
  &__body {
    height: 100%;
    margin-top: $section-gutter;
  }
}
</style>
