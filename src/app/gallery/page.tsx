import type { Metadata } from "next";
import { NavBar } from "@/components/nav/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Frame } from "@/components/layout/Frame";
import { Gallery } from "@/components/gallery/Gallery";
import { acts, galleryImages, defaultAct } from "../../../content/gallery";

export const metadata: Metadata = {
  title: "Gallery — UNIT/20",
  description: "Photos from the floor at UNIT/20, Christchurch.",
};

export default function GalleryPage() {
  return (
    <>
      <NavBar pageName="GALLERY" />

      <Frame as="main" className="pt-[226px]">
        <Gallery
          acts={acts}
          images={galleryImages}
          initialAct={defaultAct()}
        />
      </Frame>

      <Footer />
    </>
  );
}
