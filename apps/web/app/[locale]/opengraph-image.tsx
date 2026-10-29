import { createSocialImage, socialImageSize } from "@/lib/site/social-image";

export const alt = "Jakub Vantuch — Digital Solutions Consultant";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
