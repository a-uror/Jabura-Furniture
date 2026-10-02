import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 font-serif text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 font-serif text-xl text-foreground">We could not find that page</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The link may be old, or the piece may have sold. Browse what is on the floor or WhatsApp us.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[0.72rem] tracking-[0.14em] text-primary-foreground"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-[0.72rem] tracking-[0.14em] text-foreground"
          >
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
