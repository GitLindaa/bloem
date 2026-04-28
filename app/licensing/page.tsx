import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sourcing & Licensing",
  description:
    "How Archive & Bloom sources its catalogue: public-domain and commercial-use review, attribution, restoration, and what buyers do and don't acquire.",
};

export default function LicensingPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <p className="eyebrow mb-6">Sourcing &amp; licensing</p>
      <h1 className="font-serif text-5xl text-umber leading-[1.05]">
        Where our prints come from.
      </h1>

      <div className="mt-12 space-y-8 text-stone leading-relaxed font-sans font-light text-base">
        <p className="text-lg">
          Every image in the Archive &amp; Bloom catalogue is reviewed for
          licence and provenance before it is offered as a print. We sell only
          works that fall within one of the categories below, and we err on
          the side of caution when anything is unclear.
        </p>

        <Section title="What we accept">
          <ul className="list-disc list-inside space-y-2">
            <li>Works that are clearly in the public domain (typically by age or by an explicit institutional declaration).</li>
            <li>Works released under <strong>CC0</strong> — which place no restrictions on commercial use.</li>
            <li>Works released under <strong>CC BY</strong> or other licences where commercial use is explicitly allowed (with attribution provided as required).</li>
          </ul>
        </Section>

        <Section title="What we don't accept">
          <ul className="list-disc list-inside space-y-2">
            <li>Anything where the licence is unclear, ambiguous, or undocumented.</li>
            <li>Works under non-commercial-only licences (e.g. CC BY-NC).</li>
            <li>Modern works still under copyright, regardless of how they appear online.</li>
            <li>Anything where the institutional source claims an exclusive licence we cannot verify.</li>
          </ul>
        </Section>

        <Section title="Where we source from">
          <p>
            Our first stop is almost always the <strong>Rijksmuseum</strong>,
            whose open-access programme combines clear public-domain
            declarations, exceptional scan quality, and exemplary metadata.
            Many of our prints are drawn directly from their collection.
          </p>
          <p className="mt-3">
            We also work from the following open-access archives, each
            reviewed item by item:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>The Met Open Access (metmuseum.org)</li>
            <li>Smithsonian Open Access (si.edu/openaccess)</li>
            <li>Biodiversity Heritage Library (biodiversitylibrary.org)</li>
            <li>Wellcome Collection (wellcomecollection.org)</li>
            <li>Library of Congress (loc.gov)</li>
            <li>New York Public Library Digital Collections (digitalcollections.nypl.org)</li>
            <li>Europeana (europeana.eu) — reviewed per item, as licences vary.</li>
            <li>Wikimedia Commons — reviewed per item, only where the licence explicitly permits commercial use.</li>
          </ul>
          <p className="mt-3 text-sm italic">
            We do not source from third-party aggregators that re-host
            public-domain works under their own terms. We always go back to
            the original institution.
          </p>
        </Section>

        <Section title="Restoration">
          <p>
            Where the original scan is faded, dusty or warped from age, we
            restore it gently — adjusting tone, removing artefacts, and
            occasionally repairing damaged areas. We do not modernise the
            image, recolour it, or alter its character.
          </p>
        </Section>

        <Section title="What you buy">
          <p>
            When you order a print, you are buying a <strong>physical
            reproduction</strong> of a public-domain or commercial-use image,
            printed on premium paper. You do not acquire any exclusive rights
            to the underlying image. The image remains in the public domain
            (or under its original licence) and may also be used by others.
          </p>
        </Section>

        <Section title="If we got something wrong">
          <p>
            We take provenance seriously, but archives sometimes mis-label
            works, and licence statuses can shift. If you believe a print in
            our catalogue should not be there, please write to us — we will
            investigate, and remove the work if there is any doubt.
          </p>
        </Section>

        <p className="italic text-sm pt-4 border-t border-umber/10">
          Each selected work is reviewed for public-domain or commercial-use
          eligibility before being offered as a print. We can't guarantee any
          legal outcome — we can only describe the care taken when sourcing.
        </p>
      </div>

      <div className="mt-14 pt-10 border-t border-umber/15">
        <Link href="/shop" className="btn-primary">
          Browse the catalogue
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-umber leading-tight mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
