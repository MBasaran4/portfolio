"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { personalData, hasValue } from "@/data/personal";
import { Menu, X, ExternalLink, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { Locale, Dictionary } from "@/lib/i18n/types";

interface NavbarProps {
  currentLocale: Locale;
  dict: Dictionary["nav"];
}

export function Navbar({ currentLocale, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: dict?.about || "About", href: "#about" },
    { label: dict?.projects || "Projects", href: "#projects" },
    { label: dict?.experience || "Experience", href: "#experience" },
    { label: dict?.skills || "Skills", href: "#skills" },
    { label: dict?.contact || "Contact", href: "#contact" },
  ];

  function switchLocale(targetLocale: Locale) {
    if (targetLocale === currentLocale) return;
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    const targetPath = `/${targetLocale}${currentHash}`;
    router.push(targetPath);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[rgba(9,11,16,0.85)] backdrop-blur-md border-b border-[rgba(6,182,212,0.12)] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand (Left) */}
          <Link
            href={`/${currentLocale}`}
            className="group flex items-center gap-2 font-mono text-sm tracking-widest text-[#f8fafc] hover:text-[#06b6d4] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] group-hover:bg-[#00f5d4] transition-colors inline-block" />
            <span className="font-bold uppercase tracking-wider">
              {personalData.name}
            </span>
          </Link>

          {/* Desktop Central Navigation Links (Center - Single Contact link) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#94a3b8] hover:text-[#06b6d4] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#06b6d4] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Area: Socials + Language Switcher (No duplicate Contact) */}
          <div className="hidden md:flex items-center gap-5 text-xs font-mono">
            {hasValue(personalData.githubUrl) && (
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>GitHub</span>
              </a>
            )}

            {hasValue(personalData.linkedinUrl) && (
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>LinkedIn</span>
              </a>
            )}

            {/* Language Switcher [TR] [EN] */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#131822] border border-[rgba(6,182,212,0.2)] text-[11px] font-mono"
              role="group"
              aria-label="Language selection"
            >
              <Globe className="w-3 h-3 text-[#06b6d4]" aria-hidden="true" />
              <button
                type="button"
                onClick={() => switchLocale("tr")}
                className={cn(
                  "transition-colors px-1 py-0.5 rounded cursor-pointer",
                  currentLocale === "tr"
                    ? "text-[#00f5d4] font-bold bg-[rgba(6,182,212,0.15)]"
                    : "text-[#64748b] hover:text-[#f8fafc]"
                )}
                aria-label="Türkçe diline geç"
                aria-pressed={currentLocale === "tr"}
              >
                TR
              </button>
              <span className="text-[#334155] select-none">/</span>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={cn(
                  "transition-colors px-1 py-0.5 rounded cursor-pointer",
                  currentLocale === "en"
                    ? "text-[#00f5d4] font-bold bg-[rgba(6,182,212,0.15)]"
                    : "text-[#64748b] hover:text-[#f8fafc]"
                )}
                aria-label="Switch to English"
                aria-pressed={currentLocale === "en"}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Right Controls: Language Switcher + Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Compact Mobile Language Switcher */}
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#131822] border border-[rgba(6,182,212,0.2)] text-[10px] font-mono">
              <button
                type="button"
                onClick={() => switchLocale("tr")}
                className={cn(
                  "px-1",
                  currentLocale === "tr"
                    ? "text-[#00f5d4] font-bold"
                    : "text-[#64748b]"
                )}
                aria-label="Türkçe"
              >
                TR
              </button>
              <span className="text-[#334155]">/</span>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={cn(
                  "px-1",
                  currentLocale === "en"
                    ? "text-[#00f5d4] font-bold"
                    : "text-[#64748b]"
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94a3b8] hover:text-[#f8fafc] focus:outline-none"
              aria-label={mobileMenuOpen ? "Menüyü Kapat / Close menu" : "Menüyü Aç / Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#06b6d4]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090b10]/95 backdrop-blur-xl border-b border-[rgba(6,182,212,0.2)] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 font-mono text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#94a3b8] hover:text-[#06b6d4] transition-colors py-2 border-b border-[rgba(255,255,255,0.05)]"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 flex items-center gap-4">
              {hasValue(personalData.githubUrl) && (
                <a
                  href={personalData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#06b6d4]"
                >
                  <GithubIcon className="w-4 h-4 text-[#06b6d4]" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
              {hasValue(personalData.linkedinUrl) && (
                <a
                  href={personalData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#06b6d4]"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#06b6d4]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
