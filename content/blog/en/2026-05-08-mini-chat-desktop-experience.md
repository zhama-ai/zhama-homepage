---
title: "Mini Chat + Downloads + Windows Installer: Tego OS v3.0.0's Desktop Triple Play"
description: "Tego OS v3.0.0 ships three things on the desktop: an always-on-top Mini Chat floating window, a unified Downloads center, and a fully rewritten Windows NSIS installer. This post focuses on the experience details and explains how the combination genuinely puts the digital avatar into daily work."
date: "2026-05-08"
author: "Zhama AI Engineering"
category: "Product Experience"
tags: ["Tego OS", "v3.0.0", "Mini Chat", "Tauri", "Desktop", "Windows Installer", "Digital Avatar"]
image: "/images/features/dashboard.jpg"
featured: false
---

# Mini Chat + Downloads + Windows Installer: Tego OS v3.0.0's Desktop Triple Play

> Put the digital avatar into the daily workflow — not as a new app to launch, but as something you summon, use, and dismiss.

---

## Why the desktop matters

A great backend still meets users through the client they touch every day. v3.0.0 ships three things on the desktop with a single goal:

> **Make the digital avatar feel like Spotlight or Raycast — summon, use, dismiss, without breaking the main task.**

Three things, one section each.

---

## 1. Mini Chat — the always-on-top "pocket avatar"

### Design goal

Most digital-avatar usage isn't "open the app and chat for a while." It's:

- Writing a doc → ask a quick definition;
- Reading code → ask about an API;
- Handling a ticket → summon the IT assistant;
- Writing a listing → have the avatar pull a competitor review.

The key for these flows: **the entry point must be lighter than launching the main app**, or users won't use it.

### Five experience details

#### 1. Independent Tauri window — compact, frameless, always-on-top

Mini Chat isn't a child window of the main app — it's a fully independent Tauri webview. Compact + frameless + always-on-top, so it can sit in the corner of your screen for hours without disrupting your main task.

#### 2. Same connection — no split conversations

Mini Chat shares the **same session connection** as the main window. Type a couple of lines in Mini Chat, then open the main window — the history is continuous, and vice versa.

#### 3. Global shortcut, à la Spotlight / Raycast

Configurable global shortcut to summon / hide. Default behavior models Spotlight / Raycast:

- Summon → grab focus immediately;
- Already visible → hide;
- ESC → hide (don't quit);
- Configuration lets enterprises standardize the shortcut org-wide.

#### 4. Cross-window sync

Both windows always show the same conversation. Type in Mini Chat, then open the main window for the full thread — no refresh, no reconnect.

#### 5. Lazy-create + reuse — webview created on first invocation

Mini Chat's webview is **lazily created** — not at app startup but on first invocation, then kept alive. A meaningful optimization:

- App startup isn't slowed by Mini Chat;
- Subsequent summons respond in milliseconds;
- If a user never uses Mini Chat, the webview is never created.

> This is what makes Mini Chat an entry point that's "actually used every day," instead of a feature "installed and never opened again."

---

## 2. Downloads — a unified download center

### The pain

In v2.x, when an enterprise distributed Tego across endpoints, they hit:

- Desktop / mobile / CLI installers scattered across multiple places;
- Different employees on different versions ("I'm on 0.x, you're on 0.y");
- Download links going stale, IT support overwhelmed.

### The v3.0.0 fix

A single **Downloads center** that aggregates installers across endpoints:

- Desktop — macOS / Windows / Linux;
- Mobile — Android / iOS;
- CLI — single binary;
- Version, update time, signature fingerprint visible at a glance.

Once enterprise IT has the environment, they share one Downloads URL with the whole company; the rest takes care of itself.

### Supporting features

- **Version compatibility** — each installer marks the minimum / recommended server version;
- **Silent download** — links can be configured for batch distribution inside corporate networks;
- **Signature fingerprints** — IT can verify signatures, defending against repackaged binaries.

---

## 3. Windows NSIS installer — full rewrite

Windows is where v3.0.0's desktop experience improved most. The v2.x installer regularly hit:

- AV false positives, install interrupted;
- Wrong install-path permissions, no log writes after launch;
- Old version residue, new install fails;
- Oversized package straining corporate bandwidth.

### What v3.0.0 fixes

1. **NSIS installer fully rewritten** — restructured to remove hidden writes from the legacy script;
2. **Silent install** — supports `/S`, friendly to SCCM / Intune mass deployment;
3. **Auto-uninstall old version** — detects and removes prior versions before installing;
4. **Package slimming** — removes redundant deps and debug symbols, much smaller;
5. **Signature compatibility** — works with mainstream AV signature checks, fewer false positives;
6. **Optional install path** — enterprises can specify a standardized directory.

> Whether Tego "installs and upgrades reliably on Windows" is the hard gate for any enterprise rollout. v3.0.0 lowers that gate by more than one notch.

---

## Three features, one whole

Mini Chat, Downloads and the Windows installer look like three unrelated features. In the context of "put the digital avatar into daily work," they're a single package:

- **Windows installer** → it installs;
- **Downloads center** → on the right version, fully equipped;
- **Mini Chat** → after installation, used daily.

Drop any one and the desktop experience shows obvious gaps.

---

## Integration with the server

Desktop isn't only a client experience — it integrates deeply with the v3.0.0 server:

- Mini Chat and main-window session sync rely on v3.0.0's unified session contract;
- When desktop runs in `per_user`, each Windows account maps to its own runtime (no cross-colleague leak);
- Desktop access to skills / memory / templates flows through v3.0.0's gateway + 3-layer fallback;
- All desktop interactions feed into BusinessMonitor's engagement panel.

The desktop is the "last mile" of v3.0.0's end-to-end experience.

---

## Getting started

1. Pull your platform's installer from the Downloads center;
2. (Windows) confirm enterprise IT has signature trust configured;
3. Install and log in;
4. Configure the global shortcut to summon Mini Chat;
5. Drag Mini Chat to the corner of your screen and start your day.

---

| Channel | How to reach us |
|---|---|
| Enterprise demo | 30-minute walkthrough of the four core scenarios |
| Desktop feedback | support@zhama.com |
| Downloads center | https://zhama.com/en/download |
