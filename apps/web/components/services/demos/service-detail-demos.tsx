"use client";

import { demoClass } from "./service-demo-classnames";
import { ServiceDemoQrPattern } from "./service-demo-qr-pattern";
import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Award,
  BarChart3,
  Check,
  Download,
  Gift,
  History,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
export const LoyaltyCardDemo = () => {
  const t = useTranslations("serviceDemos.loyalty");
  const [ready, setReady] = useState(false);
  const [visits, setVisits] = useState(7);
  const [confirmed, setConfirmed] = useState(false);
  const rewardReady = visits >= 10;
  const remaining = Math.max(10 - visits, 0);
  const copy = {
    card: t("card"),
    visits: t("visits", { visits }),
    remaining: rewardReady ? t("rewardReady") : t("remaining", { remaining }),
    reward: t("reward"),
    available: t(rewardReady ? "available" : "locked"),
    history: t("history"),
    activity: t("activity"),
    confirm: t("confirm"),
    success: t("success"),
    reset: t("reset"),
    qr: t("qr"),
    staff: t("staff"),
    verified: t("verified"),
  };

  useEffect(() => setReady(true), []);

  const confirmVisit = () => {
    setVisits((value) => Math.min(value + 1, 10));
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 1800);
  };

  return (
    <div className={demoClass("loyalty-demo")}>
      <article className={demoClass("loyalty-demo__card")}>
        <div className={demoClass("loyalty-demo__card-top")}>
          <div>
            <strong>{copy.card}</strong>
          </div>
          <Sparkles size={22} aria-hidden="true" />
        </div>
        <div className={demoClass("loyalty-demo__identity")}>
          <div>
            <span>JV</span>
            <div>
              <strong>Jakub Vantuch</strong>
              <small>JV–10482</small>
            </div>
          </div>
          <ServiceDemoQrPattern label={copy.qr} />
        </div>
        <div className={demoClass("loyalty-demo__progress-copy")}>
          <strong>{copy.visits}</strong>
          <span>{copy.remaining}</span>
        </div>
        <div
          className={demoClass("loyalty-demo__progress")}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={visits}
        >
          <span style={{ width: `${visits * 10}%` }} />
        </div>
        <div className={demoClass("loyalty-demo__stamps")} aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <i className={index < visits ? "is-active" : undefined} key={index}>
              {index < visits ? <Check size={13} /> : index + 1}
            </i>
          ))}
        </div>
        <div
          className={`${demoClass("loyalty-demo__reward")}${rewardReady ? " is-ready" : ""}`}
        >
          <Gift size={21} aria-hidden="true" />
          <span>
            <small>{copy.available}</small>
            <strong>{copy.reward}</strong>
          </span>
        </div>
      </article>

      <aside className={demoClass("loyalty-demo__staff")}>
        <span className="service-demo__label">
          <ScanLine size={16} aria-hidden="true" /> {copy.staff}
        </span>
        <div className={demoClass("loyalty-demo__verified")}>
          <ShieldCheck size={27} aria-hidden="true" />
          <div>
            <strong>{copy.verified}</strong>
            <span>Jakub Vantuch · JV–10482</span>
          </div>
        </div>
        <div className={demoClass("loyalty-demo__history")}>
          <span>{copy.history}</span>
          <strong>{copy.activity}</strong>
        </div>
        {rewardReady ? (
          <button
            className="service-demo__button service-demo__button--secondary"
            type="button"
            disabled={!ready}
            onClick={() => {
              setVisits(7);
              setConfirmed(false);
            }}
          >
            <RotateCcw size={17} aria-hidden="true" /> {copy.reset}
          </button>
        ) : (
          <button
            className="service-demo__button"
            type="button"
            disabled={!ready}
            onClick={confirmVisit}
          >
            <Check size={17} aria-hidden="true" /> {copy.confirm}
          </button>
        )}
        <p className="service-demo__status" aria-live="polite">
          {confirmed ? copy.success : "\u00a0"}
        </p>
      </aside>
    </div>
  );
};

export const LoyaltyAdminPreview = () => {
  const t = useTranslations("serviceDemos.admin");
  const copy = {
    label: t("label"),
    title: t("title"),
    period: t("period"),
    navigation: t.raw("navigation") as string[],
    metrics: t.raw("metrics") as string[][],
    customers: t("customers"),
    columns: t.raw("columns") as string[],
    rows: t.raw("rows") as string[][],
    audit: t("audit"),
    report: t("report"),
    reportNote: t("reportNote"),
  };
  const navIcons = [Users, Award, History, ShieldCheck];

  return (
    <div className={demoClass("loyalty-admin-preview")}>
      <aside className={demoClass("loyalty-admin-preview__sidebar")}>
        <span className="service-demo__label">{copy.label}</span>
        <strong>LOYALTY</strong>
        <nav aria-label={copy.title}>
          {copy.navigation.map((item, index) => {
            const Icon = navIcons[index] ?? Users;
            return (
              <span
                className={index === 0 ? "is-active" : undefined}
                key={item}
              >
                <Icon size={16} aria-hidden="true" /> {item}
              </span>
            );
          })}
        </nav>
      </aside>
      <div className={demoClass("loyalty-admin-preview__main")}>
        <header>
          <div>
            <span>{copy.label}</span>
            <h3>{copy.title}</h3>
          </div>
          <span>{copy.period}</span>
        </header>
        <div className={demoClass("loyalty-admin-preview__metrics")}>
          {copy.metrics.map(([label, value], index) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <i style={{ width: `${58 + index * 13}%` }} />
            </div>
          ))}
        </div>
        <div className={demoClass("loyalty-admin-preview__content")}>
          <section aria-labelledby="loyalty-admin-customers">
            <h4 id="loyalty-admin-customers">{copy.customers}</h4>
            <div
              className={demoClass("loyalty-admin-preview__table")}
              role="table"
            >
              <div role="row">
                {copy.columns.map((column) => (
                  <span role="columnheader" key={column}>
                    {column}
                  </span>
                ))}
              </div>
              {copy.rows.map((row) => (
                <div role="row" key={row[0]}>
                  {row.map((cell) => (
                    <span role="cell" key={cell}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p>
              <ShieldCheck size={16} aria-hidden="true" /> {copy.audit}
            </p>
          </section>
          <section aria-labelledby="loyalty-admin-report">
            <div className={demoClass("loyalty-admin-preview__report-heading")}>
              <div>
                <h4 id="loyalty-admin-report">{copy.report}</h4>
                <p>{copy.reportNote}</p>
              </div>
              <BarChart3 size={20} aria-hidden="true" />
            </div>
            <div
              className={demoClass("loyalty-admin-preview__chart")}
              aria-hidden="true"
            >
              {[42, 55, 48, 69, 61, 82, 76, 91].map((height, index) => (
                <i
                  style={{ height: `${height}%` }}
                  key={`${height}-${index}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const VoucherDemo = () => {
  const t = useTranslations("serviceDemos.voucher");
  const recipientId = useId();
  const messageId = useId();
  const amountId = useId();
  const [recipient, setRecipient] = useState("Jakub Vantuch");
  const [message, setMessage] = useState(t("initialMessage"));
  const [amount, setAmount] = useState("1500 Kč");
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const copy = {
    illustrative: t("illustrative"),
    builder: t("builder"),
    recipient: t("recipient"),
    message: t("message"),
    amount: t("amount"),
    preview: t("preview"),
    gift: t("gift"),
    for: t("for"),
    validity: t("validity"),
    code: t("code"),
    qr: t("qr"),
    steps: t.raw("steps") as string[],
    states: t.raw("states") as string[],
    disclaimer: t("disclaimer"),
    reset: t("reset"),
    download: t("download"),
  };

  useEffect(() => setReady(true), []);

  return (
    <div className={demoClass("voucher-demo")}>
      <form
        className={demoClass("voucher-demo__form")}
        onSubmit={(event) => event.preventDefault()}
      >
        <span className="service-demo__label">
          <Gift size={16} aria-hidden="true" /> {copy.builder}
        </span>
        <label htmlFor={recipientId}>
          <span>{copy.recipient}</span>
          <input
            id={recipientId}
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            maxLength={40}
          />
        </label>
        <label htmlFor={amountId}>
          <span>{copy.amount}</span>
          <select
            id={amountId}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          >
            <option>1 000 Kč</option>
            <option>1500 Kč</option>
            <option>2 000 Kč</option>
          </select>
        </label>
        <label htmlFor={messageId}>
          <span>{copy.message}</span>
          <textarea
            id={messageId}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={90}
          />
        </label>
        {stage < 3 ? (
          <button
            className="service-demo__button"
            type="button"
            disabled={!ready}
            onClick={() => setStage((value) => Math.min(value + 1, 3))}
          >
            {stage === 0 ? (
              <ShieldCheck size={17} aria-hidden="true" />
            ) : stage === 1 ? (
              <Download size={17} aria-hidden="true" />
            ) : (
              <Check size={17} aria-hidden="true" />
            )}
            {copy.steps[stage]}
          </button>
        ) : (
          <button
            className="service-demo__button service-demo__button--secondary"
            type="button"
            disabled={!ready}
            onClick={() => setStage(0)}
          >
            <RotateCcw size={17} aria-hidden="true" /> {copy.reset}
          </button>
        )}
        <small>{copy.disclaimer}</small>
      </form>

      <article
        className={demoClass(
          "voucher-demo__preview",
          `voucher-demo__preview--stage-${stage}`,
        )}
      >
        <div className={demoClass("voucher-demo__status")} aria-live="polite">
          <span>{copy.illustrative}</span>
          <strong>{copy.states[stage]}</strong>
        </div>
        <div className={demoClass("voucher-demo__paper")}>
          <header>
            <span>JV Wellness</span>
            <Gift size={25} aria-hidden="true" />
          </header>
          <div className={demoClass("voucher-demo__paper-main")}>
            <span>{copy.gift}</span>
            <strong>{amount}</strong>
            <small>
              {copy.for} {recipient || "—"}
            </small>
            <p>{message || "\u00a0"}</p>
          </div>
          <footer>
            <ServiceDemoQrPattern label={copy.qr} />
            <div>
              <strong>{copy.code}</strong>
              <span>{copy.validity}</span>
            </div>
          </footer>
        </div>
        <div className={demoClass("voucher-demo__preview-footer")}>
          <span>{copy.preview}</span>
          <span className={stage >= 2 ? "is-ready" : undefined}>
            <Download size={15} aria-hidden="true" /> {copy.download}
          </span>
        </div>
      </article>
    </div>
  );
};
