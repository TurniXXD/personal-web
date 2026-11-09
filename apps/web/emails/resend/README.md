# Resend email templates

Paste-ready HTML in the site's visual style (Sora / IBM Plex Mono, brand
`#4f5de0`, white rounded card on the pale gradient). All styles are inline
and the layout is table-based, so the markup survives Gmail, Outlook and
Apple Mail.

## Use in Resend

1. Resend → **Templates** → **Create template** → switch the editor to HTML.
2. Paste the whole file content.
3. Declare the variables listed below (Resend uses `{{{VARIABLE}}}`).
4. Fill in the subject from the table.

Optional fields still render their row, so send `—` instead of an empty
string when a value is missing.

| File                        | Subject                           | Variables                                                                                                 |
| --------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `contact-notification.html` | `New website contact: {{{NAME}}}` | `NAME`, `EMAIL`, `PHONE`, `REQUEST_TYPE`, `REQUESTED_SERVICE`, `SOURCE_PAGE`, `REFERRER_EMAIL`, `MESSAGE` |
| `partnership-inquiry.html`  | `Partnership enquiry: {{{NAME}}}` | `NAME`, `EMAIL`, `COMPANY`, `MESSAGE`                                                                     |
| `referral-link.cs.html`     | `Váš osobní doporučovací odkaz`   | `NAME`, `REFERRAL_URL`                                                                                    |
| `referral-link.en.html`     | `Your personal referral link`     | `NAME`, `REFERRAL_URL`                                                                                    |

The copy mirrors the emails sent today by `app/api/contact/route.ts` and
`app/api/referral-request/route.ts` (and `messages/referrals/email.ts`).
Those routes still send their own inline HTML; switching them to Resend
templates is a separate change.

Keep these files out of Prettier (see the root `.prettierignore`): the
message box uses `white-space: pre-line`, so reflowed markup would add
blank lines to the email.
