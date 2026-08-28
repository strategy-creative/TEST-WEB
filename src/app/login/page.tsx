/**
 * LOG IN
 * ─────────────────────────────────────────────────────────────
 * Built to the desktop Figma frame: a rule across the left 563px
 * column, then EMAIL / PASSWORD rows with the field pushed right, and
 * the LOGIN button aligned under them.
 *
 * ⚠ NO AUTHENTICATION IS WIRED UP, ON PURPOSE.
 * The page is public because the design is worth showing. The form
 * accepts input and then tells the truth: there is no account system
 * yet. It signs nobody in and goes nowhere.
 *
 * The my-tickets, register and view-ticket pages ARE switched off —
 * they showed plausible-looking ticket references to anyone who
 * "logged in". See src/lib/accounts.ts.
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
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /*
     * ⚠ THIS MUST NOT SIGN ANYONE IN, AND THAT IS THE WHOLE POINT.
     *
     * The page is live because the design is worth showing. The form
     * is honest because there is no account system behind it: it says
     * so, and it goes nowhere.
     *
     * It previously flipped a flag in the browser and sent people to a
     * My Tickets page with ticket references on it. A stranger could
     * "sign in" as nobody and be looking at what appeared to be a
     * valid ticket for the door. Do not restore that behaviour to
     * "make the page work" — a login that always succeeds is not a
     * working login.
     *
     * When real accounts exist, this is where the real call goes.
     */
    setError(
      "Accounts are not set up yet — your tickets are managed by our ticketing partner. Check the confirmation email you were sent.",
    );
  };

  const fieldClass =
    "h-[27px] w-full max-w-[213px] bg-[#eee] px-[13px] text-center font-sc text-(length:--text-base) tracking-design text-ink outline-none placeholder:text-muted-soft focus-visible:ring-1 focus-visible:ring-ink";

  return (
    <>
      <NavBar pageName="LOG IN" />

      {/*
        min-h keeps the footer below the fold — this page is short, and
        a footer sitting right under the form makes it feel like a stub
        rather than a page.
      */}
      <Frame as="main" className="min-h-svh pt-[288px]">
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
            </div>

            {/*
              The honest answer, shown only once someone actually tries.
              Sits on the left margin, below the form — out of the field
              column, so it reads as a note about the page rather than a
              validation message about the button.
            */}
            {error ? (
              <p
                role="alert"
                className="mt-[40px] max-w-[420px] font-sc text-(length:--text-tiny) leading-[1.5] tracking-design text-ink"
              >
                {error}
              </p>
            ) : null}
          </form>
        </Reveal>
      </Frame>

      <Footer />
    </>
  );
}
