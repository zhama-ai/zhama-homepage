import type { Locale } from '../../data/types';
import chineseSource from '../../../artwork/hero-task-execution_V1.11/zh/compositions/task-session.html?raw';
import englishSource from '../../../artwork/hero-task-execution_V1.11/en/compositions/task-session.html?raw';
import gsapUrl from '../../../artwork/hero-task-execution_V1.5/zh/lib/gsap.min.js?url';
import runtime from './hero-task-scene-runtime.js?raw';

const sources = { zh: chineseSource, en: englishSource };

/** Keep the approved composition intact inside its own document. */
export function renderTaskSceneDocument(locale: Locale): string {
  const composition = sources[locale].match(/^<template>([\s\S]*)<\/template>\s*$/)?.[1];
  if (!composition) throw new Error(`Task composition is missing for ${locale}`);
  const scriptUrl = gsapUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>TeGo</title><script src="${scriptUrl}"></script><style>html,body{width:100%;height:100%;margin:0;overflow:hidden;background:transparent;color-scheme:dark}svg[data-task-canvas]{display:block;width:100%;height:100%}</style></head><body><svg data-task-canvas xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="none"><foreignObject x="0" y="0" width="1600" height="1000"><div xmlns="http://www.w3.org/1999/xhtml" style="position:relative;width:1600px;height:1000px">${composition}</div></foreignObject></svg><script>${runtime}</script></body></html>`;
}
