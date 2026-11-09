const templateEnvironmentVariables = {
  contactNotification: "RESEND_TEMPLATE_CONTACT_NOTIFICATION_ID",
  contactConfirmationCs: "RESEND_TEMPLATE_CONTACT_CONFIRMATION_CS_ID",
  contactConfirmationEn: "RESEND_TEMPLATE_CONTACT_CONFIRMATION_EN_ID",
  partnershipInquiry: "RESEND_TEMPLATE_PARTNERSHIP_INQUIRY_ID",
  referralLinkCs: "RESEND_TEMPLATE_REFERRAL_LINK_CS_ID",
  referralLinkEn: "RESEND_TEMPLATE_REFERRAL_LINK_EN_ID",
} as const;

export type ResendTemplateName = keyof typeof templateEnvironmentVariables;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/**
 * Returns the published Resend template for `name`, or `undefined` when its
 * ID is not configured so the caller keeps sending its inline HTML.
 * Resend renders `{{{VARIABLE}}}` unescaped, so values are escaped here and
 * empty values become an em dash to keep every template row readable.
 */
export function resendTemplate(
  name: ResendTemplateName,
  variables: Record<string, string>,
  env: Record<string, string | undefined> = process.env,
) {
  const id = env[templateEnvironmentVariables[name]]?.trim();
  if (!id) return undefined;
  return {
    id,
    variables: Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [
        key,
        escapeHtml(value.trim()) || "—",
      ]),
    ),
  };
}
