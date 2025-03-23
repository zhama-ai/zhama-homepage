<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
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

<script setup>
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import AdvantagesSection from './components/AdvantagesSection.vue';
import DownloadSection from './components/DownloadSection.vue';
import AboutUsSection from './components/AboutUsSection.vue';
import ContactSection from './components/ContactSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<style>
html {
  scroll-padding-top: 80px; /* 为固定导航条留出空间 */
}
</style>
