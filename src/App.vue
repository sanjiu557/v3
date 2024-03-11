
<template>
    <router-view v-slot="{ Component }">
        <Transition name="fade" type="transition" mode="out-in">
            <component :is="Component"></component>

        </Transition>
    </router-view>
</template>
<script setup lang="ts">
</script>

<style scoped  lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
