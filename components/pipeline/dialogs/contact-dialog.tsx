import { useTranslations } from "next-intl";
import { Github, Linkedin, Send } from "lucide-react";
import type { ContactDialogProps } from "@/components/pipeline/dialogs/types";

export const ContactDialog = ({
  dialogRef,
  open,
  interactionProps,
  onSubmit,
  errors,
  status,
  message,
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

        {message ? (
          <p
            className={`contact-dialog__status${
              status === "success" ? " contact-dialog__status--success" : ""
            }`}
          >
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          className="contact-dialog__submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t("submitSubmitting") : t("submitIdle")}
        </button>
      </form>

      <div className="contact-dialog__socials" aria-label={t("socials.label")}>
        <a
          className="contact-dialog__social-link"
          href="https://github.com/TurniXXD"
          target="_blank"
          rel="noreferrer"
          aria-label={t("socials.github")}
        >
          <Github size={18} strokeWidth={2} />
          <span>{t("socials.github")}</span>
        </a>

        <a
          className="contact-dialog__social-link"
          href="https://www.linkedin.com/in/jakub-vantuch-552514197/"
          target="_blank"
          rel="noreferrer"
          aria-label={t("socials.linkedin")}
        >
          <Linkedin size={18} strokeWidth={2} />
          <span>{t("socials.linkedin")}</span>
        </a>

        <a
          className="contact-dialog__social-link"
          href="https://t.me/turnix"
          target="_blank"
          rel="noreferrer"
          aria-label={t("socials.telegram")}
        >
          <Send size={18} strokeWidth={2} />
          <span>{t("socials.telegram")}</span>
        </a>
      </div>
    </div>
  );
};
