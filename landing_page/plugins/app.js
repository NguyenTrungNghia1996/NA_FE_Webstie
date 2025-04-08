import { customAlphabet } from "nanoid";
import * as PageType from "../components/Page"
export default defineNuxtPlugin(NuxtApp => {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  const typePage = computed(() => { 
    return {
      INFO: {
        TYPE: "INFO",
        LABEL: "Page Info",
      },
      SLIDES_LIST: {
        TYPE: "SLIDES_LIST",
        LABEL: "Slides List",
      },
      SLIDES_BANNER: {
        TYPE: "SLIDES_BANNER",
        LABEL: "Slides Banner",
      },
      SLIDES_CUSTOMER: {
        TYPE: "SLIDES_CUSTOMER",
        LABEL: "Slides Customer",
      },
    }
  })
  const type2Component = type => { 
    switch (type) { 
      case typePage.value.INFO.TYPE:
        return PageType.Info;
      case typePage.value.SLIDES_LIST.TYPE:
        return PageType.SildesList;
      case typePage.value.SLIDES_BANNER.TYPE:
        return PageType.SlidesBanner;
      case typePage.value.SLIDES_CUSTOMER.TYPE:
        return PageType.SlidesCustomer;
      default:
        return null;
    }
  }
  return {
    provide: {
      RANDOMID: () => nanoid(),
      type2Component: type2Component,
    },
  };
});
