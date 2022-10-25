export const base64ToArrayBuffer = (str: string): ArrayBuffer =>
  Buffer.from(str, "base64");
