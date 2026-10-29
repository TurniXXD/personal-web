import { createHmac, timingSafeEqual } from "node:crypto";

export const referralCookie = "vantuch_referral";
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createReferralToken(personId: string, secret: string): string {
  if (!uuidPattern.test(personId)) throw new Error("Invalid Twenty person ID");
  if (secret.length < 32)
    throw new Error("TWENTY_REFERRAL_SECRET must have at least 32 characters");
  const id = personId.toLowerCase();
  const signature = createHmac("sha256", secret)
    .update(`vantuch-referral:v1:${id}`)
    .digest("base64url");
  return `${id}.${signature}`;
}

export function verifyReferralToken(
  token: string,
  secret: string,
): string | null {
  if (secret.length < 32 || token.length > 128) return null;
  const [id, supplied, extra] = token.split(".");
  if (
    !id ||
    !supplied ||
    extra ||
    !uuidPattern.test(id) ||
    !/^[A-Za-z0-9_-]{43}$/.test(supplied)
  )
    return null;
  const expected = createReferralToken(id, secret).split(".")[1];
  const actualBytes = Buffer.from(supplied, "base64url");
  const expectedBytes = Buffer.from(expected, "base64url");
  return actualBytes.length === expectedBytes.length &&
    timingSafeEqual(actualBytes, expectedBytes)
    ? id.toLowerCase()
    : null;
}
