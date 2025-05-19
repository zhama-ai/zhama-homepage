<template>
  <div class="language-switcher">
    <select 
      :value="currentLocale" 
      @change="changeLocale" 
      class="bg-transparent text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

// Initialize locale from localStorage if available
const storedLocale = localStorage.getItem('locale')
if (storedLocale && (storedLocale === 'zh' || storedLocale === 'en')) {
  locale.value = storedLocale
}
</script>

<style scoped>
.language-switcher select option {
  background-color: #1f2937;
  color: white;
}
</style> 