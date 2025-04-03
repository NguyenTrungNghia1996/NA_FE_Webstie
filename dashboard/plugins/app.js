import { customAlphabet } from "nanoid";
export default defineNuxtPlugin(NuxtApp => { 
  const t = NuxtApp.$i18n.t;
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  return {
    provide: {
      RANDOMID: () => nanoid(),
    }
  }
});