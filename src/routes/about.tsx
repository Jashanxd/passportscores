import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ACCESS_LABELS, DATA_YEAR, GLOBAL_STATS, TOTAL_DESTINATIONS } from "@/data/passports";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Methodology — How Passport Strength Is Measured" },
      {
        name: "description",
        content:
          "How Passport Scores measures mobility: access categories, ranking rules, regional standing and year-over-year movement.",
      },
      { property: "og:title", content: "Methodology — Passport Scores" },
      {
        property: "og:description",
        content: "Access categories, ranking rules and the limits of passport mobility data.",
      },
      { property: "og:url", content: "https://passportscores.com/about" },
      { property: "og:image", content: "https://passportscores.com/og-passport-scores.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Passport Scores — global travel freedom, measured" },
      { name: "twitter:image", content: "https://passportscores.com/og-passport-scores.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://passportscores.com/about" }],
  }),
  component: AboutPage,
});

const CATEGORIES = [
  {
    key: "free",
    body: "No visa required before departure. Entry is granted on arrival with the passport alone, usually for a fixed number of days.",
  },
  {
    key: "voa",
    body: "A visa is issued at the border on payment of a fee. No advance application, but entry is at the officer's discretion.",
  },
  {
    key: "eta",
    body: "An online authorisation must be approved before boarding. Fast, but it is a pre-clearance step, not visa-free travel.",
  },
  {
    key: "required",
    body: "A visa must be obtained from a consulate or embassy in advance, typically with documentation and an interview.",
  },
] as const;

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <p className="eyebrow">Methodology</p>
        <h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl">
          What makes one passport stronger than another.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A passport is a mobility instrument. Its power is the sum of the doors it opens without
          paperwork. We score {GLOBAL_STATS.countries} passports against {TOTAL_DESTINATIONS}{" "}
          destinations and rank them by the number they can reach without applying for a visa in
          advance.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-16">
        <h2 className="text-3xl">Access categories</h2>
        <dl className="mt-6 space-y-6">
          {CATEGORIES.map((c) => (
            <div key={c.key} className="rule-top pt-5">
              <dt className="font-medium">{ACCESS_LABELS[c.key]}</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">{c.body}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={120} className="mt-16 space-y-10">
        <section>
          <h2 className="text-3xl">Ranking rules</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Global rank is taken directly from the published 2026 passport index, which scores every
            passport against all 227 destinations; passports on the same published score share a
            rank. Regional rank re-ranks those same standings inside each region, which is often the
            more useful number: it tells you how a passport compares with its neighbours. Rank
            trajectory uses the real published standings for 2024, 2025 and 2026. The headline
            visa-free, visa-on-arrival, eTA and visa-required counts are the published index figures;
            the individual country lists come from the live visa-rule feed, refreshed monthly, which
            covers the indexed countries only.

          </p>
        </section>

        <section>
          <h2 className="text-3xl">Mobility score</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The mobility score normalises total access to a 0–100 scale against the strongest
            passport in the index. It makes small differences legible: two passports separated by
            fifteen ranking places may differ by only a couple of points.
          </p>
        </section>

        <section>
          <h2 className="text-3xl">Year-over-year movement</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Movement compares the {DATA_YEAR} position with the previous edition. Ranks shift for two
            reasons: a passport gains or loses agreements, or the passports around it move. Both are
            shown — the rank delta and the change in destinations.
          </p>
        </section>

        <section>
          <h2 className="text-3xl">Limits of the data</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Visa policy changes weekly and often applies asymmetrically, by residence, purpose of
            travel or onward ticket. This index is an editorial reference for comparing relative
            strength, not a substitute for official guidance. Confirm requirements with the
            destination's embassy before you book.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
