# Resend email templates

Paste-ready HTML in the site's visual style (Sora / IBM Plex Mono, brand
`#4f5de0`, white rounded card on the pale gradient). All styles are inline
and the layout is table-based, so the markup survives Gmail, Outlook and
Apple Mail.

## Use in Resend

1. Resend → **Templates** → **Create template** → switch the editor to HTML.
2. Paste the whole file content.
3. Declare the variables listed below (Resend uses `{{{VARIABLE}}}`;
   `EMAIL` is reserved by Resend, hence `SENDER_EMAIL`).
4. Fill in the subject from the table.
5. Publish the template and store its ID in the environment variable from
   the table (`.env.example` and the Vercel project).

The routes escape every value and send `—` for empty optional fields
(`lib/integrations/resend-templates.ts`). They also send the subject
themselves, which overrides the template subject. When a template ID is not
set, the route keeps sending its inline HTML email.

| File                           | Environment variable                         | Subject                           | Variables                                                                                                        |
| ------------------------------ | -------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `contact-notification.html`    | `RESEND_TEMPLATE_CONTACT_NOTIFICATION_ID`    | `New website contact: {{{NAME}}}` | `NAME`, `SENDER_EMAIL`, `PHONE`, `REQUEST_TYPE`, `REQUESTED_SERVICE`, `SOURCE_PAGE`, `REFERRER_EMAIL`, `MESSAGE` |
| `contact-confirmation.cs.html` | `RESEND_TEMPLATE_CONTACT_CONFIRMATION_CS_ID` | `Potvrzení přijetí zprávy`        | `NAME`                                                                                                           |
| `contact-confirmation.en.html` | `RESEND_TEMPLATE_CONTACT_CONFIRMATION_EN_ID` | `Your message has arrived`        | `NAME`                                                                                                           |
| `partnership-inquiry.html`     | `RESEND_TEMPLATE_PARTNERSHIP_INQUIRY_ID`     | `Partnership enquiry: {{{NAME}}}` | `NAME`, `SENDER_EMAIL`, `COMPANY`, `MESSAGE`                                                                     |
| `referral-link.cs.html`        | `RESEND_TEMPLATE_REFERRAL_LINK_CS_ID`        | `Váš osobní doporučovací odkaz`   | `NAME`, `REFERRAL_URL`                                                                                           |
| `referral-link.en.html`        | `RESEND_TEMPLATE_REFERRAL_LINK_EN_ID`        | `Your personal referral link`     | `NAME`, `REFERRAL_URL`                                                                                           |

The copy mirrors the inline emails in `app/api/contact/route.ts`,
`app/api/referral-request/route.ts`, `messages/contact/email.ts` and
`messages/referrals/email.ts`.

Keep these files out of Prettier (see the root `.prettierignore`): the
message box uses `white-space: pre-line`, so reflowed markup would add
blank lines to the email.
