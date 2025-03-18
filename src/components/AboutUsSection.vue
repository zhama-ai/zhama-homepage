<template>
  <section id="about" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">关于我们</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          扎马科技有限公司
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          以人工智能技术为核心，致力于提供智能学习工具和知识管理解决方案
        </p>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">我们的使命</h3>
            <p class="text-gray-600">
              扎马科技致力于通过人工智能技术改变人们获取、处理和应用知识的方式。我们相信，每个人都应该拥有高效学习和管理知识的工具，让知识的获取和应用变得更加简单、高效。
            </p>
            <p class="text-gray-600 mt-4">
              我们的目标是成为全球领先的AI学习工具提供商，帮助学生、专业人士和终身学习者更好地管理信息，提升学习效率。
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">公司历程</h3>
            <ul class="space-y-4">
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    2019
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-gray-600">公司成立，专注于AI技术在教育领域的应用研究</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    2020
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-gray-600">获得天使轮融资，组建核心研发团队</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    2021
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-gray-600">发布知学易1.0版本，获得用户积极反馈</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    2023
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-gray-600">完成A轮融资，产品用户突破100万</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 mb-8 text-center">我们的团队</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img class="h-full w-full object-cover" :src="userAvatar" alt="团队成员">
              </div>
              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900">张文杰</h4>
                <p class="text-blue-600">创始人 & CEO</p>
              </div>
            </div>
            
            <div class="text-center">
              <div class="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img class="h-full w-full object-cover" :src="userAvatar" alt="团队成员">
              </div>
              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900">林小雅</h4>
                <p class="text-blue-600">CTO</p>
              </div>
            </div>
            
            <div class="text-center">
              <div class="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img class="h-full w-full object-cover" :src="userAvatar" alt="团队成员">
              </div>
              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900">王大山</h4>
                <p class="text-blue-600">产品总监</p>
              </div>
            </div>
            
            <div class="text-center">
              <div class="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img class="h-full w-full object-cover" :src="userAvatar" alt="团队成员">
              </div>
              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900">赵明明</h4>
                <p class="text-blue-600">设计总监</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import userAvatarImg from '@/assets/images/user-avatar.svg';

const userAvatar = userAvatarImg;
</script> 