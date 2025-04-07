export const getHashFrom = async (seed: string) => {
  const messageBuffer = new TextEncoder().encode(seed);
  const hashBuffer = await crypto.subtle.digest('SHA-256', messageBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
