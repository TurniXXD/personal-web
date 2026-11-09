import assert from "node:assert/strict";
import test from "node:test";

import * as submission from "./submission.ts";

test("contact locale accepts only supported values and defaults to Czech", () => {
  assert.equal(typeof submission.readContactLocale, "function");
  assert.equal(submission.readContactLocale({ locale: "en" }), "en");
  assert.equal(submission.readContactLocale({ locale: "cs" }), "cs");
  assert.equal(submission.readContactLocale({ locale: "de" }), "cs");
  assert.equal(submission.readContactLocale(null), "cs");
});

test("confirmation email addresses the sender in their language and escapes HTML", async () => {
  const confirmation = await import("./confirmation-email.ts").catch(
    () => null,
  );
  assert.ok(confirmation, "confirmation email builder must exist");

  const cs = confirmation.buildContactConfirmation("cs", "Eva <Nováková>");
  assert.equal(cs.subject, "Potvrzení přijetí zprávy");
  assert.match(cs.text, /Dobrý den, Eva <Nováková>/);
  assert.match(cs.text, /Ozvu se vám co nejdříve/);
  assert.match(cs.html, /Eva &lt;Nováková&gt;/);
  assert.doesNotMatch(cs.html, /Eva <Nováková>/);

  const en = confirmation.buildContactConfirmation("en", "Alex");
  assert.equal(en.subject, "Your message has arrived");
  assert.match(en.text, /Hello Alex/);
  assert.match(en.html, /I&#39;ll get back to you soon/);
});
