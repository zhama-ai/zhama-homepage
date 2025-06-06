'use client';

import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();

  const isZh = i18n.language === 'zh';

  if (isZh) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        <main className="animate-fadeIn py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">隐私政策</h1>
              <p className="text-gray-500 dark:text-gray-400">最后更新日期：2025年3月23日</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 引言</h2>
                <p className="mb-4">欢迎使用扎马AI提供的产品和服务。我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。</p>
                <p>本隐私政策适用于扎马AI提供的所有产品和服务。如我们关联公司、合作公司为您提供产品或服务时，适用其隐私政策。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 信息收集和使用</h2>
                <p className="mb-4">我们可能收集以下类型的信息：</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>账户信息：</strong>当您注册扎马账户时，我们会收集您的姓名、电子邮件地址、电话号码等基本信息。</li>
                  <li><strong>内容数据：</strong>我们会处理您在使用我们服务时创建、上传或接收的内容，如笔记、文档、图片等。</li>
                  <li><strong>使用数据：</strong>我们会收集有关您如何使用我们的服务的信息，如访问时间、访问页面、使用的功能等。</li>
                  <li><strong>设备信息：</strong>我们可能会收集设备特定信息，如操作系统、浏览器类型、硬件型号、IP地址等。</li>
                </ul>
                <p>我们使用收集的信息：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供、维护和改进我们的服务</li>
                  <li>开发新的服务和功能</li>
                  <li>了解用户如何使用我们的服务</li>
                  <li>个性化您的体验</li>
                  <li>与您沟通，包括服务通知和营销信息</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 信息共享</h2>
                <p className="mb-4">除非有必要实现本政策中声明的目的，我们不会与任何公司、组织或个人分享您的个人信息，但以下情况除外：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>在获取明确同意的情况下共享：</strong>获得您的明确同意后，我们会与其他方共享您的个人信息。</li>
                  <li><strong>与服务提供商共享：</strong>我们可能会委托受信任的第三方提供服务，例如云服务、数据存储、客户服务等，这些公司必须遵守我们的数据隐私和安全要求。</li>
                  <li><strong>基于法律的披露：</strong>根据法律法规的要求、强制性的行政或司法要求所必须提供的个人信息。</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 数据安全</h2>
                <p className="mb-4">我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权的访问或披露。例如，在某些服务中，我们将利用加密技术（如SSL）来保护您提供的个人信息。但请注意，即使我们有这些安全措施，也不能保证您的信息100%的安全。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. 数据保留</h2>
                <p className="mb-4">我们仅在需要实现本政策所述目的所需的期间和法律法规要求的时限内保留您的个人信息。</p>
                <p>如果我们终止服务或运营，我们会至少提前三十天通知您，并在合理的期限内删除或匿名化您的个人信息。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. 用户权利</h2>
                <p className="mb-4">根据相关法律法规，您享有以下权利：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>访问权：您有权了解我们收集、使用您个人信息的情况</li>
                  <li>更正权：当您发现我们处理的关于您的个人信息有错误时，您有权要求我们作出更正</li>
                  <li>删除权：在符合法律法规的情况下，您有权请求我们删除您的个人信息</li>
                  <li>撤回同意权：您有权撤回您此前作出的个人信息处理的同意</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 儿童隐私保护</h2>
                <p>我们的服务主要面向成人。如果您是18周岁以下的未成年人，建议您请您的父母或监护人仔细阅读本隐私政策，并在征得您的父母或监护人同意后使用我们的服务或向我们提供信息。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 变更</h2>
                <p className="mb-4">我们可能适时修改本政策的条款，修改后的政策一旦公布即有效代替原来的政策。如果您不同意修改的内容，您可以主动取消获得的服务；如果您继续使用我们的服务，即视为您接受我们对本政策相关条款所做的修改。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. 联系我们</h2>
                <p className="mb-4">如您对本隐私政策或数据处理有任何疑问或权利请求，您可以通过以下方式与我们联系：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>邮箱：privacy@zhama.ai</li>
                  <li>地址：中国 · 北京</li>
                </ul>
                <p className="mt-4">我们将在收到您的请求后尽快回复您。</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // English version
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <main className="animate-fadeIn py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400">Last updated: March 23, 2025</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="mb-4">Welcome to the products and services provided by Zhama AI. We deeply understand the importance of personal information to you and will do our best to protect the security and reliability of your personal information. We are committed to maintaining your trust in us and adhere to the following principles to protect your personal information: principle of consistency of rights and responsibilities, principle of clear purpose, principle of choice and consent, principle of minimum necessity, principle of ensuring security, principle of subject participation, principle of openness and transparency, etc.</p>
              <p>This privacy policy applies to all products and services provided by Zhama AI. If our affiliated companies or partner companies provide products or services to you, their privacy policies apply.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information Collection and Use</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> When you register for a Zhama account, we will collect your basic information such as name, email address, and phone number.</li>
                <li><strong>Content Data:</strong> We will process content you create, upload, or receive when using our services, such as notes, documents, images, etc.</li>
                <li><strong>Usage Data:</strong> We will collect information about how you use our services, such as access time, visited pages, features used, etc.</li>
                <li><strong>Device Information:</strong> We may collect device-specific information, such as operating system, browser type, hardware model, IP address, etc.</li>
              </ul>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain and improve our services</li>
                <li>Develop new services and features</li>
                <li>Understand how users use our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you, including service notifications and marketing information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Information Sharing</h2>
              <p className="mb-4">We will not share your personal information with any companies, organizations or individuals unless necessary to achieve the purposes stated in this policy, except in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sharing with explicit consent:</strong> After obtaining your explicit consent, we will share your personal information with other parties.</li>
                <li><strong>Sharing with service providers:</strong> We may entrust trusted third parties to provide services, such as cloud services, data storage, customer service, etc. These companies must comply with our data privacy and security requirements.</li>
                <li><strong>Legal-based disclosure:</strong> Personal information that must be provided in accordance with legal requirements, mandatory administrative or judicial requirements.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <p className="mb-4">We use various security technologies and procedures to prevent information loss, misuse, unauthorized access or disclosure. For example, in some services, we will use encryption technology (such as SSL) to protect the personal information you provide. However, please note that even with these security measures, we cannot guarantee 100% security of your information.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Data Retention</h2>
              <p className="mb-4">We only retain your personal information for the period necessary to achieve the purposes described in this policy and within the time limits required by laws and regulations.</p>
              <p>If we terminate our services or operations, we will notify you at least thirty days in advance and delete or anonymize your personal information within a reasonable period.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. User Rights</h2>
              <p className="mb-4">According to relevant laws and regulations, you enjoy the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right of access: You have the right to know how we collect and use your personal information</li>
                <li>Right of rectification: When you find that the personal information about you processed by us is incorrect, you have the right to request us to make corrections</li>
                <li>Right of deletion: In compliance with laws and regulations, you have the right to request us to delete your personal information</li>
                <li>Right to withdraw consent: You have the right to withdraw your previous consent to personal information processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Children's Privacy Protection</h2>
              <p>Our services are primarily aimed at adults. If you are a minor under 18 years old, we recommend that you ask your parents or guardians to carefully read this privacy policy and use our services or provide information to us with the consent of your parents or guardians.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Changes</h2>
              <p className="mb-4">We may modify the terms of this policy from time to time. The modified policy will effectively replace the original policy once published. If you do not agree with the modified content, you can actively cancel the services obtained; if you continue to use our services, it is deemed that you accept our modifications to the relevant terms of this policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <p className="mb-4">If you have any questions about this privacy policy or data processing, or any rights requests, you can contact us in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: privacy@zhama.ai</li>
                <li>Address: Beijing, China</li>
              </ul>
              <p className="mt-4">We will reply to you as soon as possible after receiving your request.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 