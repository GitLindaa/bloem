import type { Metadata } from "next";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Our Approach",
  description:
    "Archive & Bloom is a small, considered catalogue of botanical and heritage prints, gathered from public-domain archives and printed on premium paper.",
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <p className="eyebrow mb-6">About Archive &amp; Bloom</p>
      <h1 className="font-serif text-5xl lg:text-6xl text-umber leading-[1.05]">
        A small, considered catalogue.
      </h1>

      <div className="aspect-[4/3] mt-14 mb-14 shadow-[0_30px_80px_-40px_rgba(58,46,34,0.4)]">
        <PlaceholderArt
          config={{ motif: "fern", background: "olive-tint" }}
          className="w-full h-full"
          poster={false}
        />
      </div>

      <div className="prose-lg space-y-7 text-stone leading-relaxed font-sans font-light text-lg">
        <p>
          Archive &amp; Bloom is a small print studio working out of the
          Netherlands. We gather historical illustrations — botanical plates,
          natural-history studies, old city plans, anatomical drawings, and
          celestial charts — from public-domain collections and museum open-access
          archives, and turn the ones we love most into prints.
        </p>

        <p>
          We aren't trying to compete with poster shops. Our catalogue is
          small on purpose. Each print is selected on four things: composition,
          atmosphere, historical character, and how quietly it lives on a
          wall over time. Most of what we discover never makes it into the
          shop; that part of the work is invisible, and we like it that way.
        </p>

        <h2 className="font-serif text-3xl text-umber leading-tight pt-6">
          How we work
        </h2>

        <p>
          We work through the major open-access archives — the{" "}
          <em>Rijksmuseum</em>, the <em>Met Open Access</em>, the{" "}
          <em>Smithsonian</em>, the <em>Biodiversity Heritage Library</em>, the{" "}
          <em>Wellcome Collection</em>, the <em>Library of Congress</em>, and the{" "}
          <em>New York Public Library Digital Collections</em>, among others.
          Every image is reviewed for licence and provenance before it is
          considered for the catalogue.
        </p>

        <p>
          Where the original scan is faded, dusty or warped from age, we
          restore it gently. The aim is never to modernise the image — just to
          remove the noise of time so the work itself can be seen clearly.
        </p>

        <p>
          Each print is produced on demand on premium archival paper, in
          standard sizes that fit ready-made frames. We work with European
          print partners so orders ship close to where you live.
        </p>

        <h2 className="font-serif text-3xl text-umber leading-tight pt-6">
          What we believe
        </h2>

        <p>
          Public-domain art is one of the quietest gifts a culture can leave
          itself. Many of the most beautiful images of the last three centuries
          live in archives where no-one ever sees them. Our small ambition is
          to bring a few of them out into the light, and onto walls where
          they belong.
        </p>

        <p>
          We won't pretend everything we sell is rare or singular. It isn't.
          What we can promise is that nothing was chosen carelessly, nothing
          was printed cheaply, and nothing in the shop is here without a
          reason we could tell you out loud.
        </p>
      </div>

      <div className="mt-14 pt-10 border-t border-umber/15 flex flex-wrap gap-4">
        <Link href="/shop" className="btn-primary">
          Explore the catalogue
        </Link>
        <Link href="/licensing" className="btn-secondary">
          Read our sourcing approach
        </Link>
      </div>
    </article>
  );
}
