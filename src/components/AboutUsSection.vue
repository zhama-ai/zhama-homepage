<template>
  <section id="about" class="py-28 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">关于我们</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          扎马<span class="text-indigo-600">科技</span>有限公司
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
          以人工智能技术为核心，致力于提供智能学习工具和知识管理解决方案
        </p>
      </div>

      <div class="mt-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 ml-4">我们的使命</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">
              扎马科技致力于通过人工智能技术改变人们获取、处理和应用知识的方式。我们相信，每个人都应该拥有高效学习和管理知识的工具，让知识的获取和应用变得更加简单、高效。
            </p>
            <p class="text-gray-600 mt-6 leading-relaxed">
              我们的目标是成为全球领先的AI学习工具提供商，帮助学生、专业人士和终身学习者更好地管理信息，提升学习效率。
            </p>
          </div>

          <div class="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 ml-4">公司历程</h3>
            </div>
            <ul class="space-y-6">
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold shadow-md">
                    19
                  </div>
                </div>
                <div class="ml-6">
                  <p class="text-gray-700 font-medium">公司成立，专注于AI技术在教育领域的应用研究</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold shadow-md">
                    20
                  </div>
                </div>
                <div class="ml-6">
                  <p class="text-gray-700 font-medium">获得天使轮融资，组建AI研发团队</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold shadow-md">
                    22
                  </div>
                </div>
                <div class="ml-6">
                  <p class="text-gray-700 font-medium">知学易1.0版本发布，获得业内高度评价</p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold shadow-md">
                    23
                  </div>
                </div>
                <div class="ml-6">
                  <p class="text-gray-700 font-medium">完成A轮融资，全球用户突破100万</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-20 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="grid grid-cols-1 lg:grid-cols-3">
            <div class="p-10 lg:border-r border-gray-100 hover:bg-gray-50 transition duration-300">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 class="text-lg font-bold text-gray-900 mb-2">公司规模</h3>
                <div class="flex items-center justify-center">
                  <span class="text-5xl font-extrabold text-indigo-600">120<span class="text-4xl">+</span></span>
                </div>
                <p class="mt-4 text-gray-600">包括AI研究员、工程师、产品设计师和客户支持团队</p>
              </div>
            </div>
            <div class="p-10 lg:border-r border-gray-100 hover:bg-gray-50 transition duration-300">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020.5 5.5v-.565M12 8.5v.5m0 .5v.5m0 .5v.5m0 .5v.5" />
                </svg>
                <h3 class="text-lg font-bold text-gray-900 mb-2">全球用户</h3>
                <div class="flex items-center justify-center">
                  <span class="text-5xl font-extrabold text-indigo-600">100<span class="text-3xl">万+</span></span>
                </div>
                <p class="mt-4 text-gray-600">遍布全球30多个国家和地区，支持多种语言</p>
              </div>
            </div>
            <div class="p-10 hover:bg-gray-50 transition duration-300">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 class="text-lg font-bold text-gray-900 mb-2">技术专利</h3>
                <div class="flex items-center justify-center">
                  <span class="text-5xl font-extrabold text-indigo-600">25<span class="text-4xl">+</span></span>
                </div>
                <p class="mt-4 text-gray-600">在人工智能、自然语言处理和知识图谱领域</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-20 text-center">
          <a href="#contact" class="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            了解更多
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 注意：移除了未使用的userAvatar
</script> 