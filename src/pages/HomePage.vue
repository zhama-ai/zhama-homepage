<template>
  <div v-if="currentHash === 'privacy-policy'" class="min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
    <main class="animate-fadeIn py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">隐私政策</h1>
          <p class="text-gray-500 dark:text-gray-400">最后更新日期：2025年3月23日</p>
        </div>
        
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 leading-relaxed">
          <!-- 隐私政策内容 -->
          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 引言</h2>
            <p class="mb-4">欢迎使用扎马AI提供的产品和服务。我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。</p>
            <p>本隐私政策适用于扎马AI提供的所有产品和服务。如我们关联公司、合作公司为您提供产品或服务时，适用其隐私政策。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 信息收集和使用</h2>
            <p class="mb-4">我们可能收集以下类型的信息：</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
              <li><strong>账户信息：</strong>当您注册扎马账户时，我们会收集您的姓名、电子邮件地址、电话号码等基本信息。</li>
              <li><strong>内容数据：</strong>我们会处理您在使用我们服务时创建、上传或接收的内容，如笔记、文档、图片等。</li>
              <li><strong>使用数据：</strong>我们会收集有关您如何使用我们的服务的信息，如访问时间、访问页面、使用的功能等。</li>
              <li><strong>设备信息：</strong>我们可能会收集设备特定信息，如操作系统、浏览器类型、硬件型号、IP地址等。</li>
            </ul>
            <p>我们使用收集的信息：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>提供、维护和改进我们的服务</li>
              <li>开发新的服务和功能</li>
              <li>了解用户如何使用我们的服务</li>
              <li>个性化您的体验</li>
              <li>与您沟通，包括服务通知和营销信息</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 信息共享</h2>
            <p class="mb-4">除非有必要实现本政策中声明的目的，我们不会与任何公司、组织或个人分享您的个人信息，但以下情况除外：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>在获取明确同意的情况下共享：</strong>获得您的明确同意后，我们会与其他方共享您的个人信息。</li>
              <li><strong>与服务提供商共享：</strong>我们可能会委托受信任的第三方提供服务，例如云服务、数据存储、客户服务等，这些公司必须遵守我们的数据隐私和安全要求。</li>
              <li><strong>基于法律的披露：</strong>根据法律法规的要求、强制性的行政或司法要求所必须提供的个人信息。</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 数据安全</h2>
            <p class="mb-4">我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权的访问或披露。例如，在某些服务中，我们将利用加密技术（如SSL）来保护您提供的个人信息。但请注意，即使我们有这些安全措施，也不能保证您的信息100%的安全。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. 您的权利</h2>
            <p class="mb-4">根据适用的法律，您可能有权：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>访问和查阅我们持有关于您的个人信息</li>
              <li>更正不准确的个人信息</li>
              <li>删除您的个人信息</li>
              <li>限制或反对处理您的个人信息</li>
              <li>获取您的个人信息的副本</li>
            </ul>
            <p>要行使这些权利，请通过 support@zhama.com 联系我们。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Cookie和类似技术</h2>
            <p>我们使用Cookie和类似技术来提供、保护和改进我们的产品和服务。例如，我们使用这些技术进行身份验证、存储您的偏好设置、分析使用我们服务的方式等。您可以通过浏览器设置拒绝或管理Cookie，但这可能会影响您使用我们某些服务的能力。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 儿童隐私</h2>
            <p>我们的服务不面向16岁以下的儿童。如果您是父母或监护人，发现您的孩子未经您同意向我们提供了个人信息，请联系我们，我们将采取措施删除这些信息。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 隐私政策的变更</h2>
            <p>我们可能会不时更新本隐私政策。当我们更新隐私政策时，我们会在我们的网站上发布最新版本，并在必要时通过适当方式通知您。</p>
          </section>

          <section>
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. 联系我们</h2>
            <p class="mb-4">如果您对本隐私政策有任何问题或疑虑，或者想要行使您的隐私权利，请通过以下方式联系我们：</p>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>电子邮箱：<a href="mailto:support@zhama.com" class="text-blue-600 hover:underline">support@zhama.com</a></p>
              <!-- <p>地址：北京市海淀区中关村软件园</p> -->
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
  
  <div v-else-if="currentHash === 'terms-of-service'" class="min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
    <main class="animate-fadeIn py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">服务协议</h1>
          <p class="text-gray-500 dark:text-gray-400">最后更新日期：2025年3月23日</p>
        </div>
        
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 leading-relaxed">
          <!-- 服务协议内容 -->
          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 协议接受</h2>
            <p class="mb-4">欢迎使用扎马AI（以下简称"我们"）提供的各项服务。当您访问或使用我们的网站、应用程序或其他服务（统称为"服务"）时，即表示您同意受本服务协议的约束。</p>
            <p>请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的条款。如果您不同意本协议的任何条款，或者无法准确理解条款的含义，请不要继续使用我们的服务。您继续使用我们的服务，即表示您接受这些条款。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 服务内容</h2>
            <p class="mb-4">扎马AI提供的是基于人工智能技术的笔记管理与知识处理服务，旨在帮助用户高效管理、组织和利用知识内容。具体服务内容包括但不限于：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>智能笔记创建与管理</li>
              <li>内容自动分类与标签管理</li>
              <li>知识图谱自动生成</li>
              <li>内容智能搜索与推荐</li>
              <li>多设备数据同步</li>
              <li>其他与知识管理相关的功能</li>
            </ul>
            <p class="mt-4">我们保留随时修改、暂停或终止部分或全部服务的权利，修改或暂停、终止部分服务的，我们将尽量提前通知。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 用户账户</h2>
            <p class="mb-4">您可能需要创建账户才能使用我们的某些服务。您承诺：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>提供真实、准确、完整和最新的个人资料信息</li>
              <li>妥善保管您的账户和密码，不将账户提供给他人使用</li>
              <li>对您账户下的所有活动负责</li>
              <li>一旦发现或怀疑有人未经授权使用您的账户，立即通知我们</li>
            </ul>
            <p class="mt-4">我们有权在以下情况下，对您的账户采取限制措施，包括但不限于功能限制、账户冻结直至终止服务：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>您提供的注册信息不真实</li>
              <li>您违反本协议的任何条款</li>
              <li>法律法规规定的其他情形</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 用户行为规范</h2>
            <p class="mb-4">使用我们的服务时，您同意不会：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>违反任何适用的法律法规或行业惯例</li>
              <li>侵犯他人的知识产权、隐私权或其他合法权益</li>
              <li>传播色情、暴力、恐怖或可能对他人造成伤害的内容</li>
              <li>传播垃圾信息、计算机病毒或破坏系统安全的程序</li>
              <li>干扰或破坏服务或与服务连接的服务器和网络</li>
              <li>使用自动程序、软件、设备或其他程序或方法访问、获取、复制或监控我们服务的任何部分</li>
              <li>出于未经我们授权的商业目的使用我们的服务</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. 知识产权</h2>
            <p class="mb-4">我们的服务包含的所有内容，如文本、图形、图像、标识、按钮图标、软件和其他资料("内容")，均由我们或我们的内容提供者拥有，并受中国和国际著作权、商标和其他知识产权法律法规的保护。</p>
            <p class="mb-4">在遵守本协议的前提下，我们授予您有限的、非排他性的、不可转让的许可，以访问和使用我们的服务，仅用于您的个人非商业目的。</p>
            <p>对于用户上传或创建的内容，您保留自己的知识产权。但您授予我们全球范围内免费、非独占的许可，允许我们存储、使用、复制、修改、创建衍生作品、发布、分发和传输此类内容，以便我们提供服务并推广我们的产品。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. 订阅和付款</h2>
            <p class="mb-4">我们的部分服务可能需要支付费用。当您选择付费服务时，您同意支付相关费用。所有付款条件将在购买前明确标明。订阅将自动续订，除非您在续订日期前取消订阅。</p>
            <p>退款政策将按照适用法律和我们网站上公布的政策执行。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 免责声明</h2>
            <p class="mb-4">我们的服务按"现状"和"可用"的基础提供，不附带任何形式的明示或暗示的保证。我们不保证服务将满足您的要求，或者服务将不间断、及时、安全或无错误。</p>
            <p>使用我们服务下载或获取的任何材料是由您自行决定、自负风险的，且您将自行承担因下载任何此类材料而导致的设备损坏或数据丢失的责任。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 责任限制</h2>
            <p>在法律允许的最大范围内，我们对于因使用或无法使用我们的服务而导致的任何直接、间接、附带、特殊、衍生性或惩罚性损害不承担责任，无论这种损害是基于保证、合同、侵权（包括疏忽）、产品责任或其他法律理论，也无论我们是否被告知有此类损害的可能性。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. 协议修改</h2>
            <p>我们保留随时修改本协议的权利。当我们对本协议进行重大更改时，我们会通过在我们的网站上发布最新版本的协议，并在必要时通过适当方式通知您，如电子邮件或服务内通知。</p>
            <p>修改后的条款自公布之日起生效。如果您在条款修改后继续使用我们的服务，即表示您接受修改后的条款。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. 法律适用与争议解决</h2>
            <p class="mb-4">本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
            <p>如双方就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，任何一方均可向我们所在地有管辖权的人民法院提起诉讼。</p>
          </section>

          <section>
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. 联系我们</h2>
            <p class="mb-4">如果您对本服务协议有任何问题或疑虑，请通过以下方式联系我们：</p>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p>电子邮箱：<a href="mailto:support@zhama.com" class="text-blue-600 hover:underline">support@zhama.com</a></p>
              <!-- <p>地址：北京市海淀区中关村软件园</p> -->
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
  <div v-else-if="currentHash === 'privacy-policy-en'" class="min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
    <main class="animate-fadeIn py-12">
      <PrivacyPolicyEN />
    </main>
  </div>
  <div v-else-if="currentHash === 'terms-of-service-en'" class="min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
    <main class="animate-fadeIn py-12">
      <TermsOfServiceEN />
    </main>
  </div>
  <div v-else-if="currentHash === 'download'" class="min-h-screen bg-white dark:bg-dark-900 overflow-x-hidden">
    <AppDownload />
  </div>
  <div v-else class="min-h-screen bg-white bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
    <Header />
    <main class="animate-fadeIn">
      <HeroSection />
      <FeaturesSection />
      <AdvantagesSection />
      <DownloadSection />
      <AboutUsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import HeroSection from '../components/HeroSection.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import AdvantagesSection from '../components/AdvantagesSection.vue';
import DownloadSection from '../components/DownloadSection.vue';
import AboutUsSection from '../components/AboutUsSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FooterSection from '../components/FooterSection.vue';
import PrivacyPolicyEN from '../pages/PrivacyPolicyEN.vue';
import TermsOfServiceEN from '../pages/TermsOfServiceEN.vue';
import AppDownload from '../pages/AppDownload.vue';
// 获取当前路由实例
const route = useRoute();
const currentHash = ref<string>('');

// 处理hash变化
const handleHashChange = (): void => {
  // 去掉#号
  currentHash.value = window.location.hash.substring(1);
};

// 监听路由变化
watch(
  () => route.fullPath,
  () => {
    handleHashChange();
  }
);

// 组件挂载时初始化
onMounted(() => {
  handleHashChange();
  // 监听hash变化
  window.addEventListener('hashchange', handleHashChange);


  
});
</script> 