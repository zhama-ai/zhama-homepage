<template>
  <section class="relative bg-dark-900 pt-20 overflow-hidden">
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span class="block">{{ $t('home.hero.title') }}</span>
            </h1>
            <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              <span class="block neon-text">{{ $t('home.hero.tagline') }}</span>
            </h2>
            <p class="mt-5 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
              {{ $t('home.hero.description') }}
            </p>
            <div class="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded shadow">
                <a href="#" class="glow-button inline-block">
                  {{ $t('home.hero.cta') }}
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a href="#features" class="ghost-button inline-block">
                  {{ $t('home.hero.secondaryCta') }}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div class="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden tech-border">
        <div class="absolute inset-0 bg-gradient-to-tr from-dark-900 via-dark-800/50 to-transparent z-10"></div>
        <img class="h-full w-full object-cover" src="/images/home.png" :alt="$t('home.hero.imgAlt')">
      </div>
    </div>
  </section>
</template>
