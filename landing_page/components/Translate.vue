<script setup>
import { ref } from 'vue';
import { useGoogleTranslate } from '#imports';

const { activeLanguage, setLanguage, supportedLanguages, isLoaded } = useGoogleTranslate();
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (lang) => {
  setLanguage(lang);
  isOpen.value = false; // Close dropdown after selection
  window.location.reload();
};

const languageFlags = {
  vi: '/vi.svg', // Đường dẫn đến hình ảnh cờ Việt Nam
  en: '/en.svg', // Đường dẫn đến hình ảnh cờ Anh
  // Thêm các ngôn ngữ và đường dẫn cờ khác nếu cần
};
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex justify-center rounded-md bg-white shadow-sm  hover:bg-gray-50 w-10 h-10 items-center"
        id="language-menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        @click="toggleDropdown"
      >
        <img
          v-if="languageFlags[activeLanguage]"
          :src="languageFlags[activeLanguage]"
          alt=""
          class="h-7 w-99 rounded-md object-cover"
        />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-2 w-10 origin-top-right rounded-md bg-white  ring-1 focus:outline-none" 
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu-button"
    >
      <div class="py-1" role="none">
        <button
          v-for="lang in supportedLanguages"
          :key="lang"
          class="block px-0 py-0 text-sm hover:bg-gray-100 flex items-center justify-center w-10 h-10"
          role="menuitem"
          @click="changeLanguage(lang)"
        >
          <img
            v-if="languageFlags[lang]"
            :src="languageFlags[lang]"
            alt=""
            class="h-7 w-9 rounded-md object-cover"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bạn có thể thêm các style tùy chỉnh nếu cần */
</style>