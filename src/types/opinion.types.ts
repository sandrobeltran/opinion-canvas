export const opinionTypes = ["CITY", "UNIVERSIY", "CAREER"] as const;
export type OpinionType = (typeof opinionTypes)[number];

export const opinionTypesDict: Record<OpinionType, { label: string }> = {
  CITY: { label: "Ciudad" },
  UNIVERSIY: { label: "Universidad" },
  CAREER: { label: "Carrera" },
};

export const locations = [
  "UNIVERSIDAD JAVERIANA - DESIGN FACTORY",
  "UNIVERSIDAD JAVERIANA - CENTRO JAVERIANO DE EMPRENDIMIENTO",
  "UNIVERSIDAD JAVERIANA - LABORATORIOS",
  "CENTRO FELICIDAD - CEFE CHAPINERO",
  "INVEST IN BOGOTÁ",
  "BIBLIOSEO - BIBLIOTECA DE LA CREATIVIDAD",
  "UNIVERSIDAD EAN - EDIFICIO LEGACY",
  "UNIVERSIDAD EAN - SANDBOX (CLUB DE EMPRENDIMIENTO)",
  "UNIVERSIDAD EAN - EAN IMPACTA",
] as const;

export type Location = (typeof locations)[number];
export const locationsDict: Record<Location, { label: string }> = {
  "UNIVERSIDAD JAVERIANA - CENTRO JAVERIANO DE EMPRENDIMIENTO": {
    label: "Centro Javeriano de Emprendimiento",
  },
  "CENTRO FELICIDAD - CEFE CHAPINERO": {
    label: "CEFE Chapinero",
  },
  "UNIVERSIDAD JAVERIANA - DESIGN FACTORY": {
    label: "Javeriana Design Factory",
  },
  "UNIVERSIDAD JAVERIANA - LABORATORIOS": {
    label: "Laboratorios Javeriana",
  },
  "INVEST IN BOGOTÁ": {
    label: "Invest in Bogotá",
  },
  "BIBLIOSEO - BIBLIOTECA DE LA CREATIVIDAD": {
    label: "Biblioseo - Biblioteca de la Creatividad",
  },
  "UNIVERSIDAD EAN - EDIFICIO LEGACY": {
    label: "Universidad Ean - Edificio Legacy",
  },
  "UNIVERSIDAD EAN - SANDBOX (CLUB DE EMPRENDIMIENTO)": {
    label: "Sandbox Ean (Club de Emprendimiento)",
  },
  "UNIVERSIDAD EAN - EAN IMPACTA": {
    label: "Ean Impacta",
  },
};

export const careers = [
  "MULTIMEDIA_ENGINEERING",
  "MARKETING",
  "SOCIAL_WORK",
  "SOCIAL_INTERVENTION_SPECIALIZATION",
  "MBA_INNOVATION",
  "HEALTH_QUALITY_AUDIT_MASTERS",
  "MACONDOLAB_INNPRENDE",
] as const;

export type Career = (typeof careers)[number];
export const careersDict: Record<Career, { label: string }> = {
  MULTIMEDIA_ENGINEERING: {
    label: "Ingeniería Multimedia",
  },
  MARKETING: {
    label: "Marketing",
  },
  SOCIAL_WORK: {
    label: "Trabajo Social",
  },
  SOCIAL_INTERVENTION_SPECIALIZATION: {
    label: "Especialización en Procesos de Intervención Social",
  },
  MBA_INNOVATION: {
    label: "Maestría en Administración de Empresas e Innovación",
  },
  HEALTH_QUALITY_AUDIT_MASTERS: {
    label:
      "Maestría en Auditoría y Sistemas de la Calidad en Servicios de Salud",
  },
  MACONDOLAB_INNPRENDE: {
    label: "MacondoLab - Cátedra Innprende",
  },
};

export interface Opinion {
  id?: string;
  type: OpinionType;
  email: string;
  location: Location;
  career: Career;
  text: string;

  createdAt: number;
}
