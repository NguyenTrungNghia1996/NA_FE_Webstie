<template>
  <div class="w-screen">
    <div class="w-screen">
      <PageSlidesBanner/>
      <AboutSection v-for="(item, index) in data" :color="true" :key="index" :title="item.title" :description="item.description" :imageSrc="item.imageSrc" :reverse="index % 2 !== 0"/>
    </div>
    <div class="w-screen container mx-auto grid grid-cols-1 gap-3">
      <p class="text-2xl sm:text-3xl font-bold text-black mb-4 text-center">GIAO DIỆN PHẦN MỀM</p>
      <NuxtImg class="mx-auto" src="https://image.nguyenanh-est.com/website/1746783633753_u12.png" placeholder="/placeholder.png" />
      <p class="text-black text-center text-sm">Giao diện bạn đọc</p>
      <NuxtImg class="mx-auto" src="https://image.nguyenanh-est.com/website/1746784103883_u14.png" placeholder="/placeholder.png" />
      <p class="text-black text-center text-sm">Bảng điều khiển</p>
    </div>
    
  </div>
</template>
<script setup>
const data = ref([
  {
    title: "Giới thiệu chung",
    description: "<p>Hệ thống xuất bản tạp chí điện tử là một nền tảng số hóa hiện đại, được thiết kế dành riêng cho việc công bố, quản lý, lưu trữ và lan tỏa các công trình nghiên cứu khoa học chuyên sâu trong từng lĩnh vực cụ thể như y dược, công nghệ, giáo dục, kỹ thuật, môi trường, kinh tế...một cách chuyên nghiệp, minh bạch và hiện đại.</p><p>Với giao diện thân thiện, khả năng tích hợp chuẩn quốc tế và hỗ trợ truy cập mở, đây là công cụ thiết yếu góp phần nâng cao chất lượng học thuật, mở rộng phạm vi ảnh hưởng của tạp chí, và kết nối mạng lưới tri thức khoa học trong nước và toàn cầu.</p>",
    imageSrc: "https://image.nguyenanh-est.com/website/1746781049875_u0.png",
    reverse: false,
  },
  {
    title: "Lợi ích của hệ thống Xuất bản tạp chí điện tử",
    description: `<ol>
  <li>Cung cấp nền tảng xuất bản điện tử cho tạp chí chuyên ngành theo chuẩn quốc tế.</li>
  <li>Hỗ trợ quy trình nộp bài, phản biện, biên tập và xuất bản hoàn toàn trực tuyến, tiết kiệm thời gian và chi phí.</li>
  <li>Lưu trữ và tra cứu bài viết khoa học một cách nhanh chóng, chính xác và thân thiện với người dùng.</li>
  <li>Tăng tính minh bạch và khả năng tiếp cận đối với cộng đồng nghiên cứu trong nước và quốc tế.</li>
  <li>Thúc đẩy chỉ mục hóa và tích hợp với hệ thống học thuật toàn cầu như Google Scholar, Crossref, ...</li>
</ol>`,
    imageSrc: "https://image.nguyenanh-est.com/website/1746781568419_u5.png",
    reverse: false,
  },
  {
    title: "Các chức năng nổi bật",
    description: `<ol>
  <li>Hệ thống tích hợp hoàn chỉnh quy trình công bố bài viết, từ việc nộp bài, phản biện, biên tập đến xuất bản trực tuyến theo tiêu chuẩn quốc tế.</li>
  <li>Quản lý các chuyên mục bài viết theo từng số, tháng, năm, đảm bảo sắp xếp hợp lý và dễ dàng tìm kiếm.</li>
  <li>Cung cấp tính năng để người dùng chủ động đăng ký mã DOI cho từng bài báo hoặc số báo, hỗ trợ việc chuẩn hóa và trích dẫn quốc tế.</li>
  <li>Cho phép thêm, sửa, xóa các thông báo một cách nhanh chóng, phục vụ công tác truyền thông nội bộ hoặc đối ngoại.</li>
  <li>Người dùng có thể dễ dàng thay đổi, chỉnh sửa các nội dung hiển thị trên website theo nhu cầu.</li>
  <li>Cho phép cấu hình linh hoạt các bước trong quy trình xử lý bài viết từ nộp bài, phản biện, biên tập, xuất bản, phục vụ từng đơn vị.</li>
  <li>Cho phép thêm, sửa, xóa, cập nhật bài viết một cách nhanh chóng và dễ dàng.</li>
  <li>Hệ thống quản lý biên bản đánh giá và trao đổi giữa tác giả và biên tập viên đảm bảo chất lượng bài viết trước khi xuất bản.</li>
  <li>Hỗ trợ tìm kiếm bài viết theo tháng, năm, thể loại, từ khóa hoặc chuyên mục, giúp người dùng dễ dàng tìm thấy thông tin cần thiết.</li>
  <li>Cho phép người dùng tải bài viết về máy dưới định dạng PDF hoặc Word, lưu trữ bài viết yêu thích để đọc lại sau.</li>
  <li>Hệ thống cung cấp thống kê chi tiết về số lượt truy cập, số độc giả, giúp quản trị viên theo dõi hiệu quả của từng bài viết.</li>
  <li>Giao diện quản trị dễ nhìn, dễ sử dụng, cho phép phân quyền rõ ràng về đăng tạo, sửa, xóa, sắp xếp các bài viết và chuyên mục.</li>
  <li>Hệ thống bảo mật thông tin bài viết và dữ liệu người dùng, đảm bảo an toàn tuyệt đối cho mọi giao dịch và thông tin nội bộ.</li>
</ol>
`,
    imageSrc: "https://image.nguyenanh-est.com/website/1746781603678_u10.png",
    reverse: false,
  },
]);
</script>
<style scoped></style>
