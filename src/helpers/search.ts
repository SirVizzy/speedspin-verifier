import { SchemaKeys } from "@/components/OutcomeVerifierForm";

export const getSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

export const getSearchParam = (key: SchemaKeys) => {
  return getSearchParams().get(key) ?? undefined;
};