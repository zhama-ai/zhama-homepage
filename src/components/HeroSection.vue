<template>
  <section class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative z-10 py-8 sm:py-16 md:py-20 lg:max-w-2xl lg:w-full lg:py-28 xl:py-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">知学易</span>
              <span class="block text-blue-600">AI 笔记助手</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              利用尖端AI技术，提升你的笔记体验。知学易帮助你记录、总结并精准提炼关键信息，让你专注于真正重要的事情。
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  立即体验
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a href="#features" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                  了解更多
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" :src="heroImage" alt="AI笔记助手">
    </div>
  </section>
</template>

<script setup>
import heroImage from '@/assets/images/home.png';
</script> 