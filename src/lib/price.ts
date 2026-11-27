// A price is either a number of pounds ("60") or a phrase such as "Speak to us".
export const isAmount = (p: string) => /^\d+(\.\d+)?$/.test(p);
