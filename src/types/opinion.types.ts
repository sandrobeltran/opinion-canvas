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
  "CIVIL_ENGINEERING",
  "SYSTEMS_ENGINEERING",
  "INDUSTRIAL_ENGINEERING",
  "ELECTRONIC_ENGINEERING",
  "MECHANICAL_ENGINEERING",
  "SOFTWARE_ENGINEERING",
] as const;

export type Career = (typeof careers)[number];
export const careersDict: Record<Career, { label: string }> = {
  CIVIL_ENGINEERING: { label: "Ingeniería Civil" },
  SYSTEMS_ENGINEERING: { label: "Ingeniería de Sistemas" },
  INDUSTRIAL_ENGINEERING: { label: "Ingeniería Industrial" },
  ELECTRONIC_ENGINEERING: { label: "Ingeniería Electrónica" },
  MECHANICAL_ENGINEERING: { label: "Ingeniería Mecánica" },
  SOFTWARE_ENGINEERING: { label: "Ingeniería de Software" },
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
