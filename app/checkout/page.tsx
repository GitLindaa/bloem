import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout integration coming soon.",
};

export default function CheckoutPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
      <p className="eyebrow mb-6">Checkout</p>
      <h1 className="font-serif text-5xl text-umber leading-[1.05]">
        Almost ready.
      </h1>
      <p className="mt-8 text-stone leading-relaxed font-sans font-light text-lg">
        Checkout integration is on its way. Once connected to a print partner
        and payment provider, your order will be produced on demand and shipped
        across Europe.
      </p>
      <p className="mt-4 text-sm text-stone italic font-sans">
        Stripe and Mollie integration coming soon.
      </p>
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Link href="/cart" className="btn-secondary">
          ← Back to cart
        </Link>
        <Link href="/shop" className="btn-primary">
          Continue browsing
        </Link>
      </div>
    </section>
  );
}
