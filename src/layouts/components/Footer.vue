<template>
  <footer class="bg-[#f6f6f6] pt-10 pb-12 mt-10">
    <div
      class="container px-3 sm:px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-5 md:gap-10"
    >
      <div>
        <RouterLink to="/">
          <div class="flex items-center gap-2 cursor-pointer">
            <img src="@/assets/logo.svg" alt="Logo Pet Shop" width="40" />
            <span class="font-black xl:text-3xl sm:text-xl text-primary whitespace-nowrap">PET SHOP</span>
          </div>
        </RouterLink>
        <div>
          <h3 class="font-semibold my-2">Cửa hàng cho thú cưng</h3>
          <p>Chuyên cung cấp đồ dùng, thức ăn và phụ kiện cho thú cưng, cam kết chất lượng sản phẩm tốt nhất</p>
          <p class="my-2">Mã số thuế: 12345678910</p>
          <div class="flex items-center">
            <Icon icon="material-symbols-light:location-on-outline-rounded" class="size-5 font-bold -ml-1" />
            Địa chỉ
          </div>
          <p class="font-semibold mb-2">Minh Khai, Hà Nội</p>
          <div class="flex items-center justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center">
                <Icon icon="material-symbols-light:phone-in-talk-outline" class="size-5 font-bold -ml-1 mr-1" />
                Hotline
              </div>
              <p class="font-semibold">19001009</p>
            </div>
            <div>
              <div class="flex items-center">
                <Icon icon="material-symbols-light:attach-email-outline" class="size-5 font-bold mr-1" />
                <div>Email</div>
              </div>
              <p class="font-semibold">support@pta.vn</p>
            </div>
          </div>

          <h3 class="font-semibold mb-2">Mạng xã hội</h3>
          <div class="flex justify-between items-center h-9">
            <div class="p-1 border border-neutral-300 max-w-full w-9 justify-center h-full rounded flex items-center">
              <img
                src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/facebook.png?1730347951357"
                alt="facebook"
                width="20"
                height="20"
              />
            </div>
            <div class="p-1 border border-neutral-300 max-w-full w-9 justify-center h-full rounded flex items-center">
              <img
                src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/youtube.png?1730347951357"
                alt="youtube"
                width="20"
                height="20"
              />
            </div>

            <div class="p-1 border border-neutral-300 max-w-full w-9 justify-center h-full rounded flex items-center">
              <img
                src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/tiktok.png?1730347951357"
                alt="tiktok"
                width="20"
                height="20"
              />
            </div>

            <div class="p-1 border border-neutral-300 max-w-full w-9 justify-center h-full rounded flex items-center">
              <img
                src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/instagram.png?1730347951357"
                alt="instagram"
                width="20"
                height="20"
              />
            </div>

            <div class="p-1 border border-neutral-300 max-w-full w-9 justify-center h-full rounded flex items-center">
              <img
                src="https://bizweb.dktcdn.net/100/527/383/themes/964940/assets/zalo.png?1730347951357"
                alt="zalo"
                width="20"
                height="20"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Hỗ trợ khách hàng</h3>
        <ul class="flex flex-col gap-2">
          <li>Câu hỏi thường gặp</li>
          <li>Hệ thống cửa hàng</li>
          <li>Tìm kiếm</li>
          <li>Giới thiệu</li>
          <li>Liên hệ</li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Chính sách</h3>
        <ul class="flex flex-col gap-2">
          <li>Chính sách đổi trả</li>
          <li>Chính sách bảo mật</li>
          <li>Điều khoản dịch vụ</li>
          <li>Chương trình cộng tác viên</li>
        </ul>

        <h3 class="font-semibold mb-2 mt-6">Tổng đài hỗ trợ</h3>
        <ul class="flex flex-col gap-2">
          <li>Gọi mua hàng: 0999999999 (8h-20h)</li>
          <li>Gọi bảo hành: 19009999 (8h-20h)</li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Đăng ký nhận ưu đãi</h3>
        <p>
          Bạn muốn nhận khuyến mãi đặc biệt? Đăng kí tham gia ngay cộng động hơn 68.000+ người theo dõi của chúng tôi để
          cập nhật khuyến mãi ngay lập tức
        </p>

        <div class="my-3 w-full flex h-10">
          <input
            type="text"
            placeholder="Email của bạn..."
            class="py-2 px-3 rounded-tl-full rounded-bl-full border border-primary outline-none flex-1"
          />
          <button
            class="bg-primary text-white font-medium py-2 px-4 rounded-tr-full rounded-br-full border border-primary hover:opacity-80"
          >
            Submit
          </button>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold mb-2">PHƯƠNG THỨC THANH TOÁN</h3>
          <img
            src="https://bizweb.dktcdn.net/thumb/grande/100/527/383/themes/964940/assets/footer-trustbadge.png?1730347951357"
            alt="method_payment"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
