import { defineStore } from "pinia";
export const useViewStore = defineStore("view", {
  state: () => ({
    product: [
      {
        title: "Xuất bản tạp chí điện tử",
        description: `Trang web tạp chí chuyên ngành là một nền tảng số hóa hiện đại, được thiết kế 
dành riêng cho việc công bố, quản lý, lưu trữ và lan tỏa các công trình nghiên cứu 
khoa học chuyên sâu trong từng lĩnh vực cụ thể như y dược, công nghệ, giáo dục, 
kỹ thuật, môi trường, kinh tế...một cách chuyên nghiệp, minh bạch và hiện đại.`,
        url: "/magazine",
        image:"https://image.nguyenanh-est.com/website/1746781049875_u0.png"
      },
      {
        title: "Thời khóa biểu VnTimeTable 4.0",
        description: `VnTimeTable là phần mềm chuyên dụng trong việc xếp thời khóa biểu cho các trường phổ thông, được phát triển dựa trên nhiều năm nghiên cứu và ứng dụng thực tiễn.`,
        url: "/vntimetable",
        image:"https://image.nguyenanh-est.com/website/1747038356653_u8.png"
      }
    ]
  }),
  actions: {
  },
  getters: {},
});