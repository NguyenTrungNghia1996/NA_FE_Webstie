<script setup>
import { ref } from "vue";
import { useGoogleTranslate } from "#imports";
const token = useCookie("token");

const { activeLanguage, setLanguage, supportedLanguages, isLoaded } = useGoogleTranslate();
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
// const changeLanguage = async lang => {
//   setLanguage(lang);
//   await nextTick();
//   isOpen.value = false; // Close dropdown after selection
//   window.location.reload();
// };
// const changeLanguage = async lang => {
//   setLanguage(lang);
//   isOpen.value = false;

//   // Đợi 1 chút để Google xử lý rồi mới reload
//   setTimeout(() => {
//     window.location.reload();
//   }, 300); // 300ms là ổn trong hầu hết trường hợp
// };
// const changeLanguage = async (lang) => {
//   isOpen.value = false;

//   if (lang === 'vi') {
//     // Reset Google Translate về mặc định
//     document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     window.location.href = window.location.origin + window.location.pathname;
//   } else {
//     setLanguage(lang);
//     setTimeout(() => {
//       window.location.reload();
//     }, 600);
//   }
// };

const changeLanguage = async (lang) => {
  isOpen.value = false;

  if (lang === 'vi') {
    // Gọi API xoá cookie phía server
    await $fetch('/reset-language');

    // Xoá client cookie nếu có
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "googtrans=; path=/; domain=.nguyenanh-est.com; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // Reload sạch
    window.location.href = window.location.origin + window.location.pathname;
  } else {
    document.cookie = `googtrans=/vi/${lang};path=/;`;
    window.location.href = window.location.origin + window.location.pathname;
  }
};

const languageFlags = {
  vi: "/vi.svg",
  en: "/en.svg",
};
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" class="inline-flex justify-center rounded-md bg-white shadow-sm hover:bg-gray-50 w-10 h-10 items-center" id="language-menu-button" aria-expanded="true" aria-haspopup="true" @click="toggleDropdown">
        <ClientOnly>
          <NuxtImg :src="languageFlags[activeLanguage]" :key="languageFlags[activeLanguage]" class="h-7 w-9 rounded-md object-cover" />
        </ClientOnly>
      </button>
    </div>

    <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-10 origin-top-right rounded-md bg-white ring-1 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button">
      <div class="py-1" role="none">
        <button v-for="lang in supportedLanguages" :key="lang" class="block px-0 py-0 text-sm hover:bg-gray-100 flex items-center justify-center w-10 h-10" role="menuitem" @click="changeLanguage(lang)">
          <img v-if="languageFlags[lang]" :src="languageFlags[lang]" alt="" class="h-7 w-9 rounded-md object-cover" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bạn có thể thêm các style tùy chỉnh nếu cần */
</style>
