export type UrgencyLevel = "LOW" | "MID" | "HIGH";

export interface OrderTiming {
  formattedTime: string;
  urgency: UrgencyLevel;
  label: string;
}

/**
 * Calcula el tiempo transcurrido y determina el nivel de urgencia.
 * Ideal para el sistema de semáforo del KDS de Libresso.
 */
/* export function getRelativeTime(
  timestamp: string | number | Date | null,
): OrderTiming {
  if (!timestamp) {
    return { formattedTime: "N/A", urgency: "LOW", label: "A tiempo" };
  }

  // 1. Normalización de la fecha (Sincronización Turso/JS)
  let date: Date;
  if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else if (typeof timestamp === "string") {
    const utcString = timestamp.includes("T")
      ? timestamp
      : timestamp.replace(" ", "T") + "Z";
    date = new Date(utcString);
  } else {
    date = timestamp;
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = diffInMs / 60000;
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // 2. Determinación de Urgencia (Semáforo)
  let urgency: UrgencyLevel = "LOW";
  let label = "A tiempo";

  if (diffInMinutes >= 20) {
    urgency = "HIGH";
    label = "Urgente";
  } else if (diffInMinutes >= 10) {
    urgency = "MID";
    label = "Retrasado";
  }

  // 3. Formateo de Tiempo Detallado (Tu lógica anterior)
  let formattedTime = "ahora";
  if (diffInSeconds >= 5) {
    const units = [
      { l: "d", s: 86400 },
      { l: "h", s: 3600 },
      { l: "min", s: 60 },
      { l: "s", s: 1 },
    ];

    let parts = [];
    let rem = diffInSeconds;
    for (const { l, s } of units) {
      if (rem >= s) {
        parts.push(`${Math.floor(rem / s)}${l}`);
        rem %= s;
        if (parts.length === 2) break;
      }
    }
    formattedTime = parts.join(" ");
  }

  return { formattedTime, urgency, label };
} */

/**
 * Formats a date string or object into a pretty format for Colombia
 * Example: "15 de mayo de 2026, 2:30 p. m."
 */
export const formatDate = (date: Date | string | number): string => {
  const d = new Date(date);

  // Check if date is valid
  if (isNaN(d.getTime())) return "Fecha inválida";

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Bogota", // Ensures consistency regardless of server location
  }).format(d);
};

/**
 * Alternative: Relative format (e.g., "hace 2 horas")
 * Very common for social-style post-its
 */
export const formatRelativeTime = (date: Date | string | number): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("es-CO", { numeric: "auto" });

  if (diffInSeconds < 60) return "hace un momento";
  if (diffInSeconds < 3600)
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  if (diffInSeconds < 86400)
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");

  return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
};
