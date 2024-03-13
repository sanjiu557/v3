<template>
  <el-dropdown :trigger="props.trigger" size="default">
    <slot></slot>

    <template #dropdown>
      <ul>
        <li v-for="item in props.dropdownList" :style="{ color: props?.color ?? 'currentColor' }"
          class="cursor-pointer h-36px pl-20px pr-20px flex items-center hover:bg-#f8f8fa"
          @click="item.path?$router.push({path:`/${item.path}`}):''"
          >
          <SvgIcon :name="item.icon" :size="14" />
          <span class="ml-8px font-s-14">{{ item.label }}</span>
        </li>
      </ul>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

interface PropsType {
  dropdownList: any[],
   trigger: 'hover' | 'click', 
   color ?: string,
   path ?: string
}

const props = withDefaults(defineProps<PropsType>(), {
  trigger: 'hover'
})

</script>

<style scoped lang="scss"></style>