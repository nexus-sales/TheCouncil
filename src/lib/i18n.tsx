"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CouncilMode, Locale, StakesLevel } from "@/core/types";

const STORAGE_KEY = "the-council-locale";

const dictionaries = {
  en: {
    nav: {
      newDecision: "New Decision",
      protocols: "Protocols",
      language: "Language",
    },
    home: {
      badge: "Anti-complacency decision intelligence",
      title: "Put the decision in front of people who disagree on purpose.",
      description:
        "The Council v2 convenes five opposing mandates, tests whether the central data is missing, and forces a Chairman synthesis into one honest next move.",
      cta: "Convene the Council",
      rulesTitle: "Operating rules",
      principles: [
        "Central data test before advice",
        "Blind commitment from every advisor",
        "Groupthink check before synthesis",
        "One Chairman decision, not a menu",
      ],
    },
    newPage: {
      title: "Convene the Council",
      description:
        "Describe the decision, app, code, idea, or strategy. If the central data is missing, the Council will pause instead of inventing certainty.",
    },
    resultPage: {
      title: "Council Result",
    },
    form: {
      questionLabel: "What should the Council judge?",
      questionPlaceholder:
        "Example: Should I launch this v2 next week or wait until onboarding is fixed?",
      modeLabel: "Mode",
      contextLabel: "Context",
      optional: "optional",
      contextPlaceholder:
        "Add constraints, product context, audience, traction, code paths, data, or what you already believe.",
      optionsLabel: "Options being considered",
      optionPlaceholder: "Option",
      removeOption: "Remove option",
      addOption: "Add option",
      stakesLabel: "Stakes level",
      loading: "Convening the Council...",
      submit: "Convene the Council",
      unknownError: "Something went wrong.",
    },
    modes: {
      "app-code": {
        label: "App or code",
        description: "Review a product, repo, feature, UX, or technical direction.",
      },
      "idea-strategy": {
        label: "Idea or strategy",
        description: "Stress-test a business idea, product bet, market, or plan.",
      },
      decision: {
        label: "Decision",
        description: "Choose a move when the consequences matter.",
      },
    } satisfies Record<CouncilMode, { label: string; description: string }>,
    stakes: {
      low: "low",
      medium: "medium",
      high: "high",
      critical: "critical",
    } satisfies Record<StakesLevel, string>,
    result: {
      notFound: "Result not found or session expired.",
      startNew: "Start a new decision",
      councilPaused: "Council paused",
      assumptions: "Assumptions",
      chairman: "Chairman",
      synthesis: "Synthesis",
      convergence: "Where they converge",
      groupthink: "Groupthink test",
      tension: "Useful tension",
      invalidated: "What did not survive",
      selfAttack: "Self-attack",
      minorityCost: "Minority cost",
      decision: "Decision",
      newDecision: "New Decision",
      escalation: {
        light: "light",
        full: "full",
      },
    },
    advisors: {
      opposer: {
        name: "The Opposer",
        role: "Failure pressure test",
        mandate: "Find where this breaks first and attack it directly.",
      },
      "first-principles": {
        name: "First Principles",
        role: "Problem reframing",
        mandate: "Ignore the framed question and solve the real problem underneath.",
      },
      amplifier: {
        name: "The Amplifier",
        role: "Upside maximalist",
        mandate: "Only defend the upside. Do not name risks.",
      },
      outsider: {
        name: "External Observer",
        role: "Fresh eyes",
        mandate: "Say what an outsider sees in the first 30 seconds.",
      },
      implementer: {
        name: "The Implementer",
        role: "Monday morning action",
        mandate: "Turn the analysis into the first concrete move.",
      },
    },
    card: {
      evidence: "Evidence",
    },
  },
  es: {
    nav: {
      newDecision: "Nueva decisión",
      protocols: "Protocols",
      language: "Idioma",
    },
    home: {
      badge: "Inteligencia de decisión anti-complacencia",
      title: "Pon la decisión delante de personas que discrepan a propósito.",
      description:
        "The Council v2 convoca cinco mandatos opuestos, comprueba si falta el dato central y obliga al Chairman a sintetizar un siguiente movimiento honesto.",
      cta: "Convocar al Council",
      rulesTitle: "Reglas operativas",
      principles: [
        "Test del dato central antes de aconsejar",
        "Compromiso ciego de cada asesor",
        "Chequeo de groupthink antes de sintetizar",
        "Una decisión del Chairman, no un menú",
      ],
    },
    newPage: {
      title: "Convoca al Council",
      description:
        "Describe la decisión, app, código, idea o estrategia. Si falta el dato central, el Council se detendrá en vez de inventar certeza.",
    },
    resultPage: {
      title: "Resultado del Council",
    },
    form: {
      questionLabel: "¿Qué debe juzgar el Council?",
      questionPlaceholder:
        "Ejemplo: ¿lanzo esta v2 la próxima semana o espero a arreglar el onboarding?",
      modeLabel: "Modo",
      contextLabel: "Contexto",
      optional: "opcional",
      contextPlaceholder:
        "Añade restricciones, contexto de producto, audiencia, tracción, rutas de código, datos o lo que ya crees.",
      optionsLabel: "Opciones consideradas",
      optionPlaceholder: "Opción",
      removeOption: "Eliminar opción",
      addOption: "Añadir opción",
      stakesLabel: "Nivel de consecuencias",
      loading: "Convocando al Council...",
      submit: "Convocar al Council",
      unknownError: "Algo ha salido mal.",
    },
    modes: {
      "app-code": {
        label: "App o código",
        description: "Revisa producto, repo, feature, UX o dirección técnica.",
      },
      "idea-strategy": {
        label: "Idea o estrategia",
        description: "Estresa una idea de negocio, apuesta de producto, mercado o plan.",
      },
      decision: {
        label: "Decisión",
        description: "Elige un movimiento cuando las consecuencias importan.",
      },
    } satisfies Record<CouncilMode, { label: string; description: string }>,
    stakes: {
      low: "bajo",
      medium: "medio",
      high: "alto",
      critical: "crítico",
    } satisfies Record<StakesLevel, string>,
    result: {
      notFound: "Resultado no encontrado o sesión caducada.",
      startNew: "Empezar una decisión nueva",
      councilPaused: "Council en pausa",
      assumptions: "Supuestos",
      chairman: "Chairman",
      synthesis: "Síntesis",
      convergence: "Dónde convergen",
      groupthink: "Test de groupthink",
      tension: "Tensión útil",
      invalidated: "Lo que no sobrevivió",
      selfAttack: "Ataque a la decisión",
      minorityCost: "Coste de ignorar la minoría",
      decision: "Decisión",
      newDecision: "Nueva decisión",
      escalation: {
        light: "ligero",
        full: "completo",
      },
    },
    advisors: {
      opposer: {
        name: "El Opositor",
        role: "Prueba de fallo",
        mandate: "Encuentra dónde se rompe primero y atácalo directamente.",
      },
      "first-principles": {
        name: "Primeros Principios",
        role: "Reencuadre del problema",
        mandate: "Ignora cómo se planteó la pregunta y resuelve el problema real.",
      },
      amplifier: {
        name: "El Ampliador",
        role: "Maximalista del potencial",
        mandate: "Defiende solo el lado positivo. No nombres riesgos.",
      },
      outsider: {
        name: "Observador Externo",
        role: "Mirada fresca",
        mandate: "Di qué ve alguien externo en los primeros 30 segundos.",
      },
      implementer: {
        name: "El Implementador",
        role: "Acción del lunes",
        mandate: "Convierte el análisis en el primer movimiento concreto.",
      },
    },
    card: {
      evidence: "Evidencia",
    },
  },
};

type Dictionary = typeof dictionaries.en;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;

  return window.navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const value = useMemo<LocaleContextValue>(() => {
    const setLocale = (nextLocale: Locale) => {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
    };

    return {
      locale,
      setLocale,
      t: dictionaries[locale],
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider.");
  }
  return context;
}
