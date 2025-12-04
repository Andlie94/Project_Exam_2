"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchProfile } from "@/lib/api/profile";
import Image from "next/image";

function getUserName() {
  if (typeof window === "undefined") return "Login";
  const userDataString = localStorage.getItem("User");
  if (!userDataString) return "Login";
  try {
    const userData = JSON.parse(userDataString);
    return userData.name || "Login";
  } catch {
    return "Login";
  }
}

export const UserMenu = () => {
  const [userName, setUserName] = useState("Login");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [venueManager, setVenueManager] = useState(false);

  useEffect(() => {
    const checkVenueManager = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const userDataString = localStorage.getItem("User");
        if (!token || !userDataString) {
          setVenueManager(false);
          return;
        }
        try {
          const userData = JSON.parse(userDataString);
          const name = userData.name;
          const result = await fetchProfile(token, name);
          setVenueManager(!!result.data.venueManager);
        } catch {
          setVenueManager(false);
        }
      }
    };
    checkVenueManager();
  }, [userName]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUserName(getUserName());
      if (typeof window !== "undefined") {
        const userDataString = localStorage.getItem("User");
        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            if (userData.avatar && userData.avatar.url) {
              setAvatarUrl(userData.avatar.url);
            } else {
              setAvatarUrl(null);
            }
          } catch {
            setAvatarUrl(null);
          }
        } else {
          setAvatarUrl(null);
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (mouseEvent: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(mouseEvent.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    setUserName("Login");
    setVenueManager(false);
    setOpen(false);
    router.push("/");
  };

  if (userName === "Login") {
    return (
      <Link href="/login" className="hover:underline">
        Login
      </Link>
    );
  }
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:underline flex items-center gap-2"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border"
          />
        ) : (
          <span>{userName}</span>
        )}
      </button>

      {open && (
        <div className="w-auto bg-[#02B2DE] text-white md:border md:rounded md:bg-white md:absolute md:right-0 md:mr-4 text-sm z-50 flex flex-col">
          {venueManager === true && (
            <Link
              href="/admin"
              className=" px-3 py-2 hover:underline md:text-[#02B2DE]"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          )}
          {venueManager === false && (
            <Link
              href="/user"
              className=" px-3 py-2 hover:underline md:text-[#02B2DE]"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
          )}
          <button
            onClick={handleLogout}
            className=" px-3 py-2 hover:underline text-left md:text-[#02B2DE] cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const baseNavigation = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "UserMenu", component: UserMenu },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav>
        {/* DESKTOP MENU */}
        <div className="desktop-menu hidden md:flex items-center justify-between p-4">
          <div className="text-lg">
            <Link href="/">
              <Image src="/img/logo.png" alt="Logo" width={96} height={24} className="h-6 -mt-2" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {baseNavigation.map((item, index) =>
              item.component ? (
                <item.component key={item.name + index} />
              ) : item.href ? (
                <Link
                  key={item.href + index}
                  href={item.href}
                  className="flex items-center hover:underline"
                >
                  <span>{item.name}</span>
                </Link>
              ) : null
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="mobile-menu-burger md:hidden flex items-center justify-between p-4">
          <div className="text-lg">
            <Link href="/">
              <Image src="/img/logo.png" alt="Logo" width={96} height={24} className="h-6 -mt-2" />
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
            {baseNavigation.slice(0, 4).map((item, index) =>
              item.href ? (
                <Link
                  key={item.href + index}
                  href={item.href}
                  className="flex items-center space-x-1 hover:underline"
                >
                  <span>{item.name}</span>
                </Link>
              ) : null
            )}
            <div className="flex flex-col space-y-1">
              <UserMenu />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
