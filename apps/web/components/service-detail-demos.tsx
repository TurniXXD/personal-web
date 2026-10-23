"use client";

import { useEffect, useId, useState } from "react";
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
import type { Locale } from "@/lib/content";

const QrPattern = ({ label }: { label: string }) => (
  <div className="service-demo__qr" role="img" aria-label={label}>
    {Array.from({ length: 49 }, (_, index) => (
      <i
        aria-hidden="true"
        className={
          [
            0, 1, 2, 7, 9, 10, 14, 15, 16, 18, 20, 22, 24, 27, 28, 30, 32, 34,
            36, 38, 40, 42, 43, 44, 46, 47, 48,
          ].includes(index)
            ? "is-filled"
            : undefined
        }
        key={index}
      />
    ))}
  </div>
);

export const LoyaltyCardDemo = ({ locale }: { locale: Locale }) => {
  const [ready, setReady] = useState(false);
  const [visits, setVisits] = useState(7);
  const [confirmed, setConfirmed] = useState(false);
  const rewardReady = visits >= 10;
  const remaining = Math.max(10 - visits, 0);
  const copy =
    locale === "cs"
      ? {
          card: "Věrnostní karta",
          visits: `${visits} z 10 návštěv`,
          remaining: rewardReady
            ? "Odměna je připravena k uplatnění."
            : `Do další masáže se slevou zbývají ${remaining} návštěvy.`,
          reward: "Další masáž se slevou 30 %",
          available: rewardReady ? "Dostupná" : "Zamčená",
          history: "Poslední aktivita",
          activity: "Relaxační masáž · potvrzeno obsluhou",
          confirm: "Potvrdit návštěvu obsluhou",
          success: "Návštěva byla připsána.",
          reset: "Obnovit ukázku",
          qr: "Ilustrativní QR kód zákaznické karty",
          staff: "Rozhraní obsluhy",
          verified: "Zákazník identifikován",
        }
      : {
          card: "Loyalty card",
          visits: `${visits} of 10 visits`,
          remaining: rewardReady
            ? "The reward is ready to redeem."
            : `${remaining} visits remain before the next discounted massage.`,
          reward: "30% off the next massage",
          available: rewardReady ? "Available" : "Locked",
          history: "Latest activity",
          activity: "Relaxing massage · confirmed by staff",
          confirm: "Confirm a staff-verified visit",
          success: "The visit has been added.",
          reset: "Reset demo",
          qr: "Illustrative customer card QR code",
          staff: "Staff interface",
          verified: "Customer identified",
        };

  useEffect(() => setReady(true), []);

  const confirmVisit = () => {
    setVisits((value) => Math.min(value + 1, 10));
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 1800);
  };

  return (
    <div className="loyalty-demo">
      <article className="loyalty-demo__card">
        <div className="loyalty-demo__card-top">
          <div>
            <strong>{copy.card}</strong>
          </div>
          <Sparkles size={22} aria-hidden="true" />
        </div>
        <div className="loyalty-demo__identity">
          <div>
            <span>JV</span>
            <div>
              <strong>Jakub Vantuch</strong>
              <small>JV–10482</small>
            </div>
          </div>
          <QrPattern label={copy.qr} />
        </div>
        <div className="loyalty-demo__progress-copy">
          <strong>{copy.visits}</strong>
          <span>{copy.remaining}</span>
        </div>
        <div
          className="loyalty-demo__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={visits}
        >
          <span style={{ width: `${visits * 10}%` }} />
        </div>
        <div className="loyalty-demo__stamps" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <i className={index < visits ? "is-active" : undefined} key={index}>
              {index < visits ? <Check size={13} /> : index + 1}
            </i>
          ))}
        </div>
        <div
          className={`loyalty-demo__reward${rewardReady ? " is-ready" : ""}`}
        >
          <Gift size={21} aria-hidden="true" />
          <span>
            <small>{copy.available}</small>
            <strong>{copy.reward}</strong>
          </span>
        </div>
      </article>

      <aside className="loyalty-demo__staff">
        <span className="service-demo__label">
          <ScanLine size={16} aria-hidden="true" /> {copy.staff}
        </span>
        <div className="loyalty-demo__verified">
          <ShieldCheck size={27} aria-hidden="true" />
          <div>
            <strong>{copy.verified}</strong>
            <span>Jakub Vantuch · JV–10482</span>
          </div>
        </div>
        <div className="loyalty-demo__history">
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

export const LoyaltyAdminPreview = ({ locale }: { locale: Locale }) => {
  const copy =
    locale === "cs"
      ? {
          label: "ILUSTRATIVNÍ NÁHLED ADMINISTRACE",
          title: "Přehled věrnostního programu",
          period: "Posledních 30 dní",
          navigation: ["Zákazníci", "Odměny", "Historie", "Nastavení rolí"],
          metrics: [
            ["Aktivní zákazníci", "128"],
            ["Potvrzené návštěvy", "342"],
            ["Uplatněné odměny", "41"],
          ],
          customers: "Poslední aktivita zákazníků",
          columns: ["Zákazník", "Stav", "Poslední změna"],
          rows: [
            ["JV–10482", "8 / 10 návštěv", "+1 obsluhou"],
            ["JV–23810", "620 bodů", "Odměna uplatněna"],
            ["JV–50432", "Úroveň Gold", "Nákup ověřen"],
          ],
          audit: "Každá změna má autora, čas a auditní záznam.",
          report: "Aktivita programu",
          reportNote: "Vývoj návštěv a uplatnění odměn",
        }
      : {
          label: "ILLUSTRATIVE ADMIN PREVIEW",
          title: "Loyalty programme overview",
          period: "Last 30 days",
          navigation: ["Customers", "Rewards", "History", "Staff roles"],
          metrics: [
            ["Active customers", "128"],
            ["Confirmed visits", "342"],
            ["Rewards redeemed", "41"],
          ],
          customers: "Latest customer activity",
          columns: ["Customer", "Balance", "Latest change"],
          rows: [
            ["JV–10482", "8 / 10 visits", "+1 by staff"],
            ["JV–23810", "620 points", "Reward redeemed"],
            ["JV–50432", "Gold tier", "Purchase verified"],
          ],
          audit: "Every change records its author, time and audit entry.",
          report: "Programme activity",
          reportNote: "Visits and reward redemptions over time",
        };
  const navIcons = [Users, Award, History, ShieldCheck];

  return (
    <div className="loyalty-admin-preview">
      <aside className="loyalty-admin-preview__sidebar">
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
      <div className="loyalty-admin-preview__main">
        <header>
          <div>
            <span>{copy.label}</span>
            <h3>{copy.title}</h3>
          </div>
          <span>{copy.period}</span>
        </header>
        <div className="loyalty-admin-preview__metrics">
          {copy.metrics.map(([label, value], index) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <i style={{ width: `${58 + index * 13}%` }} />
            </div>
          ))}
        </div>
        <div className="loyalty-admin-preview__content">
          <section aria-labelledby="loyalty-admin-customers">
            <h4 id="loyalty-admin-customers">{copy.customers}</h4>
            <div className="loyalty-admin-preview__table" role="table">
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
            <div className="loyalty-admin-preview__report-heading">
              <div>
                <h4 id="loyalty-admin-report">{copy.report}</h4>
                <p>{copy.reportNote}</p>
              </div>
              <BarChart3 size={20} aria-hidden="true" />
            </div>
            <div className="loyalty-admin-preview__chart" aria-hidden="true">
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

export const VoucherDemo = ({ locale }: { locale: Locale }) => {
  const recipientId = useId();
  const messageId = useId();
  const amountId = useId();
  const [recipient, setRecipient] = useState("Jakub Vantuch");
  const [message, setMessage] = useState(
    locale === "cs"
      ? "Užij si chvíli pro sebe."
      : "Enjoy a moment for yourself.",
  );
  const [amount, setAmount] = useState("1500 Kč");
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const copy =
    locale === "cs"
      ? {
          illustrative: "ILUSTRATIVNÍ UKÁZKA",
          builder: "Nastavení poukazu",
          recipient: "Jméno příjemce",
          message: "Osobní věnování",
          amount: "Hodnota poukazu",
          preview: "Náhled PDF poukazu",
          gift: "Dárkový poukaz",
          for: "pro",
          validity: "Platnost ukázky: 12 měsíců",
          code: "Kód: GIFT–JV–2048",
          qr: "Ilustrativní QR kód dárkového poukazu",
          steps: [
            "Simulovat potvrzenou platbu",
            "Připravit ukázkové PDF",
            "Simulovat uplatnění obsluhou",
          ],
          states: [
            "Čeká na platbu",
            "Platba potvrzena",
            "PDF připraveno",
            "Uplatněno",
          ],
          disclaimer: "Bez skutečné platby, e-mailu nebo platného poukazu.",
          reset: "Obnovit ukázku",
          download: "Ukázkové PDF",
        }
      : {
          illustrative: "ILLUSTRATIVE DEMO",
          builder: "Voucher setup",
          recipient: "Recipient name",
          message: "Personal message",
          amount: "Voucher value",
          preview: "PDF voucher preview",
          gift: "Gift voucher",
          for: "for",
          validity: "Demo validity: 12 months",
          code: "Code: GIFT–JV–2048",
          qr: "Illustrative gift voucher QR code",
          steps: [
            "Simulate confirmed payment",
            "Prepare demo PDF",
            "Simulate staff redemption",
          ],
          states: [
            "Awaiting payment",
            "Payment confirmed",
            "PDF ready",
            "Redeemed",
          ],
          disclaimer: "No real payment, email or valid voucher is created.",
          reset: "Reset demo",
          download: "Demo PDF",
        };

  useEffect(() => setReady(true), []);

  return (
    <div className="voucher-demo">
      <form
        className="voucher-demo__form"
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
        className={`voucher-demo__preview voucher-demo__preview--stage-${stage}`}
      >
        <div className="voucher-demo__status" aria-live="polite">
          <span>{copy.illustrative}</span>
          <strong>{copy.states[stage]}</strong>
        </div>
        <div className="voucher-demo__paper">
          <header>
            <span>JV Wellness</span>
            <Gift size={25} aria-hidden="true" />
          </header>
          <div className="voucher-demo__paper-main">
            <span>{copy.gift}</span>
            <strong>{amount}</strong>
            <small>
              {copy.for} {recipient || "—"}
            </small>
            <p>{message || "\u00a0"}</p>
          </div>
          <footer>
            <QrPattern label={copy.qr} />
            <div>
              <strong>{copy.code}</strong>
              <span>{copy.validity}</span>
            </div>
          </footer>
        </div>
        <div className="voucher-demo__preview-footer">
          <span>{copy.preview}</span>
          <span className={stage >= 2 ? "is-ready" : undefined}>
            <Download size={15} aria-hidden="true" /> {copy.download}
          </span>
        </div>
      </article>
    </div>
  );
};
