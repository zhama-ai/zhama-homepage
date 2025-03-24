<template>
  <div class="min-h-screen bg-dark-900 bg-grid-pattern overflow-x-hidden">
    <router-view />
  </div>
</template>

<style>
html {
  scroll-padding-top: 80px; /* 为固定导航条留出空间 */
}
</style>
