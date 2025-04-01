import $ from 'jquery'
export default defineNuxtPlugin( ( nuxtAPp ) => {
   nuxtAPp.hook( 'app:beforeMount', () => {
      window.jQuery = window.$ = $
   } )
} )