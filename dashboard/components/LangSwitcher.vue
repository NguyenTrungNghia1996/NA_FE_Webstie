<template>
  <div>
    <ClientOnly>
      <a-dropdown placement="bottom" :trigger="['click']">
        <FlagVn v-if="locale === 'vi'" class="text-xl outline-none cursor-pointer" />
        <FlagEn v-else-if="locale === 'en'" class="text-lg outline-none cursor-pointer" />
        <FlagLa v-else class="text-lg outline-none cursor-pointer" />
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <FlagVn @click="handleSelectLang('vi')" />
            </a-menu-item>
            <a-menu-item>
              <FlagEn @click="handleSelectLang('en')" />
            </a-menu-item>
            <!-- <a-menu-item>
              <FlagLa @click="handleSelectLang('lo')" />
            </a-menu-item> -->
          </a-menu>
        </template>
      </a-dropdown>
    </ClientOnly>
  </div>
</template>
<script setup>
const { locale, locales, setLocale } = useI18n()
const optionLang = locales.value.map(l => {
  return {
    label: l.name,
    key: l.code,
  }
})
function handleSelectLang(e) {
  setLocale(e)
}
</script>
