"use client";

// ─── PreviewListener ──────────────────────────────────────────────────────────
//
// Klient `postMessage` pozwalający panelowi CMS (Flowtellect) wstrzykiwać
// theme tokens w czasie rzeczywistym do tej strony, gdy jest osadzona w
// iframe panelu jako "live preview".
//
// Protokół (Faza 7):
//   1. Strona Natana renderuje się normalnie (z `content/theme.json`)
//   2. PreviewListener zauważa że jest w iframe (window !== window.parent)
//   3. Wysyła "preview-ready" do parenta przez postMessage
//   4. Panel CMS odpowiada z aktualnymi theme tokens z bazy
//   5. PreviewListener nadpisuje CSS variables na <html>
//   6. Każda zmiana w panelu = nowy postMessage = nowe CSS variables
//   7. Gdy klient kliknie link wewnątrz iframe → wysyłamy "preview-navigated"
//      z nowym pathname, panel aktualizuje dropdown wyboru strony
//
// Bezpieczeństwo:
//   - Walidacja origin (akceptujemy tylko whitelistę domen panelu CMS)
//   - Odmawia wiadomości od nieznanych origins
//   - Działa wyłącznie gdy strona jest w iframe — brak side-effectu dla
//     normalnego ruchu
//
// Forward-compat:
//   - Identyczny komponent powinien być w każdym repo klienta (dziś tylko
//     Natan, w przyszłości wszystkie strony generowane przez AI)
//   - Lista dozwolonych origins jest hardkodowana — gdy panel CMS dostanie
//     hostowaną wersję, dorzucam tu jej domenę

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ─── Konfiguracja origin whitelist ────────────────────────────────────────────
// Dozwolone źródła wiadomości postMessage (czyli — który PARENT może do nas
// pisać). Wszystko inne jest ignorowane.
//
// Wzorzec zamiast statycznej listy: CMS panel moze zyc na roznych domenach
// (localhost dev/staging, vercel preview deploys, panel.flowtellect.com
// produkcja), a template jest jeden dla wszystkich klientow - nie moze znac
// z gory kazdej mozliwej domeny parenta.
const ALLOWED_ORIGIN_PATTERNS: Array<(origin: string) => boolean> = [
  // Localhost dev na dowolnym porcie (3000/3001/3002/...)
  (o) => /^https?:\/\/localhost(:\d+)?$/.test(o),
  (o) => /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(o),
  // flowtellect.com i wszystkie subdomeny (panel, app, staging, preview-*)
  (o) => /^https:\/\/([a-z0-9-]+\.)*flowtellect\.com$/.test(o),
  // Vercel preview deploys (opcjonalnie - flowtellect-cms-git-*-flowtellect.vercel.app)
  (o) => /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o),
];

function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGIN_PATTERNS.some((fn) => fn(origin));
}

// Helper do dev-only debug log. Aktywny tylko w `NODE_ENV !== 'production'`.
// Po wejściu na produkcję komentarze cichną — żeby nie spamować Console
// klientom strony.
function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[PreviewListener]", ...args);
  }
}

// ─── Typy wiadomości (musi pasować do hooks/usePreviewConnection.ts w CMS) ────
interface PreviewThemeMessage {
  type: "flowtellect:preview-theme";
  tokens: Record<string, string>;        // RGB triplets jak w content/theme.json
  fonts?: {
    display?: string;                    // googleId, np. "Cormorant_Garamond" — mapujemy na CSS var poniżej
    body?:    string;
    accent?:  string;
  };
  geometry?: Record<string, string>;     // np. { "radius-base": "8px" }
}

interface PreviewReadyMessage {
  type: "flowtellect:preview-ready";
  themeId: string;                       // żeby panel mógł zalogować "Natan ready w boutique_gold"
  pathname: string;                      // aktualna ścieżka, np. "/o-grupie"
}

interface PreviewNavigatedMessage {
  type: "flowtellect:preview-navigated";
  pathname: string;                      // nowa ścieżka po kliknięciu w link wewnątrz iframe
}

// Google Font ID -> CSS font-family value (loaded via CDN at runtime)
const FONT_ID_TO_FAMILY: Record<string, string> = {
  "Cormorant_Garamond": "'Cormorant Garamond', serif",
  "Inter": "'Inter', sans-serif",
  "Jost": "'Jost', sans-serif",
  "Sora": "'Sora', sans-serif",
  "DM_Serif_Display": "'DM Serif Display', serif",
  "Lora": "'Lora', serif",
  "Space_Grotesk": "'Space Grotesk', sans-serif",
  "Outfit": "'Outfit', sans-serif",
  "JetBrains_Mono": "'JetBrains Mono', monospace",
  "Playfair_Display": "'Playfair Display', serif",
  "Caveat": "'Caveat', cursive",
  "Fraunces": "'Fraunces', serif",
  "Manrope": "'Manrope', sans-serif",
  "Bebas_Neue": "'Bebas Neue', sans-serif",
  "Montserrat": "'Montserrat', sans-serif",
  "IBM_Plex_Sans": "'IBM Plex Sans', sans-serif",
  "Cardo": "'Cardo', serif",
  "Oswald": "'Oswald', sans-serif",
  "Work_Sans": "'Work Sans', sans-serif",
  "Quicksand": "'Quicksand', sans-serif",
  "Poppins": "'Poppins', sans-serif",
  "Nunito": "'Nunito', sans-serif",
  "Marcellus": "'Marcellus', serif",
  "Roboto_Slab": "'Roboto Slab', serif",
  "Italiana": "'Italiana', serif",
  "Bodoni_Moda": "'Bodoni Moda', serif",
  "Libre_Bodoni": "'Bodoni Moda', serif",
  "Cinzel": "'Cinzel', serif",
  "Abril_Fatface": "'Abril Fatface', serif",
  "Raleway": "'Raleway', sans-serif",
  "Crimson_Pro": "'Crimson Pro', serif",
  "Archivo_Black": "'Archivo Black', sans-serif",
  "Josefin_Sans": "'Josefin Sans', sans-serif",
  "Source_Serif_4": "'Source Serif 4', serif",
  "Bitter": "'Bitter', serif",
  "Tenor_Sans": "'Tenor Sans', sans-serif",
  "Vollkorn": "'Vollkorn', serif",
  "Rubik": "'Rubik', sans-serif",
  "Spectral": "'Spectral', serif",
  "Libre_Franklin": "'Libre Franklin', sans-serif",
  "Merriweather": "'Merriweather', serif",
  "Barlow": "'Barlow', sans-serif",
  "Barlow_Condensed": "'Barlow Condensed', sans-serif",
  "Righteous": "'Righteous', sans-serif",
  "Comfortaa": "'Comfortaa', sans-serif",
  "Sacramento": "'Sacramento', cursive",
  "Archivo": "'Archivo', sans-serif",
  "Exo_2": "'Exo 2', sans-serif",
  "Urbanist": "'Urbanist', sans-serif",
  "Figtree": "'Figtree', sans-serif",
  "Plus_Jakarta_Sans": "'Plus Jakarta Sans', sans-serif",
  "Red_Hat_Display": "'Red Hat Display', sans-serif",
  "Instrument_Serif": "'Instrument Serif', serif",
  "DM_Sans": "'DM Sans', sans-serif",
  "Noto_Serif_Display": "'Noto Serif Display', serif",
};

// Load a Google Font at runtime by injecting a <link> tag
const loadedFonts = new Set<string>();
function loadGoogleFont(googleId: string) {
  if (loadedFonts.has(googleId)) return;
  loadedFonts.add(googleId);
  const family = googleId.replace(/_/g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap`;
  document.head.appendChild(link);
}

export default function PreviewListener() {
  // Aktualny pathname Next.js — pozwala wysyłać "preview-navigated" gdy
  // klient nawiguje wewnątrz iframe (kliknie link). Bez tego dropdown
  // wyboru strony w panelu CMS desyncuje się z tym co naprawdę widzi user.
  const pathname = usePathname();

  useEffect(() => {
    // Działamy tylko w iframe. Normalny ruch (klient otwiera stronę
    // bezpośrednio) nie generuje żadnego kodu dodatkowego.
    if (typeof window === "undefined" || window === window.parent) {
      devLog("Not in iframe — listener inactive");
      return;
    }

    devLog("Mounted in iframe, origin validation: pattern-based (localhost, *.flowtellect.com, *.vercel.app)");

    // ── Listener wiadomości ────────────────────────────────────────────────
    function handleMessage(event: MessageEvent) {
      if (!isAllowedOrigin(event.origin)) {
        devLog(`Origin "${event.origin}" not in allowlist, ignoring`);
        return;
      }

      const data = event.data as Partial<PreviewThemeMessage>;
      if (!data || data.type !== "flowtellect:preview-theme") return;

      devLog("Got preview-theme message:", data);

      const root = document.documentElement;

      // Ustawienie tokens (kolory, geometry)
      if (data.tokens) {
        for (const [name, value] of Object.entries(data.tokens)) {
          root.style.setProperty(`--${name}`, value);
        }
      }

      if (data.geometry) {
        for (const [name, value] of Object.entries(data.geometry)) {
          if (typeof value === "string") {
            root.style.setProperty(`--${name}`, value);
          }
        }
      }

      // Load fonts from Google CDN and set font-family directly
      if (data.fonts) {
        const roles = ["display", "body", "accent"] as const;
        for (const role of roles) {
          const googleId = data.fonts[role];
          if (!googleId) continue;
          const family = FONT_ID_TO_FAMILY[googleId];
          if (family) {
            loadGoogleFont(googleId);
            root.style.setProperty(`--font-${role}`, family);
          } else {
            devLog(`Unknown font googleId "${googleId}" for role ${role}`);
          }
        }
      }
    }

    window.addEventListener("message", handleMessage);

    // ── Powiadomienie panelu że jesteśmy gotowi ────────────────────────────
    // Panel CMS po otrzymaniu "preview-ready" wysyła z powrotem aktualne
    // tokens z bazy. Robimy to po krótkim opóźnieniu żeby wszystkie listenery
    // u parenta były już zarejestrowane.
    const readyMessage: PreviewReadyMessage = {
      type: "flowtellect:preview-ready",
      themeId: document.documentElement.getAttribute("data-theme-id") || "unknown",
      pathname: window.location.pathname,
    };

    // Wysyłamy do każdego dozwolonego origin po kolei (bezpieczniej niż "*")
    setTimeout(() => {
      devLog("Sending preview-ready to all allowed parent origins, pathname:", readyMessage.pathname);
      for (const origin of ALLOWED_PARENT_ORIGINS) {
        try {
          window.parent.postMessage(readyMessage, origin);
        } catch {
          // postMessage z error origin = cichy fail, normalne dla origins
          // które nie są aktywne dziś
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // ── Wysyłka preview-navigated przy każdej zmianie pathname ──────────────
  // To inny effect (zależy tylko od pathname) — odpala się gdy klient nawiguje
  // wewnątrz iframe przez kliknięcie linku. Pierwszy render z `pathname`
  // ustawionym też triggeruje, ale to OK — panel po prostu dostanie potwierdzenie.
  useEffect(() => {
    if (typeof window === "undefined" || window === window.parent) return;
    if (!pathname) return;

    const navMessage: PreviewNavigatedMessage = {
      type: "flowtellect:preview-navigated",
      pathname,
    };

    devLog("Sending preview-navigated:", pathname);
    for (const origin of ALLOWED_PARENT_ORIGINS) {
      try {
        window.parent.postMessage(navMessage, origin);
      } catch {
        // cichy fail
      }
    }
  }, [pathname]);

  return null;
}
