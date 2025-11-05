'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Feed', href: '/feed' },
  { name: 'Login', href: '/login' },
  { name: 'UserName', href: '/username' },
  { name: '', href: '/search', icon: MagnifyingGlassIcon }, 
  { name: '', href: '/cart', icon: ShoppingCartIcon },      
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      {/* DESKTOP MENU */}
      <nav>
        <div className="desktop-menu hidden md:flex items-center justify-between p-4">
          <div className="text-lg font-bold">
            <Link href="/"><img src="/img/logo.png" alt="Logo" className="h-6 -mt-2" /></Link>
          </div> 
          <div className="flex items-center space-x-4 font-bold">
            {navigation.map((item, index) => (
              <Link
                key={item.href + index} 
                href={item.href}
                className="flex items-center hover:underline"
              >
                {item.icon ? (
                  <item.icon className="w-5 h-5" />
                ) : (
                  <span>{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="mobile-menu-burger md:hidden flex items-center justify-between p-4">
          <div className="text-lg font-bold">
            <Link href="/"><img src="/img/logo.png" alt="Logo" className="h-6 -mt-2" /></Link>
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
          <div className="mobile-menu md:hidden p-4 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="flex items-center space-x-1 hover:underline"
              >
                {item.icon ? <item.icon className="w-5 h-5" /> : <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}