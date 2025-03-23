<template>
  <section id="contact" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-700 font-semibold tracking-wide uppercase">联系我们</h2>
        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
          我们期待您的反馈
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-600 lg:mx-auto">
          无论您有任何问题、建议或合作意向，都欢迎与我们联系
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 联系信息 -->
        <div class="bg-gray-50 p-10 rounded-xl shadow">
          <h3 class="text-2xl font-semibold text-gray-900 mb-8">联系方式</h3>
          
          <div class="space-y-8">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-700">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-6 text-gray-700">
                <p class="text-lg font-semibold">电子邮件</p>
                <p class="mt-1 text-indigo-700">contact@zhamatech.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-700">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div class="ml-6 text-gray-700">
                <p class="text-lg font-semibold">电话</p>
                <p class="mt-1 text-indigo-700">400-123-4567</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-700">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-6 text-gray-700">
                <p class="text-lg font-semibold">地址</p>
                <p class="mt-1">北京市海淀区中关村科技园区xx号楼xx层</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-700">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-6 text-gray-700">
                <p class="text-lg font-semibold">工作时间</p>
                <p class="mt-1">周一至周五 9:00 - 18:00</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">关注我们</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-600 hover:text-indigo-700 transition duration-150 ease-in-out">
                <span class="sr-only">微信</span>
                <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.69 13.09c-.4 0-.73-.33-.73-.73s.33-.73.73-.73.73.33.73.73-.33.73-.73.73m4.15 0c-.4 0-.73-.33-.73-.73s.33-.73.73-.73.73.33.73.73-.33.73-.73.73m4.99 3.38c-.33 0-.59.27-.59.59 0 .27.18.5.45.57l.23.05c.45.09.77.5.77.95 0 .55-.45 1-.99 1-.45 0-.86-.32-.96-.77l-.05-.23c-.09-.45-.5-.77-.95-.77-.33 0-.59-.27-.59-.59 0-.33.27-.59.59-.59.55 0 1 .45 1 .99 0 .45-.32.86-.77.96l-.23.05c-.45.09-.77.5-.77.95 0 .33.27.59.59.59.55 0 1-.45 1-1 0-.45.32-.86.77-.95l.23-.05c.45-.09.77-.5.77-.96 0-.55-.45-1-.99-1zm2.34-6.5c1.56 0 2.83 1.27 2.83 2.83s-1.27 2.83-2.83 2.83-2.83-1.27-2.83-2.83 1.27-2.83 2.83-2.83m0 6.83c2.22 0 4-1.78 4-4s-1.78-4-4-4-4 1.78-4 4 1.78 4 4 4zm-11.09 0c.4 0 .73.33.73.73s-.33.73-.73.73-.73-.33-.73-.73.33-.73.73-.73m.73-2.83c0-.4.33-.73.73-.73s.73.33.73.73-.33.73-.73.73-.73-.33-.73-.73m8-1.85c1.24 0 2.25 1.01 2.25 2.26s-1.01 2.25-2.25 2.25-2.25-1-2.25-2.25 1.01-2.26 2.25-2.26m-3.45 6.5c.55 0 1 .45 1 .99 0 .45-.32.86-.77.96l-.23.05c-.45.09-.77.5-.77.95 0 .33.27.59.59.59.55 0 1-.45 1-1 0-.45.32-.86.77-.95l.23-.05c.45-.09.77-.5.77-.96 0-.55-.45-.99-1-.99-.33 0-.59-.27-.59-.59.01-.33.28-.59.6-.59M7.59 5.5c.4 0 .73.33.73.73s-.33.73-.73.73-.73-.33-.73-.73.33-.73.73-.73m0 2.83c.4 0 .73.33.73.73s-.33.73-.73.73-.73-.33-.73-.73.33-.73.73-.73m-.73 2.83c0-.4.33-.73.73-.73s.73.33.73.73-.33.73-.73.73-.73-.33-.73-.73m.73 2.83c.4 0 .73.33.73.73s-.33.73-.73.73-.73-.33-.73-.73.33-.73.73-.73m7.64-.73c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M12 5.5c4.27 0 7.73 2.46 7.73 5.5s-3.46 5.5-7.73 5.5S4.27 14.04 4.27 11 7.73 5.5 12 5.5m0-2c-5.52 0-10 3.36-10 7.5s4.48 7.5 10 7.5 10-3.36 10-7.5S17.52 3.5 12 3.5z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-600 hover:text-indigo-700 transition duration-150 ease-in-out">
                <span class="sr-only">微博</span>
                <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.9 6.7a4.8 4.8 0 0 0-4.8 4.8c0 .6.1 1.1.3 1.6.1.3.5.4.7.3.3-.1.4-.5.3-.7-.1-.4-.2-.8-.2-1.2a3.5 3.5 0 0 1 3.5-3.6h.4c.3-.1.5-.4.4-.7s-.4-.5-.7-.4h-.1l.2-.1zM6.9 17c1.3 1.3 3.5 1.9 5.5 1.9 3.5 0 5.9-1.7 7-3.2 1.1-1.5 1.3-3.2.6-4.2-.4-.6-1.1-1-2.1-1.1-2.1-.3-4.5 1.1-4.5 1.1s-.3-.5-.9-1.1c-1.1-1-2.5-.9-3-.9-1.7.2-3.4 1.6-3.4 3.4 0 1.8 1.4 3 1.4 3s-.1.2-.3.7c-.2.7-.1 1.5.8 2.4zm7.4-5.8s1.7-1 3.1-.8c.7.1 1 .3 1.1.5.2.3.2 1.1-.5 2.1-.8 1.1-2.6 2.5-5.4 2.5-1.6 0-3.3-.5-4.3-1.3-.3-.3-.5-.6-.6-.9-.1-.3 0-.6.1-.8.1-.2.2-.3.2-.3s-1.3-1-1.3-2.2c0-1.3 1.3-2.1 2.3-2.2.5 0 1.5 0 2.3.6.6.5.9 1 .9 1l1.1.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- 联系表单 -->
        <div class="bg-white p-10 rounded-xl shadow border border-gray-100">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">发送消息</h3>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">您的姓名</label>
              <input type="text" id="name" v-model="form.name" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">电子邮件</label>
              <input type="email" id="email" v-model="form.email" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700">主题</label>
              <input type="text" id="subject" v-model="form.subject" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">消息内容</label>
              <textarea id="message" v-model="form.message" rows="5" class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            
            <div>
              <button type="submit" class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                发送消息
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = () => {
  // 处理表单提交逻辑
  console.log('表单提交', form);
  // 重置表单
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  // 显示成功消息
  alert('感谢您的留言，我们会尽快回复！');
};
</script> 