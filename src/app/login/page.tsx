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
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/nav/NavBar";
import { startPreviewSession } from "@/lib/session";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { Reveal } from "@/components/motion/Reveal";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /*
     * ⚠ NOTHING IS CHECKED HERE. This flips a flag in the browser so
     * the signed-in screens can be reviewed, then sends you to them.
     * It is not a login. See src/lib/session.ts.
     */
    startPreviewSession();
    router.push("/my-tickets");
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

              {/*
                Shown on screen, not just in a comment: nobody reviewing
                this should mistake it for a working login.
              */}
              <p className="w-full max-w-[213px] text-right font-sc text-(length:--text-tiny) tracking-design text-muted-soft">
                Preview only — no account is created and nothing is
                checked.
              </p>
            </div>
          </form>
        </Reveal>
      </Frame>

      <Footer />
    </>
  );
}
