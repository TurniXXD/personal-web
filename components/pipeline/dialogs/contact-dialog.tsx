import { useTranslations } from "next-intl";
import type { ContactDialogProps } from "@/components/pipeline/dialogs/types";

export function ContactDialog({
  dialogRef,
  open,
  interactionProps,
  onSubmit,
  errors,
  status,
  message,
}: ContactDialogProps) {
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
      <form className="contact-dialog__form" onSubmit={onSubmit}>
        <label className="contact-dialog__field">
          <span>{t("fields.name.label")}</span>
          <input type="text" name="name" placeholder={t("fields.name.placeholder")} />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>
        <label className="contact-dialog__field">
          <span>{t("fields.email.label")}</span>
          <input type="email" name="email" placeholder={t("fields.email.placeholder")} />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>
        <label className="contact-dialog__field">
          <span>{t("fields.phone.label")}</span>
          <input type="text" name="phone" placeholder={t("fields.phone.placeholder")} />
          {errors.phone ? <small>{errors.phone}</small> : null}
        </label>
        <label className="contact-dialog__field">
          <span>{t("fields.message.label")}</span>
          <textarea
            name="message"
            rows={5}
            placeholder={t("fields.message.placeholder")}
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
    </div>
  );
}
