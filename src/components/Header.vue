<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-2xl font-bold text-blue-600">扎马科技</span>
          </div>
          <nav class="hidden md:ml-10 md:flex md:space-x-8">
            <a href="#" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">首页</a>
            <a href="#features" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">产品特点</a>
            <a href="#advantages" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">产品优势</a>
            <a href="#download" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">下载应用</a>
            <a href="#about" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">关于我们</a>
            <a href="#contact" class="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">联系我们</a>
          </nav>
        </div>
        <div class="flex items-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium">立即体验</button>
        </div>
        <div class="flex items-center md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">首页</a>
        <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">产品特点</a>
        <a href="#advantages" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">产品优势</a>
        <a href="#download" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">下载应用</a>
        <a href="#about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">关于我们</a>
        <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600">联系我们</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script> 