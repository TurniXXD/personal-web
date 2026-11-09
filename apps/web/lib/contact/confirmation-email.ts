import type { ContactLocale } from "./submission.ts";
import { contactConfirmationCopy } from "../../messages/contact/email.ts";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export function buildContactConfirmation(
  locale: ContactLocale,
  name: string,
  message: string,
) {
  const copy = contactConfirmationCopy[locale];
  const greeting = `${copy.greeting} ${name},`;
  return {
    subject: copy.subject,
    text: `${greeting}\n\n${copy.received}\n\n${copy.messageLabel}:\n${message}\n\n${copy.reply}\n\nJakub Vantuch\n\n${copy.footer}`,
    html: `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(copy.subject)}</title></head><body style="margin:0;padding:0;background:#f5f7ff;font-family:Sora,Arial,sans-serif;color:#20284b"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(copy.preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7ff"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px"><tr><td style="padding:0 8px 20px;font-size:17px;font-weight:800">Jakub Vantuch<span style="color:#4f5de0">.</span></td></tr><tr><td style="padding:34px 40px;border:1px solid #dce2fa;border-top:6px solid #4f5de0;border-radius:22px;background:#fff"><h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">${escapeHtml(greeting)}</h1><p style="margin:0 0 16px;font-size:15px;line-height:1.65">${escapeHtml(copy.received)}</p><p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#7a84a4">${escapeHtml(copy.messageLabel)}</p><div style="margin:0 0 22px;padding:16px 18px;border-radius:14px;background:#f0f2ff;font-size:15px;line-height:1.65;color:#1e2440">${escapeHtml(message).replaceAll("\n", "<br />")}</div><p style="margin:0 0 24px;font-size:15px;line-height:1.65">${escapeHtml(copy.reply)}</p><p style="margin:0;font-size:15px;font-weight:600">Jakub Vantuch</p></td></tr><tr><td style="padding:22px 8px 0;font-size:12px;line-height:1.6;color:#7a84a4">${escapeHtml(copy.footer)}<br><a href="https://vantuch.dev" style="color:#4f5de0">vantuch.dev</a></td></tr></table></td></tr></table></body></html>`,
  };
}
