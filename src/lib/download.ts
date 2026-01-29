// TeGo Desktop 下载信息类型定义和获取函数

export interface DownloadInfo {
  version: string;
  releaseDate: string;
  platforms: {
    macos: {
      arm64: string;
      x64: string;
    };
    linux: {
      arm64: string;
      x64: string;
    };
    windows: {
      x64: string;
    };
  };
  downloads: {
    macos_arm64: string;
    macos_x64: string;
    linux_arm64_appimage: string;
    linux_arm64_deb: string;
    linux_x64_appimage: string;
    linux_x64_deb: string;
    windows_x64_msi: string;
    windows_x64_exe: string;
  };
}

const DOWNLOAD_INFO_URL = 'https://zhama-public.oss-cn-heyuan.aliyuncs.com/tego-desktop/latest.json';

/**
 * 获取 TeGo Desktop 最新版本下载信息
 * 服务端使用，支持缓存
 */
export async function getDownloadInfo(): Promise<DownloadInfo | null> {
  try {
    const res = await fetch(DOWNLOAD_INFO_URL, {
      next: { revalidate: 3600 }, // 1小时缓存
    });
    
    if (!res.ok) {
      console.error('Failed to fetch download info:', res.status);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching download info:', error);
    return null;
  }
}

/**
 * 客户端获取下载信息（无缓存）
 */
export async function fetchDownloadInfo(): Promise<DownloadInfo | null> {
  try {
    const res = await fetch(DOWNLOAD_INFO_URL);
    
    if (!res.ok) {
      console.error('Failed to fetch download info:', res.status);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching download info:', error);
    return null;
  }
}

/**
 * 检测用户操作系统和架构
 */
export function detectPlatform(): {
  os: 'macos' | 'windows' | 'linux' | 'unknown';
  arch: 'arm64' | 'x64' | 'unknown';
  recommended: keyof DownloadInfo['downloads'] | null;
} {
  if (typeof window === 'undefined') {
    return { os: 'unknown', arch: 'unknown', recommended: null };
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';
  
  let os: 'macos' | 'windows' | 'linux' | 'unknown' = 'unknown';
  let arch: 'arm64' | 'x64' | 'unknown' = 'unknown';
  
  // 检测操作系统
  if (ua.includes('mac') || platform.includes('mac')) {
    os = 'macos';
  } else if (ua.includes('win') || platform.includes('win')) {
    os = 'windows';
  } else if (ua.includes('linux') || platform.includes('linux')) {
    os = 'linux';
  }
  
  // 检测架构
  // Apple Silicon 检测
  if (os === 'macos') {
    // 现代检测方式
    if ((navigator as any).userAgentData?.platform === 'macOS') {
      // 使用 GPU 渲染器信息辅助判断
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
        const renderer = gl?.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || 0) || '';
        if (renderer.includes('Apple M') || renderer.includes('Apple GPU')) {
          arch = 'arm64';
        } else {
          arch = 'x64';
        }
      } catch {
        // 默认新 Mac 使用 ARM
        arch = 'arm64';
      }
    } else {
      // 回退：假设新设备是 ARM
      arch = 'arm64';
    }
  } else if (os === 'windows') {
    // Windows 目前只提供 x64
    arch = 'x64';
  } else if (os === 'linux') {
    // Linux 架构检测
    if (ua.includes('aarch64') || ua.includes('arm64')) {
      arch = 'arm64';
    } else {
      arch = 'x64';
    }
  }
  
  // 推荐下载
  let recommended: keyof DownloadInfo['downloads'] | null = null;
  if (os === 'macos') {
    recommended = arch === 'arm64' ? 'macos_arm64' : 'macos_x64';
  } else if (os === 'windows') {
    recommended = 'windows_x64_exe';
  } else if (os === 'linux') {
    recommended = arch === 'arm64' ? 'linux_arm64_appimage' : 'linux_x64_appimage';
  }
  
  return { os, arch, recommended };
}

/**
 * 格式化发布日期
 */
export function formatReleaseDate(dateString: string, locale: string = 'zh'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * 获取文件名（保留用于未来使用）
 */
export function getFileName(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1] || url;
}
