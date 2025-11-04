'use client';
import { useState } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Feed', href: '/feed' },
  { name: 'Login', href: '/login' },
  { name: 'UserName', href: '/username' },
  { name: 'Cart', href: '/cart' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      {/* DESKTOP MENU */}
      <nav>
        <div className="hidden md:flex items-center justify-between p-4 bg-white text-black">
          <div className="text-lg font-bold">
            <Link href="/">Holidaze</Link>
          </div>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
          <div className="text-lg font-bold">
            <Link href="/">GameHub</Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-gray-700 text-white p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}