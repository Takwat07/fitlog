import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0b0d10] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          <span className="font-display text-base font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}