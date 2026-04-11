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
// pisać). Wszystko inne jest ignorowane. Dev na wszystkich popularnych portach
// + przyszła hostowana domena CMS.
const ALLOWED_PARENT_ORIGINS: string[] = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://panel.flowtellect.com",  // przyszłość, gdy CMS dostanie hosting
  "https://flowtellect.com",
];

function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_PARENT_ORIGINS.includes(origin);
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

// Mapowanie googleId fontu (jakim panel CMS wysyła) na CSS variable next/font
// w tym repo. Identyczne z FONT_GOOGLE_ID_TO_CSS_VAR w lib/applyTheme.ts —
// duplikacja jest świadoma, bo tu trzymamy tylko mapowanie potrzebne do
// runtime postMessage, a applyTheme.ts trzyma to dla build-time renderingu.
const FONT_GOOGLE_ID_TO_CSS_VAR: Record<string, string> = {
  "Cormorant_Garamond": "--font-cormorant",
  "Inter":              "--font-inter",
  "Jost":               "--font-jost",
  "Sora":               "--font-sora",
  "DM_Serif_Display":   "--font-dm-serif",
  "Lora":               "--font-lora",
  "Space_Grotesk":      "--font-space-grotesk",
  "Outfit":             "--font-outfit",
  "JetBrains_Mono":     "--font-jetbrains",
  "Playfair_Display":   "--font-playfair",
  "Caveat":             "--font-caveat",
  "Fraunces":           "--font-fraunces",
  "Manrope":            "--font-manrope",
  "Bebas_Neue":         "--font-bebas",
  "Montserrat":         "--font-montserrat",
  "IBM_Plex_Sans":      "--font-ibm-plex",
  "Cardo":              "--font-cardo",
  "Oswald":             "--font-oswald",
  "Work_Sans":          "--font-work-sans",
  "Quicksand":          "--font-quicksand",
  "Poppins":            "--font-poppins",
  "Nunito":             "--font-nunito",
  "Marcellus":          "--font-marcellus",
  "Roboto_Slab":        "--font-roboto-slab",
  "Italiana":           "--font-italiana",
  "Bodoni_Moda":        "--font-bodoni",
  "Libre_Bodoni":       "--font-bodoni",
  "Cinzel":             "--font-cinzel",
  // ── Batch 2: dodane dla roznorodnosci motywow premium ──
  "Abril_Fatface":      "--font-abril",
  "Raleway":            "--font-raleway",
  "Crimson_Pro":        "--font-crimson",
  "Archivo_Black":      "--font-archivo-black",
  "Josefin_Sans":       "--font-josefin",
  "Source_Serif_4":     "--font-source-serif",
  "Bitter":             "--font-bitter",
  "Tenor_Sans":         "--font-tenor",
  "Vollkorn":           "--font-vollkorn",
  "Rubik":              "--font-rubik",
  "Spectral":           "--font-spectral",
  "Libre_Franklin":     "--font-libre-franklin",
  // ── Batch 3: 50 nowych motywow premium ──
  "Merriweather":       "--font-merriweather",
  "Barlow":             "--font-barlow",
  "Barlow_Condensed":   "--font-barlow-condensed",
  "Righteous":          "--font-righteous",
  "Comfortaa":          "--font-comfortaa",
  "Sacramento":         "--font-sacramento",
  "Archivo":            "--font-archivo",
  "Exo_2":              "--font-exo2",
  "Urbanist":           "--font-urbanist",
  "Figtree":            "--font-figtree",
  "Plus_Jakarta_Sans":  "--font-jakarta",
  "Red_Hat_Display":    "--font-red-hat",
  "Instrument_Serif":   "--font-instrument",
  "DM_Sans":            "--font-dm-sans",
  "Noto_Serif_Display": "--font-noto-serif",
};

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

    devLog("Mounted in iframe, allowed parent origins:", ALLOWED_PARENT_ORIGINS);

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

      // Mapowanie fontów googleId → CSS variable
      if (data.fonts) {
        const roles = ["display", "body", "accent"] as const;
        for (const role of roles) {
          const googleId = data.fonts[role];
          if (!googleId) continue;
          const cssVar = FONT_GOOGLE_ID_TO_CSS_VAR[googleId];
          if (cssVar) {
            root.style.setProperty(`--font-${role}`, `var(${cssVar})`);
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
