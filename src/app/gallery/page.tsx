import type { Metadata } from "next";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ActsLine } from "@/components/gallery/ActsLine";
import { ImageGrid } from "@/components/gallery/ImageGrid";

export const metadata: Metadata = {
  title: "Gallery — UNIT/20",
  description: "Photos from the floor at UNIT/20, Christchurch.",
};

export default function GalleryPage() {
  return (
    <>
      <NavBar pageName="GALLERY" />

      <main className="mx-auto w-full max-w-(--container-frame) px-(--spacing-gutter) pt-[226px] sm:px-0">
        <ActsLine />

        <div className="mt-[127px]">
          <ImageGrid />
        </div>
      </main>

      <Footer />
    </>
  );
}
