"use client";

// ─── GenericSection Router ───────────────────────────────────────────────────
// Routes variant_id to dedicated section components.
// Each category has its own file with variant-specific layouts.

import { variantNum } from "./shared";
import NavbarSection from "./NavbarSection";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection";
import ServicesSection from "./ServicesSection";
import AdvantagesSection from "./AdvantagesSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import GallerySection from "./GallerySection";
import ShowcaseSection from "./ShowcaseSection";
import CtaSection from "./CtaSection";
import ContactSection from "./ContactSection";
import PricingSection from "./PricingSection";
import FaqSection from "./FaqSection";
import BlogSection from "./BlogSection";
import FooterSection from "./FooterSection";

interface GenericProps {
  variant: string;
  content: Record<string, unknown>;
}

export default function GenericSection({ variant, content }: GenericProps) {
  const category = variant.replace(/_\d+$/, "");
  const vn = variantNum(variant);

  switch (category) {
    case "navbar":       return <NavbarSection content={content} vn={vn} />;
    case "hero":         return <HeroSection content={content} vn={vn} />;
    case "about":        return <AboutSection content={content} vn={vn} />;
    case "products":     return <ProductsSection content={content} vn={vn} />;
    case "services":     return <ServicesSection content={content} vn={vn} />;
    case "advantages":   return <AdvantagesSection content={content} vn={vn} />;
    case "showcase":     return <ShowcaseSection content={content} vn={vn} />;
    case "stats":        return <StatsSection content={content} vn={vn} />;
    case "testimonials": return <TestimonialsSection content={content} vn={vn} />;
    case "gallery":      return <GallerySection content={content} vn={vn} />;
    case "cta":          return <CtaSection content={content} vn={vn} />;
    case "contact":      return <ContactSection content={content} vn={vn} />;
    case "pricing":      return <PricingSection content={content} vn={vn} />;
    case "faq":          return <FaqSection content={content} vn={vn} />;
    case "blog":         return <BlogSection content={content} vn={vn} />;
    case "footer":       return <FooterSection content={content} vn={vn} />;
    default:             return <ProductsSection content={content} vn={vn} />;
  }
}
