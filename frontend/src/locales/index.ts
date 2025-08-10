import en from "./en.json";
import ur from "./ur.json";

export const languages = [
  { code: "en", label: "English", data: en },
  { code: "ur", label: "اردو", data: ur },
];

export function getTranslation(lang: string) {
  const found = languages.find((l) => l.code === lang);
  return found ? found.data : en;
}
