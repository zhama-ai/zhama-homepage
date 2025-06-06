<template>
  <section class="relative gradient-bg pt-20 overflow-hidden">
    <div class="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-20"></div>
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl animate-fadeIn">
              <span class="block">{{ $t('home.hero.title') }}</span>
            </h1>
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl animate-slideInUp">
              <span class="block neon-text">{{ $t('home.hero.tagline') }}</span>
            </h2>
            <p class="mt-6 text-base text-muted sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0 leading-relaxed animate-slideInUp">
              {{ $t('home.hero.description') }}
            </p>
            <div class="mt-10 sm:mt-12 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slideInUp">
              <div>
                <a href="download" class="btn-primary inline-block">
                  {{ $t('home.hero.cta') }}
                </a>
              </div>
              <div>
                <a href="#features" class="btn-secondary inline-block">
                  {{ $t('home.hero.secondaryCta') }}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div class="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden modern-card animate-float">
        <img class="h-full w-full object-cover" src="/images/home.png" :alt="$t('home.hero.imgAlt')">
      </div>
    </div>
  </section>
</template>
