import { createSocialImage } from "@/components/social-image";

export const dynamic = "force-static";

export async function GET() {
  return createSocialImage("pixelghost");
}
