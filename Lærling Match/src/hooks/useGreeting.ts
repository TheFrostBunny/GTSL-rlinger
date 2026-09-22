import { useTranslation } from "react-i18next";

export function useGreeting(): string {
  const { t } = useTranslation();
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return t("greeting.morning");
  }

  if (hour >= 12 && hour < 18) {
    return t("greeting.day");
  }

  return t("greeting.evening");
}
