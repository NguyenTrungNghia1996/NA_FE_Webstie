<template>
    <div>
        <header class="w-100 d-none d-lg-flex">
            <div class="container d-md-flex justify-content-between align-items-md-center h-100">
                <!-- <a href="index.html"><img src="htmlib/img/Home/Group%202773722.svg" alt="logo"></a> -->
                <div class="d-md-flex flex-row justify-content-md-end align-items-md-center w-100 h-100">
                    <div class="h-100 h-ithpc">
                        <a href="#"><span class="d-md-flex align-items-md-center tit-h-pc h-100">Giới thiệu</span></a>
                        <div class=" slash-hpc"></div>
                        <div class="content-dropdownhdpc" style="display: none;">
                            <ul class="list-unstyled m-0">
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Về ch&#250;ng t&#244;i<a class="l-abs-f" href="gioithieucongty.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">C&#225;c giải thưởng<a class="l-abs-f" href="cac-giai-thuong-tap-doan-cong-nghe-quang-ich-duoc-trao-tang-dtnewtt-26106.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Thư viện h&#236;nh ảnh<a class="l-abs-f" href="thuvienhinhanh.html"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div v-for="n in 3" :key="n" class="h-100 h-ithpc">
                        <a href="sanpham.html"><span class="d-md-flex align-items-md-center tit-h-pc h-100">Sản phẩm dịch vụ</span></a>
                        <div class=" slash-hpc"></div>
                        <div class="content-dropdownhdpc" style="display: none;">
                            <ul class="list-unstyled m-0">
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Hệ thống th&#244;ng tin quản l&#253; gi&#225;o dục<a class="l-abs-f" href="quanlygiaoduc.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc"> Ứng dụng eNetViet<a class="l-abs-f" href="eNetviet.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Thư Viện Điện Tử VIELIB<a class="l-abs-f" href="thuviendientu.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc"> Cổng th&#244;ng tin điện tử V-Portal<a class="l-abs-f" href="congthongtindientu.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Hệ thống Học v&#224; thi trực tuyến V-Study<a class="l-abs-f" href="hocvathitructuyen.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Thẻ th&#244;ng minh E-CarD<a class="l-abs-f" href="thediemdanhthongminh.html"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="h-100 hol-ithpcnd">
                        <div class="slash-hpc"></div><span class="d-md-flex align-items-md-center tit-h-pc h-100">Kinh nghiệm triển khai<a class="l-abs-f" href="kinh-nghiem-trien-khai-dtcate-2351.html"></a></span>
                    </div>
                    <div class="h-100 h-ithpc">

                        <a href="tin-tuc-dtcate-2332.html"><span class="d-md-flex align-items-md-center tit-h-pc h-100">Tin tức</span></a>


                        <div class=" slash-hpc"></div>
                        <div class="content-dropdownhdpc" style="display: none;">
                            <ul class="list-unstyled m-0">
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Tin gi&#225;o dục<a class="l-abs-f" href="tin-giao-duc-dtcate-3369.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Hoạt động - sự kiện<a class="l-abs-f" href="hoat-dong-su-kien-dtcate-2360.html"></a></li>
                                <li class="text-nowrap d-md-flex align-items-md-center it-lv2hdpc">Tuyển dụng<a class="l-abs-f" href="tuyen-dung-dtcate-3370.html"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="h-100 hol-ithpcnd">
                        <div class="slash-hpc"></div><span class="d-md-flex align-items-md-center tit-h-pc h-100">Li&#234;n hệ<a class="l-abs-f" href="lienhe.html"></a></span>
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
    </div>
</template>
<script setup>

onMounted(() => {
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
