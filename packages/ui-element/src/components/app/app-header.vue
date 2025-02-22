<template>
  <div class="app-header fw">
    <div class="header-logo" @click="handleLogoClick">
      <img :src="appLogo" />
      <!-- <div class="title">{{ title }}</div> -->
    </div>
    <div class="header-body">
      <div class="header-menu">
        <el-tabs v-model="activeTabName" class="header-menu-tabs" @tab-click="handleTabClick">
          <el-tab-pane v-for="it in tabItems" :key="it.name" :name="it.name">
            <template #label>
              <span>
                <i v-if="it.icon" :class="`el-${it.icon}`" />
                {{ it.label }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="header-extra">
        <component v-if="headerExtraComponent" :is="headerExtraComponent" />
        <app-header-extra v-else />
      </div>
    </div>

    <c-downloads-dialog ref="downloadsDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { _, useCurrentAppInstance, computed, ref } from '@zto/zpage'

import { UI_GLOBAL_EVENTS } from '../../consts'

import CDownloadsDialog from '../file/CDownloadsDialog.vue'
import AppHeaderExtra from './AppHeaderExtra.vue'

const app = useCurrentAppInstance()

const emitter = app.emitter
const { appStore } = app.stores
const router = app.router
const appConfig = app.useAppConfig('', {})

const imageAssets = app.useAssets('images', {})

const appLogo = imageAssets?.logo
const headerExtraComponent = appConfig.header?.extra?.component

const displaySubmodules = appConfig.menu?.displayedSubmodules

const tabItems = computed(() => {
  let submodules = appStore.submodules
  if (displaySubmodules?.length) {
    submodules = submodules.filter(it => displaySubmodules.includes(it.name))
  }

  return submodules.map((it: any) => {
    return { name: it.name, icon: it.icon, label: it.title }
  })
})

const downloadsDialogRef = ref<any>()

emitter.on(UI_GLOBAL_EVENTS.OPEN_DOWNLOADS, () => {
  downloadsDialogRef.value.show()
})

// 单击logo，返回首页
function handleLogoClick() {
  router.goHome()
}

// 当前激活按钮
const activeTabName = ref(appStore.navMenu.submodule)

// 菜单选中
function handleTabClick() {
  // 使用setTimeout防止菜单卡顿
  setTimeout(() => {
    appStore.changeSubmodule({ name: activeTabName.value })
  }, 5)
}
</script>

<style lang="scss" scoped>
$app-header-padding: 5px;
$app-header-inner-height: calc(var(--app-header-height) - $app-header-padding * 2);

.app-header {
  height: 100%;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  color: hsla(0, 0%, 100%, 0.8);
  background: linear-gradient(315deg, #5430ff, #3693ff);
}

.header-logo {
  padding: $app-header-padding;
  padding-left: 20px;
  padding-right: 100px;
  cursor: pointer;

  & > img {
    height: $app-header-inner-height;
    float: left;
  }

  & > .title {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    padding: 0 10px;
    line-height: $app-header-inner-height;
  }
}

.header-body {
  flex: 1;
  display: flex;
}

.header-menu {
  flex: 1;

  :deep(.el-tabs) {
    height: var(--app-header-height);

    .el-tabs {
      &__header {
        margin: 0;
        height: 100%;
      }

      &__nav {
        height: var(--app-header-height);
      }

      &__active-bar {
        background-color: white;
      }

      &__nav-wrap::after {
        background-color: transparent;
      }

      &__item {
        height: var(--app-header-height);
        line-height: var(--app-header-height);
        opacity: 0.5;
        color: white;

        &.is-active {
          opacity: 1;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.header-extra {
  padding: 0 20px;
}
</style>
