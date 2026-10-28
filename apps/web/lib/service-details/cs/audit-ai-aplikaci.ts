import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "Audit AI aplikací a vibecoded MVP | Jakub Vantuch",
    description:
      "Vytvořili jste aplikaci pomocí AI? Nabízím audit bezpečnosti, výkonu a kvality kódu, opravy chyb a dokončení MVP pro reálný provoz.",
  },
  name: "Audit vibecoded aplikací",
  hero: {
    eyebrow: "AUDIT AI APLIKACÍ",
    title: "Vytvořili jste aplikaci pomocí AI?",
    highlight: "Připravím ji na reálný provoz.",
    description:
      "Prověřím bezpečnost, výkon a kvalitu kódu vaší aplikace. Odhalím rizika, navrhnu konkrétní řešení a pomůžu s opravami, nasazením i dalším vývojem.",
    primary: "Nechat zkontrolovat aplikaci",
    secondary: "Co všechno kontroluji",
    secondaryHref: "#co-proverim",
  },
  visual: {
    badge: "PŘIPRAVENOST NA PRODUKCI",
    title: "Kontrola aplikace podle reálných rizik",
    items: ["Bezpečnost", "Výkon", "Kvalita kódu"],
    signal: "Ilustrační přehled oblastí technického auditu",
    topChip: "Priority zjištění",
    bottomChip: "Plán nápravy",
  },
  benefits: {
    eyebrow: "PRO KOHO JE AUDIT",
    title: "Máte prototyp, MVP nebo aplikaci v provozu?",
    description:
      "Prověřím, co už funguje, kde jsou rizika a na čem můžete bezpečně stavět dál.",
    items: [
      {
        title: "Prototyp vytvořený pomocí AI",
        description:
          "Aplikace z Lovable, Boltu, Cursoru nebo jiného AI nástroje funguje, ale chcete znát její technický stav.",
      },
      {
        title: "MVP před spuštěním",
        description:
          "Potřebujete ověřit kritická rizika, než aplikaci začnou používat skuteční zákazníci.",
      },
      {
        title: "Aplikace v provozu",
        description:
          "Řešíte chyby, výkon nebo další rozvoj. Zachovám použitelné části a určím, co je potřeba zlepšit.",
      },
    ],
  },
  workflow: {
    eyebrow: "ROZSAH AUDITU",
    title: "Co ve vaší aplikaci prověřím",
    description:
      "Rozsah přizpůsobím stavu projektu a tomu, zda řešíte spuštění, konkrétní problém nebo dlouhodobou udržitelnost.",
    steps: [
      {
        title: "Bezpečnost aplikace",
        description:
          "Přihlášení, oprávnění, API, databázová pravidla, tajné klíče, závislosti a běžné webové zranitelnosti.",
      },
      {
        title: "Výkon a optimalizace",
        description:
          "Načítání, dotazy, cache, zbytečné požadavky, využití zdrojů a možná úzká místa.",
      },
      {
        title: "Kvalita kódu a architektura",
        description:
          "Struktura, duplicity, typová bezpečnost, závislosti, práce s chybami a technický dluh.",
      },
      {
        title: "Data a soukromí",
        description:
          "Práce s osobními údaji, přístupy, doba uchování, souhlasy a technická opatření pro ochranu soukromí.",
      },
      {
        title: "Nasazení a infrastruktura",
        description:
          "Hosting, proměnné prostředí, CI/CD, zálohy, logování, monitoring a spolehlivost nasazení.",
      },
      {
        title: "Testování a spolehlivost",
        description:
          "Kritické uživatelské cesty, automatické testy, okrajové situace, selhání a rizika regresí.",
      },
    ],
  },
  sections: [
    {
      id: "jak-probiha-audit",
      eyebrow: "POSTUP A VÝSTUP",
      title: "Od první kontroly k jasnému plánu oprav.",
      description:
        "Rozsah si předem dohodneme. Výsledkem je technické posouzení, nikoli penetrační test nebo právní certifikace.",
      tone: "soft",
      items: [
        {
          title: "01 — Domluvíme rozsah",
          description:
            "Ukážete aplikaci, repozitář a cíle. Určíme priority i potřebné přístupy.",
        },
        {
          title: "02 — Prověřím aplikaci",
          description:
            "Projdu dohodnutý rozsah kódu a provozu, ověřím kritické cesty a rizika.",
        },
        {
          title: "03 — Dostanete konkrétní výstup",
          description:
            "Předám srozumitelné shrnutí, priority rizik a doporučené pořadí oprav.",
        },
      ],
    },
  ],
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Co je dobré vědět před auditem.",
    items: [
      {
        question: "Musím mít zdrojový kód aplikace?",
        answer:
          "Přístup k repozitáři umožní důkladnější audit kódu. Bez něj lze po dohodě provést omezené externí posouzení, které ale nemůže pokrýt vnitřní architekturu a konfiguraci.",
      },
      {
        question: "Budete muset aplikaci vytvořit znovu?",
        answer:
          "Ne nutně. Standardně se snažím zachovat funkční části a upravit jen to, co je rizikové, neudržitelné nebo brání dalšímu rozvoji.",
      },
      {
        question: "Kolik audit stojí?",
        answer:
          "Cena závisí na velikosti aplikace, složitosti a dohodnutém rozsahu. Nabídku připravím po úvodním posouzení projektu.",
      },
      {
        question: "Pomůžete i s GDPR?",
        answer:
          "Pomohu s technickou implementací přístupů k datům, souhlasů, uchování a dalších opatření pro soukromí. Formální právní posouzení musí zajistit kvalifikovaný právník.",
      },
    ],
  },
  related: ["webove-aplikace-na-miru", "firemni-weby"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte aplikaci, ale nejste si jistí, jestli je připravená?",
    description:
      "Pošlete mi odkaz na projekt nebo krátký popis toho, co už máte. Společně zjistíme, co funguje, co potřebuje zlepšit a jak pokračovat.",
    action: "Probrat můj projekt",
  },
} satisfies ServiceDetailCopy;
