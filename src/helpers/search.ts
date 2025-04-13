import { SchemaKeys } from "@/components/OutcomeVerifierForm";

export const getSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

export const getSearchParamFromPayload = (key: SchemaKeys) => {
  const params = getSearchParams();
  const payload = params.get('payload');
  
  if (payload) {
    try {
      const parsedPayload = JSON.parse(payload);
      return parsedPayload[key] ?? undefined;
    } catch (e) {
      console.error('Failed to parse payload:', e);
      return undefined;
    }
  }
  
  return params.get(key) ?? undefined;
};