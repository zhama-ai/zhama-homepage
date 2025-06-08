'use client';

import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { i18n } = useTranslation();

  const isZh = i18n.language === 'zh';

  if (isZh) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        <main className="animate-fadeIn py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">服务协议</h1>
              <p className="text-gray-500 dark:text-gray-400">最后更新日期：2025年3月23日</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. 协议接受</h2>
                <p className="mb-4">欢迎使用扎马AI（以下简称&ldquo;我们&rdquo;）提供的各项服务。当您访问或使用我们的网站、应用程序或其他服务（统称为&ldquo;服务&rdquo;）时，即表示您同意受本服务协议的约束。</p>
                <p>请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的条款。如果您不同意本协议的任何条款，或者无法准确理解条款的含义，请不要继续使用我们的服务。您继续使用我们的服务，即表示您接受这些条款。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. 服务内容</h2>
                <p className="mb-4">扎马AI提供的是基于人工智能技术的笔记管理与知识处理服务，旨在帮助用户高效管理、组织和利用知识内容。具体服务内容包括但不限于：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>智能笔记创建与管理</li>
                  <li>内容自动分类与标签管理</li>
                  <li>知识图谱自动生成</li>
                  <li>内容智能搜索与推荐</li>
                  <li>多设备数据同步</li>
                  <li>其他与知识管理相关的功能</li>
                </ul>
                <p className="mt-4">我们保留随时修改、暂停或终止部分或全部服务的权利，修改或暂停、终止部分服务的，我们将尽量提前通知。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. 用户账户</h2>
                <p className="mb-4">您可能需要创建账户才能使用我们的某些服务。您承诺：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供真实、准确、完整和最新的个人资料信息</li>
                  <li>妥善保管您的账户和密码，不将账户提供给他人使用</li>
                  <li>对您账户下的所有活动负责</li>
                  <li>一旦发现或怀疑有人未经授权使用您的账户，立即通知我们</li>
                </ul>
                <p className="mt-4">我们有权在以下情况下，对您的账户采取限制措施，包括但不限于功能限制、账户冻结直至终止服务：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>您提供的注册信息不真实</li>
                  <li>您违反本协议的任何条款</li>
                  <li>法律法规规定的其他情形</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. 用户行为规范</h2>
                <p className="mb-4">您在使用我们的服务时，必须遵守相关法律法规，不得：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>发布、传播违法、违规、有害信息</li>
                  <li>侵犯他人知识产权、隐私权等合法权益</li>
                  <li>进行任何可能危害网络安全的行为</li>
                  <li>利用技术手段干扰、破坏服务的正常运行</li>
                  <li>从事任何商业性使用，除非事先获得我们的书面同意</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. 知识产权</h2>
                <p className="mb-4">除用户自有内容外，本服务中包含的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、版面设计等，均属于我们或相关权利人所有。</p>
                <p className="mb-4">您上传或创建的内容，您保留其知识产权。但您同意授予我们在提供服务所必需的范围内使用这些内容的权利。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. 免责声明</h2>
                <p className="mb-4">我们将尽力确保服务的稳定性和安全性，但不能保证服务不会中断或完全没有错误。对于因以下原因造成的服务中断或其他缺陷，我们不承担责任：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>系统停机维护</li>
                  <li>电信设备出现故障不能进行数据传输</li>
                  <li>因不可抗力因素造成的服务中断</li>
                  <li>用户操作不当或用户的电脑软件、系统、硬件和通信线路出现故障</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. 协议变更</h2>
                <p className="mb-4">我们可能会不时修改本协议。修改后的协议将在网站上公布，并自公布之日起生效。如果您不同意修改后的协议，可以停止使用我们的服务。您继续使用服务将被视为接受修改后的协议。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. 争议解决</h2>
                <p className="mb-4">本协议的解释、效力及纠纷的解决，适用中华人民共和国法律。若您和我们之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，应提交北京仲裁委员会仲裁解决。</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. 联系我们</h2>
                <p className="mb-4">如果您对本协议有任何疑问，可以通过以下方式联系我们：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>邮箱：contact@zhama.com</li>
                  <li>地址：中国 · 深圳</li>
                </ul>
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400">Last updated: March 23, 2025</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Agreement Acceptance</h2>
              <p className="mb-4">Welcome to the services provided by Zhama AI (hereinafter referred to as &ldquo;we&rdquo;). When you visit or use our website, applications or other services (collectively referred to as &ldquo;services&rdquo;), you agree to be bound by this service agreement.</p>
              <p>Please read and fully understand all terms carefully, especially those that exempt or limit liability. If you do not agree to any terms of this agreement, or cannot accurately understand the meaning of the terms, please do not continue to use our services. Your continued use of our services means that you accept these terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Service Content</h2>
              <p className="mb-4">Zhama AI provides note management and knowledge processing services based on artificial intelligence technology, aimed at helping users efficiently manage, organize and utilize knowledge content. Specific service content includes but is not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Intelligent note creation and management</li>
                <li>Automatic content classification and tag management</li>
                <li>Automatic knowledge graph generation</li>
                <li>Intelligent content search and recommendation</li>
                <li>Multi-device data synchronization</li>
                <li>Other functions related to knowledge management</li>
              </ul>
              <p className="mt-4">We reserve the right to modify, suspend or terminate some or all services at any time. If we modify, suspend or terminate some services, we will try to notify you in advance.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Account</h2>
              <p className="mb-4">You may need to create an account to use some of our services. You promise to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide true, accurate, complete and up-to-date personal information</li>
                <li>Properly keep your account and password, and not provide your account to others</li>
                <li>Be responsible for all activities under your account</li>
                <li>Notify us immediately once you discover or suspect unauthorized use of your account</li>
              </ul>
              <p className="mt-4">We have the right to take restrictive measures on your account in the following situations, including but not limited to function restrictions, account freezing and service termination:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The registration information you provide is not true</li>
                <li>You violate any terms of this agreement</li>
                <li>Other circumstances stipulated by laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. User Conduct Standards</h2>
              <p className="mb-4">When using our services, you must comply with relevant laws and regulations and must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Publish or spread illegal, irregular, or harmful information</li>
                <li>Infringe on others&apos; intellectual property rights, privacy rights and other legitimate rights</li>
                <li>Engage in any behavior that may endanger network security</li>
                <li>Use technical means to interfere with or disrupt the normal operation of services</li>
                <li>Engage in any commercial use unless you have obtained our prior written consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
              <p className="mb-4">Except for user-owned content, all content contained in this service, including but not limited to text, images, audio, video, software, programs, layout design, etc., belongs to us or related rights holders.</p>
              <p className="mb-4">You retain the intellectual property rights to the content you upload or create. However, you agree to grant us the right to use this content to the extent necessary to provide services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Disclaimer</h2>
              <p className="mb-4">We will try our best to ensure the stability and security of the service, but we cannot guarantee that the service will not be interrupted or completely error-free. We are not responsible for service interruptions or other defects caused by the following reasons:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>System downtime for maintenance</li>
                <li>Telecommunication equipment failure preventing data transmission</li>
                <li>Service interruption caused by force majeure factors</li>
                <li>User improper operation or failure of user&apos;s computer software, system, hardware and communication lines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Agreement Changes</h2>
              <p className="mb-4">We may modify this agreement from time to time. The modified agreement will be published on the website and take effect from the date of publication. If you do not agree with the modified agreement, you can stop using our services. Your continued use of the services will be deemed as acceptance of the modified agreement.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Dispute Resolution</h2>
              <p className="mb-4">The interpretation, validity and dispute resolution of this agreement shall be governed by the laws of the People&apos;s Republic of China. If any disputes or controversies arise between you and us, they should first be resolved through friendly consultation; if consultation fails, they should be submitted to Beijing Arbitration Commission for arbitration.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <p className="mb-4">If you have any questions about this agreement, you can contact us in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: contact@zhama.com</li>
                <li>Address: Shenzhen, China</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 