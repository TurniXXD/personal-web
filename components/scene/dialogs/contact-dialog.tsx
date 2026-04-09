import { Mail, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ContactDialogProps } from "@/components/scene/dialogs/types";

export const ContactDialog = ({
  dialogRef,
  open,
  interactionProps,
  onClose,
  onSubmit,
  errors,
  status,
}: ContactDialogProps) => {
  const t = useTranslations("ContactDialog");

  return (
    <div
      ref={dialogRef}
      data-testid="dialog-contact"
      data-open={open ? "true" : "false"}
      className="work-dialog work-dialog--form"
      {...interactionProps}
    >
      <div className="work-dialog__header">
        <strong>{t("title")}</strong>
        <button
          type="button"
          className="work-dialog__close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>

      <form className="contact-dialog__form" onSubmit={onSubmit} noValidate>
        <label className="contact-dialog__field" htmlFor="contact-name">
          <span>{t("fields.name.label")}</span>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder={t("fields.name.placeholder")}
            autoComplete="name"
            aria-invalid={errors.name ? "true" : "false"}
            required
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>

        <label className="contact-dialog__field" htmlFor="contact-email">
          <span>{t("fields.email.label")}</span>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder={t("fields.email.placeholder")}
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email ? "true" : "false"}
            required
          />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>

        <label className="contact-dialog__field" htmlFor="contact-phone">
          <span>{t("fields.phone.label")}</span>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder={t("fields.phone.placeholder")}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone ? <small>{errors.phone}</small> : null}
        </label>

        <label className="contact-dialog__field" htmlFor="contact-message">
          <span>{t("fields.message.label")}</span>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder={t("fields.message.placeholder")}
            aria-invalid={errors.message ? "true" : "false"}
            required
          />
          {errors.message ? <small>{errors.message}</small> : null}
        </label>

        <button
          type="submit"
          className="contact-dialog__consult contact-dialog__submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t("submitSubmitting") : t("submitIdle")}
        </button>
      </form>

      <div className="contact-dialog__direct">
        <p className="contact-dialog__direct-title">{t("direct.title")}</p>
        <div className="contact-dialog__direct-items">
          <a
            className="contact-dialog__direct-item"
            href="mailto:contact@vantuch.dev"
          >
            <Mail size={16} strokeWidth={2} />
            <span>{t("direct.emailLabel")}</span>
          </a>
          <a
            className="contact-dialog__direct-item"
            href="tel:+420735023812"
          >
            <Phone size={16} strokeWidth={2} />
            <span>{t("direct.phoneLabel")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
