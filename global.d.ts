// global.d.ts
export {};

declare global {
  interface Window {
    keyState: Record<string, boolean>;
  }
}
