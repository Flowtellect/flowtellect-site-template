"use client";

// ─── DesignContext ───────────────────────────────────────────────────────────
//
// Wstrzykuje DesignDecisions (AI-driven, z theme.json) do wszystkich Showcase
// components. Provider w app/layout.tsx, consumer: useDesign() hook w kazdym
// komponencie Tier 1.
//
// Fallback: gdy brak providera (np. test mount), useDesign zwraca DEFAULT_DESIGN_DECISIONS
// — komponent nie crashuje, wyglada jak generic "balanced" preset.

import { createContext, useContext, type ReactNode } from "react";
import {
  DEFAULT_DESIGN_DECISIONS,
  type DesignDecisions,
} from "@/lib/designDecisions";

const DesignContext = createContext<DesignDecisions | null>(null);

export function DesignProvider({
  decisions,
  children,
}: {
  decisions: DesignDecisions;
  children: ReactNode;
}) {
  return (
    <DesignContext.Provider value={decisions}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign(): DesignDecisions {
  const ctx = useContext(DesignContext);
  return ctx ?? DEFAULT_DESIGN_DECISIONS;
}
