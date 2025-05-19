<template>
  <header class="bg-dark-800 bg-opacity-80 backdrop-blur-sm border-b border-dark-600 shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <img src="/images/logo.png" alt="Logo" class="h-10 w-auto mr-2" />
            <span class="text-2xl font-semibold text-white">{{ $t('home.hero.title') }}</span>
          </div>
          <nav class="hidden md:ml-10 md:flex md:space-x-10">
            <router-link to="/" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.home') }}</router-link>
            <a href="#features" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.features') }}</a>
            <a href="#advantages" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.advantages') }}</a>
            <a href="#download" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.download') }}</a>
            <a href="#about" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.about') }}</a>
            <!-- <a href="#contact" class="text-gray-300 hover:text-accent-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">{{ $t('nav.contact') }}</a> -->
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
          <router-link to="/download" class="glow-button">{{ $t('nav.tryNow') }}</router-link>
        </div>
        <div class="flex items-center md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-300 hover:text-accent-400">
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
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-700 border-t border-dark-600">
        <router-link to="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.home') }}</router-link>
        <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.features') }}</a>
        <a href="#advantages" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.advantages') }}</a>
        <a href="#download" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.download') }}</a>
        <a href="#about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.about') }}</a>
        <!-- <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent-400 hover:bg-dark-600">{{ $t('nav.contact') }}</a> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const mobileMenuOpen = ref<boolean>(false);
</script> 