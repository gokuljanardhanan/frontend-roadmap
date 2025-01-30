"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { RiRocketLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Roadmap", href: "/roadmap" },
  { name: "Quiz", href: "/quiz" },
  { name: "Coding", href: "/coding" },
  { name: "Documentation", href: "/docs" },
];

export default function Header() {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-gray-800 dark:text-white"
            >
              <RiRocketLine className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold">Frontend Roadmap</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActiveRoute(item.href)
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
