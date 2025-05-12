<template>
  <div class="container mx-auto px-4">
    <div class="w-full p-4 md:p-8 grid grid-cols-1 gap-6 md:gap-10">
      <!-- Hero Section -->
      <div class="flex flex-col lg:flex-row gap-6 md:gap-8">
        <SlideWrapper_2D class="flex-1">
          <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <NuxtImg placeholder="/placeholder.png" src="https://image.nguyenanh-est.com/website/1747038356653_u8.png" alt="Giao diện VnTimeTable 4.0" class="w-full h-full object-cover" sizes="sm:100vw md:50vw lg:800px" loading="lazy" />
          </div>
        </SlideWrapper_2D>

        <SlideWrapper_2D reverse class="flex-1 mt-4 md:mt-0">
          <div class="mb-4 md:mb-6">
            <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-blue-800 mb-2">Phần mềm xếp thời khóa biểu VnTimeTable 4.0</h1>
            <div class="h-1 w-16 md:w-20 bg-blue-600 rounded-full"></div>
          </div>
          <div class="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p>VnTimeTable là phần mềm chuyên dụng trong việc xếp thời khóa biểu cho các trường phổ thông, được phát triển dựa trên nhiều năm nghiên cứu và ứng dụng thực tiễn.</p>
            <p class="font-semibold text-blue-700">VnTimeTable 4.0</p>
            <p>Phần mềm hỗ trợ đầy đủ các yêu cầu và ràng buộc thực tế trong công tác xếp thời khóa biểu như: liệt kê tránh xếp, xếp theo nhóm môn học, phòng học bộ môn, các tiết học cố định và liên hệ giữa các lớp học sinh.</p>
          </div>
        </SlideWrapper_2D>
      </div>

      <!-- Benefits Section -->
      <div>
        <div class="text-center mb-8 md:mb-16">
          <h2 class="text-xl md:text-2xl font-bold text-blue-800 mb-3 md:mb-4">Lợi ích VnTimeTable 4.0</h2>
          <div class="w-16 md:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SlideWrapper_2D v-for="(benefit, index) in benefitsData" :key="index" :reverse="index % 2 !== 0" class="bg-white rounded-lg transition-all md:rounded-xl shadow-sm md:shadow-md duration-300 h-full">
            <div class="grid grid-cols-1 lg:grid-cols-3">
              <div class="p-2 flex items-center justify-center">
                <NuxtImg placeholder="/placeholder.png" :src="benefit.image" :alt="`${benefit.title} demo`" class="w-full h-32 md:h-40 object-cover rounded-lg" />
              </div>
              <div class="p-4 md:p-6 col-span-2">
                <div class="flex items-center mb-2 md:mb-4">
                  <h3 class="text-base md:text-lg lg:text-xl font-bold text-gray-800">{{ benefit.title }}</h3>
                </div>
                <p class="text-gray-600 text-sm md:text-base">{{ benefit.description }}</p>
              </div>
            </div>
          </SlideWrapper_2D>
        </div>
      </div>

      <!-- Features Section -->

      <div>
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-blue-800 mb-3 md:mb-4">CÁC TÍNH NĂNG NỔI BẬT</h2>
          <div class="w-20 md:w-24 h-1 md:h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6 items-stretch">
          <SlideWrapper_2D v-for="(feature, index) in features" :key="index" :reverse="index % 2 !== 0" class="w-full md:w-[calc(50%-12px)]">
            <div class="h-full bg-blue-100 rounded-tl-2xl rounded-br-2xl p-3 md:p-4 flex flex-col">
              <div class="flex items-start flex-1">
                <div class="text-blue-800 font-bold text-xl md:text-2xl lg:text-3xl flex-shrink-0 mr-3 md:mr-4">
                  {{ feature.id }}
                </div>
                <p class="text-gray-700 text-sm md:text-base mt-0.5">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </SlideWrapper_2D>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Giao Diện Phần Mềm VnTimeTable 4.0</h2>
          <div class="w-24 h-2 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          <p class="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">Trải nghiệm giao diện trực quan và thân thiện với người dùng</p>
        </div>
        <div class="w-full flex-col text-center py-5">
          <NuxtImg placeholder="/placeholder.png" src="https://image.nguyenanh-est.com/website/1747038712826_u9.png" alt="Giao diện VnTimeTable 4.0" class="w-full h-full object-contain" sizes="sm:100vw md:50vw lg:800px" loading="lazy" />
          <p>Màn hình sau khi đăng nhập</p>
        </div>
        <div class="w-full flex-col text-center py-5">
          <NuxtImg placeholder="/placeholder.png" src="https://image.nguyenanh-est.com/website/1747038973425_u12.png" alt="Giao diện VnTimeTable 4.0" class="w-full h-full object-contain" sizes="sm:100vw md:50vw lg:800px" loading="lazy" />
          <p>Màn hình xếp thời khóa biểu</p>
        </div>
        <div class="w-full flex-col text-center py-5">
          <NuxtImg placeholder="/placeholder.png" src="https://image.nguyenanh-est.com/website/1747039015012_u14.png" alt="Giao diện VnTimeTable 4.0" class="w-full h-full object-contain" sizes="sm:100vw md:50vw lg:800px" loading="lazy" />
          <p>Màn hình tinh chỉnh thời khóa biểu</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const benefitsData = [
  {
    title: "Lợi ích về mặt nghiệp vụ",
    description: `VnTimeTable tự động hóa quy trình xếp thời khóa biểu – một nghiệp vụ phức tạp, đòi hỏi xử lý nhiều ràng buộc thay đổi liên tục, giảm thiểu sai sót thủ công. Công cụ tinh chỉnh trực quan, thao tác đơn giản, hỗ trợ xử lý tiết chưa xếp và điều chỉnh linh hoạt.`,
    image: "https://image.nguyenanh-est.com/website/1747036097761_u66.png",
  },
  {
    title: "Lợi ích về nhà trường",
    description: `Ban lãnh đạo nhà trường dễ dàng theo dõi, quản lý và đánh giá kế hoạch giảng dạy nhờ vào dữ liệu thời khóa biểu được tổng hợp và trực quan hóa. Việc xếp lịch hợp lý giúp tối ưu hóa sử dụng nguồn nhân lực, phòng học và quỹ thời gian, đồng thời hỗ trợ ra quyết định kịp thời khi cần điều chỉnh lịch dạy – học. Phần mềm còn đáp ứng tốt các yêu cầu báo cáo với cơ quan quản lý giáo dục.`,
    image: "https://image.nguyenanh-est.com/website/1747036171005_u68.png",
  },
  {
    title: "Lợi ích về giáo viên, cán bộ giảng dạy",
    description: `Giáo viên được phân công lịch dạy hợp lý, đảm bảo không bị dồn tiết, trùng lịch hay rơi vào các ngày không phù hợp. Nhờ hỗ trợ khai báo lịch nghỉ, tiết tránh cá nhân, phần mềm giúp giáo viên yên tâm công tác, đồng thời thuận tiện theo dõi lịch giảng dạy cá nhân. Cán bộ giảng dạy cũng dễ dàng điều chỉnh, cập nhật hoặc in ấn thời khóa biểu khi có thay đổi đột xuất.`,
    image: "https://image.nguyenanh-est.com/website/1747036377156_u67.png",
  },
  {
    title: "Lợi ích về học sinh, phụ huynh",
    description: `Học sinh được học tập theo thời khóa biểu khoa học, hợp lý, tránh tình trạng dồn quá nhiều tiết học nặng trong cùng một ngày hay bị trống tiết kéo dài gây mệt mỏi và xáo trộn. Thời khóa biểu ổn định, rõ ràng giúp học sinh chủ động hơn trong việc chuẩn bị bài vở và phân bổ thời gian học tập. Phụ huynh cũng dễ dàng nắm bắt lịch học của con để hỗ trợ, đồng hành và sắp xếp lịch sinh hoạt một cách hợp lý.`,
    image: "https://image.nguyenanh-est.com/website/1747036494548_u69.png",
  },
];

const features = [
  { id: "01", description: "Phần mềm hỗ trợ xếp thời khóa biểu tự động cho các trường phổ thông, phù hợp với mọi cấp học, mô hình giáo dục và chương trình đào tạo hiện hành." },
  { id: "02", description: "Xử lý hiệu quả các ràng buộc thực tế: tiết học tránh xếp, học cách ngày, xếp thành cặp, môn học tại phòng chuyên dụng, tiết học cố định..." },
  { id: "03", description: "Cấu hình chi tiết theo từng lớp, môn học, giáo viên và phòng học; cho phép cập nhật linh hoạt theo nhu cầu thực tế." },
  { id: "04", description: "Hỗ trợ phân công chuyên môn theo lớp hoặc theo giáo viên, kiểm soát tình trạng trùng lịch, dồn tiết." },
  { id: "05", description: "Giao diện trực quan, thao tác đơn giản bằng kéo-thả, có chức năng hiển thị màu sắc giúp nhận diện trạng thái tiết học dễ dàng." },
  { id: "06", description: "Cho phép xếp lịch cục bộ theo môn, giáo viên, lớp học hoặc phòng học để xử lý các trường hợp khó xếp." },
  { id: "07", description: "Có thể chỉnh sửa thời khóa biểu sau khi xếp tự động để hoàn thiện theo ý người dùng." },
  { id: "08", description: "Quản lý các tiết nghỉ theo lớp, giáo viên và phòng học nhằm tối ưu hóa việc sử dụng tài nguyên." },
  { id: "09", description: "Hỗ trợ tìm kiếm phòng học thay thế, giáo viên dạy thay và tiết học còn trống trong thời khóa biểu." },
  { id: "10", description: "Cho phép nhập, xuất dữ liệu, đồng bộ với hệ thống quản lý của Phòng Giáo dục & Đào tạo." },
  { id: "11", description: "Hỗ trợ in ấn thời khóa biểu theo giáo viên, lớp học, môn học, xuất file thuận tiện cho quản lý." },
  { id: "12", description: "Hệ thống báo cáo, thống kê phân công giảng dạy chi tiết, phục vụ tốt công tác quản trị và kiểm tra nội bộ." },
];
</script>
