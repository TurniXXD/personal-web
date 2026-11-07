import { normalizeContentApiBaseUrl } from "@/lib/integrations/content-api";

/**
 * Returns the image URL only when it is served by the Content API host, which
 * is the single remote pattern configured for next/image. Images from other
 * hosts fall back to the design-system placeholder instead of being proxied.
 */
export const optimizableEventImage = (imageUrl: string | null) => {
  if (!imageUrl) return null;
  try {
    const allowedHost = new URL(
      normalizeContentApiBaseUrl(process.env.CONTENT_API_BASE_URL),
    ).hostname;
    const image = new URL(imageUrl);
    return image.protocol === "https:" && image.hostname === allowedHost
      ? image.toString()
      : null;
  } catch {
    return null;
  }
};
