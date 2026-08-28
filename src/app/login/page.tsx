/**
 * LOG IN
 * ─────────────────────────────────────────────────────────────
 * Built to the desktop Figma frame: a rule across the left 563px
 * column, then EMAIL / PASSWORD rows with the field pushed right, and
 * the LOGIN button aligned under them.
 *
 * ⚠ NO AUTHENTICATION IS WIRED UP. The form does not sign anyone in,
 * and it must not be made to until there is a real account system.
 *
 * If ticketing runs through an external platform — which is the
 * recommendation — buyers manage their tickets on that platform and
 * this page should probably be deleted rather than finished. Decide
 * that before building auth. See CLAUDE.md → Known gaps.
 */

"use client";

import { useState } from "react";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { Reveal } from "@/components/motion/Reveal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Deliberately does not authenticate. See the note above.
    setNotice("Accounts are not connected yet.");
  };

  const fieldClass =
    "h-[27px] w-full max-w-[213px] bg-[#eee] px-[13px] text-center font-sc text-(length:--text-base) tracking-design text-ink outline-none placeholder:text-muted-soft focus-visible:ring-1 focus-visible:ring-ink";

  return (
    <>
      <NavBar pageName="LOG IN" />

      <Frame as="main" className="pt-[288px]">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-[563px] flex-col gap-[33px]"
          >
            {/* The rule above the fields */}
            <hr className="border-0 border-t border-ink" />

            <div className="flex flex-col items-end gap-[10px]">
              <div className="flex w-full items-center justify-between gap-[20px]">
                <label
                  htmlFor="email"
                  className="shrink-0 font-sc text-(length:--text-base) tracking-design"
                >
                  EMAIL:
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="flex w-full items-center justify-between gap-[20px]">
                <label
                  htmlFor="password"
                  className="shrink-0 font-sc text-(length:--text-base) tracking-design"
                >
                  PASSWORD:
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <button
                type="submit"
                className="h-[27px] w-full max-w-[213px] cursor-pointer bg-ink font-sc text-(length:--text-base) leading-none tracking-design text-paper transition-opacity duration-200 hover:opacity-80"
              >
                LOGIN &gt;
              </button>

              {notice ? (
                <p
                  role="status"
                  className="w-full max-w-[213px] text-right font-sc text-(length:--text-tiny) tracking-design text-muted-soft"
                >
                  {notice}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </Frame>

      <Footer />
    </>
  );
}
