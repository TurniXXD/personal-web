import { createHmac } from "node:crypto";

const personId = process.argv[2]?.trim().toLowerCase();
const secret = process.env.TWENTY_REFERRAL_SECRET;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

if (!personId || !uuidPattern.test(personId)) {
  process.stderr.write("Pass a Twenty Person UUID as the first argument.\n");
  process.exit(1);
}
if (!secret || secret.length < 32) {
  process.stderr.write(
    "TWENTY_REFERRAL_SECRET must be set to at least 32 characters.\n",
  );
  process.exit(1);
}

const signature = createHmac("sha256", secret)
  .update(`vantuch-referral:v1:${personId}`)
  .digest("base64url");
process.stdout.write(`https://vantuch.dev/?ref=${personId}.${signature}\n`);
