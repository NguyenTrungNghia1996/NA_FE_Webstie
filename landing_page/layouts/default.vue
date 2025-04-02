<template>
  <div>
    <!-- PC -->
    <header class="w-100 d-none d-lg-flex">
      <div class="container d-md-flex justify-content-between align-items-md-center h-100">
        <!-- <a href="index.html"><img src="htmlib/img/Home/Group%202773722.svg" alt="logo"></a> -->
        <div v-if="menu.length > 0" class="d-md-flex flex-row justify-content-md-end align-items-md-center w-100 h-100">
          {{ menu.children }}
          <div v-for="item_menu in menu" :key="item_menu.id" class="h-100 h-ithpc">
            <a href="#"><span class="d-md-flex align-items-md-center tit-h-pc h-100">{{ item_menu.name }}</span></a>
            <div class=" slash-hpc"></div>
            <div v-if="item_menu.child.length > 0" class="content-dropdownhdpc" style="display: none;">
              <ul class="list-unstyled m-0">
                <li v-for="(value, key) in item_menu.child" :key="key" class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">
                  {{ value.name }}
                  <a class="l-abs-f" href="gioithieucongty.html"></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="d-lg-flex align-items-lg-center h-social">
            <form class="d-flex align-items-center">
              <div class="d-flex justify-content-end search-head-place">
                <input class="form-control d-flex align-items-center" type="text" placeholder="Tìm kiếm..." /><button class="btn search-head-button" type="button">
                  <svg class="icon icon-tabler icon-tabler-search" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                  </svg>
                </button>
              </div>
            </form>
            <a href="https://www.facebook.com/quangich.com.vn/" target="_blank" rel="noreferrer">
              <!-- <img class="fb-header" src="Content/Images/header/Group%2027658.svg" alt="facebook logo"> -->
            </a>
            <a href="javascript:;" onclick="Doingonngutienganh()" id="tienganh">
              <!-- &nbsp;&nbsp;&nbsp;&nbsp;<img src="Images/eng.png" /> -->
            </a>

            <a href="javascript:;" style="display:none" onclick="Doingonngutiengviet()" id="tiengviet">
              <!-- &nbsp;&nbsp;&nbsp;&nbsp;<img src="Images/vn.png" /> -->
            </a>

          </div>
        </div>
      </div>
    </header>
    <!-- Mobile -->
    <div class="d-flex d-lg-none justify-content-center header w-100">
      <div class="w-100 d-flex justify-content-center align-items-center content-header">
        <div class="row d-flex align-items-center w-100">
          <!-- <div class="col"><a href="index.html"><img src="htmlib/img/Home/Group%202773722.svg" alt="logo" /></a></div> -->
          <div class="col d-flex justify-content-end">
            <!-- <a href="javascript:;" onclick="Doingonngutienganh()" id="tienganh"><img src="Images/eng.png" />
                </a>
                <a href="javascript:;" style="display:none" onclick="Doingonngutiengviet()" id="tiengviet"><img src="Images/vn.png" />
                </a> -->
            <svg class="ic-menu" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
      <div class="d-md-flex flex-column justify-content-md-start nv-header">
        <!--Item menu có lv2-->
        <div class="itnv-hd-t">
          <span class="d-flex justify-content-between align-items-center tt-lv1-hd h-100">Giới thiệu<i class="fa fa-angle-down"></i></span>
          <div class="h-lv2-hd w-100" style="display: none;">
            <span class="d-flex align-items-center tt-hd-lv2">Về ch&#250;ng t&#244;i<a class="l-abs-f" href="gioithieucongty.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">C&#225;c giải thưởng<a class="l-abs-f" href="cac-giai-thuong-tap-doan-cong-nghe-quang-ich-duoc-trao-tang-dtnewtt-26106.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Thư viện h&#236;nh ảnh<a class="l-abs-f" href="thuvienhinhanh.html"></a></span>

          </div>
        </div>
        <!--Item menu có lv2-->
        <div class="itnv-hd-t">
          <span class="d-flex justify-content-between align-items-center tt-lv1-hd h-100">Sản phẩm dịch vụ<i class="fa fa-angle-down"></i></span>
          <div class="h-lv2-hd w-100" style="display: none;">
            <span class="d-flex align-items-center tt-hd-lv2">Hệ thống th&#244;ng tin quản l&#253; gi&#225;o dục<a class="l-abs-f" href="quanlygiaoduc.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2"> Ứng dụng eNetViet<a class="l-abs-f" href="eNetviet.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Thư Viện Điện Tử VIELIB<a class="l-abs-f" href="thuviendientu.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2"> Cổng th&#244;ng tin điện tử V-Portal<a class="l-abs-f" href="congthongtindientu.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Hệ thống Học v&#224; thi trực tuyến V-Study<a class="l-abs-f" href="hocvathitructuyen.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Thẻ th&#244;ng minh E-CarD<a class="l-abs-f" href="thediemdanhthongminh.html"></a></span>

          </div>
        </div>
        <div class="itnv-hd"><span class="d-flex align-items-center tt-lv1-hd h-100">Kinh nghiệm triển khai<a class="l-abs-f" href="kinh-nghiem-trien-khai-dtcate-2351.html"></a></span></div>
        <!--Item menu có lv2-->
        <div class="itnv-hd-t">
          <span class="d-flex justify-content-between align-items-center tt-lv1-hd h-100">Tin tức<i class="fa fa-angle-down"></i></span>
          <div class="h-lv2-hd w-100" style="display: none;">
            <span class="d-flex align-items-center tt-hd-lv2">Tin gi&#225;o dục<a class="l-abs-f" href="tin-giao-duc-dtcate-3369.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Hoạt động - sự kiện<a class="l-abs-f" href="hoat-dong-su-kien-dtcate-2360.html"></a></span>
            <span class="d-flex align-items-center tt-hd-lv2">Tuyển dụng<a class="l-abs-f" href="tuyen-dung-dtcate-3370.html"></a></span>

          </div>
        </div>
        <div class="itnv-hd"><span class="d-flex align-items-center tt-lv1-hd h-100">Li&#234;n hệ<a class="l-abs-f" href="lienhe.html"></a></span></div>
        <div class="d-flex flex-column justify-content-center hd-mn-ct">
          <span>Mạng xã hội:</span>
          <hr class="w-100">
          <div><a href="https://www.facebook.com/quangich.com.vn/" target="_blank" rel="noreferrer"><i class="fa fa-facebook-square fb-nvhd"></i></a></div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup>
const menu = ref([])
const { data, status, error, refresh, clear } = await useFetch('https://67ec945faa794fb3222e241d.mockapi.io/test')
if (error.value) {
  console.error('Error fetching data menu:', error.value);
} else {
  menu.value = data.value;
}
console.log(data.value, status.value, error.value, refresh, clear);
onMounted(() => {
  // Đóng mở lv2 menu mobile
  jQuery(".tt-lv1-hd").click(function () {
    jQuery(jQuery(this).parent().find(".h-lv2-hd")).toggle(100);
  });

  // Đóng mở menu mobile

  function ToggleRight(className, from, to, time) {
    var pathMenu = `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>`,
      pathClose = `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>`

    if (jQuery(className).css("right") != "0px") {
      jQuery(className).animate({ right: from }, time);
      jQuery("body").css("overflow", "hidden");
      jQuery("html").css("overflow", "hidden");
      jQuery(".ic-menu").html(pathClose);
    }
    else {
      jQuery(className).animate({ right: to }, time);
      jQuery("body").css("overflow", "auto");
      jQuery("html").css("overflow", "auto");
      jQuery(".ic-menu").html(pathMenu);
    }

  }
  jQuery(".ic-menu").click(function () {
    ToggleRight(".nv-header", 0, "-100%", 200);
  });

  jQuery(".h-ithpc , .hol-ithpcnd").hover(function () {
    // over
    jQuery(this).find(".slash-hpc").animate({ width: "100%" }, 200);
  }, function () {
    // out
    jQuery(this).find(".slash-hpc").animate({ width: "0" }, 100);
  }
  );
})
</script>