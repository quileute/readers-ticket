import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden text-center">
      <h1 className="mb-2 text-4xl font-bold">Page not found</h1>
      <p className="mb-6 text-gray-600">
        Looks like you got lost in the library.
      </p>
      <Link href="/" className="text-primary underline hover:no-underline">
        Go back home
      </Link>
    </div>
  );
}
