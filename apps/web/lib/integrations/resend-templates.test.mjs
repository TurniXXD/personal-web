import assert from "node:assert/strict";
import test from "node:test";
import { resendTemplate } from "./resend-templates.ts";

test("returns undefined when the template ID is not configured", () => {
  assert.equal(
    resendTemplate("contactNotification", { NAME: "Jan" }, {}),
    undefined,
  );
  assert.equal(
    resendTemplate(
      "contactNotification",
      { NAME: "Jan" },
      {
        RESEND_TEMPLATE_CONTACT_NOTIFICATION_ID: "  ",
      },
    ),
    undefined,
  );
});

test("escapes values and fills empty ones with an em dash", () => {
  const template = resendTemplate(
    "referralLinkEn",
    { NAME: '<a href="x">Eve</a> & co', REFERRAL_URL: "", PHONE: "  " },
    { RESEND_TEMPLATE_REFERRAL_LINK_EN_ID: " tmpl_123 " },
  );
  assert.deepEqual(template, {
    id: "tmpl_123",
    variables: {
      NAME: "&lt;a href=&quot;x&quot;&gt;Eve&lt;/a&gt; &amp; co",
      REFERRAL_URL: "—",
      PHONE: "—",
    },
  });
});
