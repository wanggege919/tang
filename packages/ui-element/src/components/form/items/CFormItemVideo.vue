<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="c-form-item c-form-item-video">
    <c-video :src="model[prop]" v-bind="$attrs" />
    <div v-if="title" class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { _, computed, ref } from '@zto/zpage'
import { useFormItem } from '../util'

const props = withDefaults(
  defineProps<{
    model: Record<string, any>
    prop: string
    title?: string
  }>(),
  {}
)

useFormItem(props)
</script>

<style lang="scss" scoped>
.c-form-item-video {
  padding: 5px;
  text-align: center;
}
</style>
