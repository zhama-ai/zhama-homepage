type PageMount = (signal: AbortSignal) => void;

const mounts = new Set<PageMount>();
let page: AbortController | undefined;

function mountPage() {
  if (page) return;
  page = new AbortController();
  for (const mount of mounts) mount(page.signal);
}

document.addEventListener('astro:before-swap', () => {
  page?.abort();
  page = undefined;
});

document.addEventListener('astro:page-load', mountPage);

export function onPageMount(mount: PageMount) {
  if (mounts.has(mount)) return;
  mounts.add(mount);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountPage, { once: true });
  } else if (page) {
    mount(page.signal);
  } else {
    mountPage();
  }
}
