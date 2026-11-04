import assert from "node:assert/strict";
import test from "node:test";

import { localeFromPathname } from "./locale-from-pathname.ts";

test("selects the site locale from the first pathname segment", () => {
  const cases = [
    { pathname: null, expected: "cs" },
    { pathname: "/", expected: "cs" },
    { pathname: "/kontakt", expected: "cs" },
    { pathname: "/en", expected: "en" },
    { pathname: "/en/contact", expected: "en" },
    { pathname: "/energy", expected: "cs" },
  ];

  for (const { pathname, expected } of cases) {
    assert.equal(localeFromPathname(pathname), expected, pathname ?? "null");
  }
});
