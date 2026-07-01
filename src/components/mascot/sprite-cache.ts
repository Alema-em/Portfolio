const cache = new Map<string, Promise<HTMLImageElement>>();

export function preloadSprite(src: string): Promise<HTMLImageElement> {
  const existing = cache.get(src);
  if (existing) return existing;

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load sprite: ${src}`));
    img.src = src;
  });

  cache.set(src, promise);
  return promise;
}

export function getCachedSprite(src: string): HTMLImageElement | null {
  const pending = cache.get(src);
  if (!pending) return null;
  // Only return if already resolved — callers use preloadSprite for async.
  return null;
}

export function warmSprites(urls: string[]) {
  return Promise.allSettled(urls.map(preloadSprite));
}
