export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function extractVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
    /^(\d+)$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function extractVimeoHash(url: string): string | null {
  const match = url.match(/[?&]h=([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export function getEmbedUrl(url: string, platform: string): string | null {
  if (platform === 'youtube') {
    const id = extractYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } else if (platform === 'vimeo') {
    const id = extractVimeoId(url);
    if (!id) return null;
    const hash = extractVimeoHash(url);
    return hash
      ? `https://player.vimeo.com/video/${id}?h=${hash}`
      : `https://player.vimeo.com/video/${id}`;
  }
  return null;
}

export function detectVideoPlatform(url: string): 'youtube' | 'vimeo' | null {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return null;
}

export function validateVideoUrl(url: string): { valid: boolean; platform: 'youtube' | 'vimeo' | null } {
  const platform = detectVideoPlatform(url);

  if (!platform) {
    return { valid: false, platform: null };
  }

  if (platform === 'youtube') {
    const id = extractYouTubeId(url);
    return { valid: !!id, platform };
  } else if (platform === 'vimeo') {
    const id = extractVimeoId(url);
    return { valid: !!id, platform };
  }

  return { valid: false, platform: null };
}
