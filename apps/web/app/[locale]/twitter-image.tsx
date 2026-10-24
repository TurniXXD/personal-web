import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Jakub Vantuch — Digital Solutions Consultant";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage();
}
