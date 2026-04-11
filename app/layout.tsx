import type { Metadata } from "next";
import {
  Inter, Sora, Outfit, Jost, Lora, Manrope, Poppins, Nunito, Quicksand,
  Montserrat, Oswald, Work_Sans, Caveat, Fraunces, Marcellus,
  Space_Grotesk, JetBrains_Mono, Playfair_Display, Bebas_Neue,
  IBM_Plex_Sans, Cardo, Roboto_Slab, Italiana, Bodoni_Moda, Cinzel,
  Cormorant_Garamond, Abril_Fatface, Raleway, Crimson_Pro, Archivo_Black,
  Josefin_Sans, Source_Serif_4, Bitter, Tenor_Sans, Vollkorn, Rubik,
  Spectral, Libre_Franklin, Merriweather, Barlow, Barlow_Condensed,
  Righteous, Comfortaa, Sacramento, Archivo, Exo_2, Urbanist, Figtree,
  Plus_Jakarta_Sans, Red_Hat_Display, Instrument_Serif, DM_Sans,
  Noto_Serif_Display,
} from "next/font/google";
import { getThemeStyleObject, getThemeFontStyleObject, getThemeDataAttributes, getActiveTheme } from "@/lib/applyTheme";
import PreviewListener from "@/components/PreviewListener";
import "./globals.css";

// ─── Font instances ──────────────────────────────────────────────────────────
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--font-sora", display: "swap" });
const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit", display: "swap" });
const jost = Jost({ subsets: ["latin", "latin-ext"], variable: "--font-jost", display: "swap" });
const lora = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-lora", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });
const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-nunito", display: "swap" });
const quicksand = Quicksand({ subsets: ["latin", "latin-ext"], variable: "--font-quicksand", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], variable: "--font-montserrat", display: "swap" });
const oswald = Oswald({ subsets: ["latin", "latin-ext"], variable: "--font-oswald", display: "swap" });
const workSans = Work_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-work-sans", display: "swap" });
const caveat = Caveat({ subsets: ["latin", "latin-ext"], variable: "--font-caveat", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-fraunces", display: "swap" });
const marcellus = Marcellus({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-marcellus", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains", display: "swap" });
const playfairDisplay = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-playfair", display: "swap" });
const bebasNeue = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--font-ibm-plex", display: "swap" });
const cardo = Cardo({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], variable: "--font-cardo", display: "swap" });
const robotoSlab = Roboto_Slab({ subsets: ["latin", "latin-ext"], variable: "--font-roboto-slab", display: "swap" });
const italiana = Italiana({ subsets: ["latin"], weight: "400", variable: "--font-italiana", display: "swap" });
const bodoniModa = Bodoni_Moda({ subsets: ["latin", "latin-ext"], variable: "--font-bodoni", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin", "latin-ext"], variable: "--font-cinzel", display: "swap" });
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--font-cormorant", display: "swap" });
const abrilFatface = Abril_Fatface({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-abril", display: "swap" });
const raleway = Raleway({ subsets: ["latin", "latin-ext"], variable: "--font-raleway", display: "swap" });
const crimsonPro = Crimson_Pro({ subsets: ["latin", "latin-ext"], variable: "--font-crimson", display: "swap" });
const archivoBlack = Archivo_Black({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-archivo-black", display: "swap" });
const josefinSans = Josefin_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-josefin", display: "swap" });
const sourceSerif4 = Source_Serif_4({ subsets: ["latin", "latin-ext"], variable: "--font-source-serif", display: "swap" });
const bitter = Bitter({ subsets: ["latin", "latin-ext"], variable: "--font-bitter", display: "swap" });
const tenorSans = Tenor_Sans({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-tenor", display: "swap" });
const vollkorn = Vollkorn({ subsets: ["latin", "latin-ext"], variable: "--font-vollkorn", display: "swap" });
const rubik = Rubik({ subsets: ["latin", "latin-ext"], variable: "--font-rubik", display: "swap" });
const spectral = Spectral({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--font-spectral", display: "swap" });
const libreFranklin = Libre_Franklin({ subsets: ["latin", "latin-ext"], variable: "--font-libre-franklin", display: "swap" });
const merriweather = Merriweather({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "700"], variable: "--font-merriweather", display: "swap" });
const barlow = Barlow({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--font-barlow", display: "swap" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "700"], variable: "--font-barlow-condensed", display: "swap" });
const righteous = Righteous({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-righteous", display: "swap" });
const comfortaa = Comfortaa({ subsets: ["latin", "latin-ext"], variable: "--font-comfortaa", display: "swap" });
const sacramento = Sacramento({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-sacramento", display: "swap" });
const archivo = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-archivo", display: "swap" });
const exo2 = Exo_2({ subsets: ["latin", "latin-ext"], variable: "--font-exo2", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin", "latin-ext"], variable: "--font-urbanist", display: "swap" });
const figtree = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-figtree", display: "swap" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-jakarta", display: "swap" });
const redHatDisplay = Red_Hat_Display({ subsets: ["latin", "latin-ext"], variable: "--font-red-hat", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-instrument", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-dm-sans", display: "swap" });
const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin", "latin-ext"], variable: "--font-noto-serif", display: "swap" });

const fontVars = [
  inter, sora, outfit, jost, lora, manrope, poppins, nunito, quicksand,
  montserrat, oswald, workSans, caveat, fraunces, marcellus, spaceGrotesk,
  jetbrainsMono, playfairDisplay, bebasNeue, ibmPlexSans, cardo, robotoSlab,
  italiana, bodoniModa, cinzel, cormorantGaramond, abrilFatface, raleway,
  crimsonPro, archivoBlack, josefinSans, sourceSerif4, bitter, tenorSans,
  vollkorn, rubik, spectral, libreFranklin, merriweather, barlow,
  barlowCondensed, righteous, comfortaa, sacramento, archivo, exo2,
  urbanist, figtree, plusJakartaSans, redHatDisplay, instrumentSerif,
  dmSans, notoSerifDisplay,
].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: "Flowtellect Site",
  description: "Strona wygenerowana przez Flowtellect CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getActiveTheme();
  const themeStyle = { ...getThemeStyleObject(), ...getThemeFontStyleObject() };
  const themeDataAttrs = getThemeDataAttributes();

  return (
    <html lang="pl" className={fontVars} style={themeStyle} {...themeDataAttrs}>
      <body className="bg-bg text-primary font-body antialiased">
        <PreviewListener />
        {children}
      </body>
    </html>
  );
}
