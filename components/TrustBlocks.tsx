const TRUST = [
  {
    title: "Carefully sourced",
    body: "Each work is gathered from public archives and reviewed before it joins the catalogue.",
  },
  {
    title: "Commercial-use checked",
    body: "We review licensing per item — public-domain or explicitly commercial-use sources only.",
  },
  {
    title: "Premium paper",
    body: "Printed on matte archival or textured fine-art paper, chosen to suit each image.",
  },
  {
    title: "Printed on demand",
    body: "Each order is printed individually. No warehouses, no overstock, no waste.",
  },
  {
    title: "Ships in Europe",
    body: "Producing close to where you live — calmer logistics, smaller footprint.",
  },
];

export function TrustBlocks() {
  return (
    <section className="bg-cream border-y border-umber/10">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-10 md:gap-6 md:grid-cols-5">
          {TRUST.map((t) => (
            <div key={t.title}>
              <h3 className="font-serif text-umber text-base mb-2 leading-tight">
                {t.title}
              </h3>
              <p className="text-sm text-stone leading-relaxed font-sans">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
