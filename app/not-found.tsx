import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-32">
      <p className="label text-gold-deep">404</p>
      <h1 className="display mt-4 text-[56px] sm:text-[80px]">This page has stepped out.</h1>
      <Link href="/shop" className="btn-dark mt-10">Back to the shop</Link>
    </div>
  );
}
