'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function getUserName() {
  if (typeof window === 'undefined') return 'Login';
  const userDataString = localStorage.getItem('User');
  if (!userDataString) return 'Login';
  try {
    const userData = JSON.parse(userDataString);
    return userData.name || 'Login';
  } catch {
    return 'Login';
  }
}

export const UserMenu = () => {
  const [userName, setUserName] = useState('Login');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setUserName(getUserName()), 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('token');
    setUserName('Login');
    setOpen(false);
    router.push('/'); 
  };

  if (userName === 'Login') {
    return (
      <Link href="/login" className="hover:underline font-bold">
        Login
      </Link>
    );
  }

  return (
    <div className="relative font-bold" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="hover:underline">
        {userName}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md text-sm font-normal z-50">
          <Link
            href="/user"
            className="block px-3 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


const baseNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Admin', href: '/admin' },
  { name: '', href: '/search', icon: MagnifyingGlassIcon },
  { name: '', href: '/cart', icon: ShoppingCartIcon },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav>
        {/* DESKTOP MENU */}
        <div className="desktop-menu hidden md:flex items-center justify-between p-4">
          <div className="text-lg font-bold">
            <Link href="/">
              <img src="/img/logo.png" alt="Logo" className="h-6 -mt-2" />
            </Link>
          </div>

          <div className="flex items-center space-x-4 font-bold">
            {/* Første del: Home, Explore, Admin */}
            {baseNavigation.slice(0, 3).map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="flex items-center hover:underline"
              >
                {item.icon ? <item.icon className="w-5 h-5" /> : <span>{item.name}</span>}
              </Link>
            ))}

            {/* Login / UserMenu */}
            <UserMenu />

            {/* Siste del: Search og Cart */}
            {baseNavigation.slice(3).map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="flex items-center hover:underline"
              >
                {item.icon ? <item.icon className="w-5 h-5" /> : <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="mobile-menu-burger md:hidden flex items-center justify-between p-4">
          <div className="text-lg font-bold">
            <Link href="/">
              <img src="/img/logo.png" alt="Logo" className="h-6 -mt-2" />
            </Link>
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
            {/* Home, Explore, Admin */}
            {baseNavigation.slice(0, 3).map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="flex items-center space-x-1 hover:underline"
              >
                {item.icon ? <item.icon className="w-5 h-5" /> : <span>{item.name}</span>}
              </Link>
            ))}

            {/* Login / UserMenu */}
            <div className="flex flex-col space-y-1">
              <UserMenu />
            </div>

            {/* Search og Cart */}
            {baseNavigation.slice(3).map((item, index) => (
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