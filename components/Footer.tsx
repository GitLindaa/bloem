import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-umber/10 bg-cream">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="font-serif text-xl text-umber leading-none">
            Archive <span className="italic text-botanical">&amp;</span> Bloom
          </div>
          <p className="mt-4 text-sm text-stone leading-relaxed font-sans">
            Curated botanical and heritage prints, gathered from public-domain
            archives and printed on premium paper. A small, considered catalogue
            for quiet, timeless interiors.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-umber text-sm tracking-widest uppercase mb-4">
            Browse
          </h4>
          <ul className="space-y-2 text-sm text-stone font-sans">
            <li><Link href="/shop" className="hover:text-umber">Shop all</Link></li>
            <li><Link href="/collections/botanical" className="hover:text-umber">Botanical</Link></li>
            <li><Link href="/collections/natural-history" className="hover:text-umber">Natural history</Link></li>
            <li><Link href="/collections/gallery-walls" className="hover:text-umber">Gallery wall sets</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-umber text-sm tracking-widest uppercase mb-4">
            About
          </h4>
          <ul className="space-y-2 text-sm text-stone font-sans">
            <li><Link href="/about" className="hover:text-umber">Our approach</Link></li>
            <li><Link href="/licensing" className="hover:text-umber">Sourcing &amp; licensing</Link></li>
            <li><Link href="/cart" className="hover:text-umber">Cart</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-umber/10">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center justify-between text-xs font-sans text-stone tracking-wide">
          <span>© {new Date().getFullYear()} Archive &amp; Bloom</span>
          <span className="italic">
            Each work is reviewed for public-domain or commercial-use eligibility before being offered as a print.
          </span>
        </div>
      </div>
    </footer>
  );
}
