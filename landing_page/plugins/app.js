import { customAlphabet } from "nanoid";
import * as PageType from "../components/Page";
export default defineNuxtPlugin((NuxtApp) => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10
  );
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
      BREADCRUMB: {
        TYPE: "BREADCRUMB",
        LABEL: "Breadcrumb",
      },
      DETAIL: {
        TYPE: "DETAIL",
        LABEL: "Detail",
      },
      PRODUCT: {
        TYPE: "PRODUCT",
        LABEL: "Product",
      }
    };
  });
  const type2Component = (type) => {
    switch (type) {
      case typePage.value.INFO.TYPE:
        return PageType.Info;
      case typePage.value.SLIDES_LIST.TYPE:
        return PageType.SildesList;
      case typePage.value.SLIDES_BANNER.TYPE:
        return PageType.SlidesBanner;
      case typePage.value.SLIDES_CUSTOMER.TYPE:
        return PageType.SlidesCustomer;
      case typePage.value.BREADCRUMB.TYPE:
        return PageType.Breadcrumb;
      case typePage.value.DETAIL.TYPE:
        return PageType.Detail;
      case typePage.value.PRODUCT.TYPE:
        return PageType.Product;
      default:
        return null;
    }
  };
  return {
    provide: {
      RANDOMID: () => nanoid(),
      type2Component: type2Component,
    },
  };
});
