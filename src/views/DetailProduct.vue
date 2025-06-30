<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Product Image Section -->
      <div class="w-full md:w-2/5">
        <div class="bg-orange-200 rounded-lg p-6 relative">
          <div class="flex justify-between items-start">
            <img src="" alt="Bone icon" class="w-8 h-8" />
            <div class="flex flex-col items-end">
              <div class="text-white font-bold text-2xl">DỊCH VỤ</div>
              <div class="text-white font-bold text-4xl">CẠO CHÓ</div>
            </div>
          </div>

          <div class="mt-4 flex justify-center">
            <div class="rounded-full overflow-hidden w-64 h-64 relative">
              <img src="" alt="Dog grooming" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="mt-8 bg-white rounded-lg p-4">
            <div class="text-left">
              <div class="font-bold">1. TẮM CHÓ</div>
              <div class="font-bold">2. SẤY KHÔ</div>
              <div class="font-bold">3. CHO LÔNG</div>
              <div class="font-bold">4. CẮT TỈA</div>
            </div>
            <div class="mt-4">
              <button class="bg-orange-300 text-white font-bold px-6 py-2 rounded-full">ĐẶT LỊCH NGAY</button>
            </div>
          </div>

          <div class="absolute bottom-4 left-4">
            <img src="" alt="Paw icon" class="w-12 h-12 opacity-50" />
          </div>
          <div class="absolute top-4 right-4">
            <img src="" alt="Paw icon" class="w-12 h-12 opacity-50" />
          </div>
        </div>

        <div class="mt-4 flex justify-center space-x-2">
          <button class="p-2 hover:bg-gray-100 rounded">
            <i class="fab fa-facebook-f text-blue-600"></i>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded">
            <i class="fab fa-pinterest text-red-600"></i>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="w-full md:w-3/5">
        <h2 class="text-2xl font-bold">Dịch vụ tắm, cạo và cắt tỉ lông cho Chó VIP</h2>

        <div class="flex items-center text-sm mt-2">
          <span class="text-gray-500">Số lượng</span>
        </div>

        <div class="flex items-center text-sm mt-2">
          <span class="text-gray-500">Thương hiệu:</span>
          <a href="#" class="text-blue-600 ml-2">EGA Pets</a>
          <span class="ml-2 text-gray-500">Mã sản phẩm: Đang cập nhật</span>
        </div>

        <div class="bg-red-600 text-white p-3 mt-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <div>Vừa mở bán</div>
            <div class="flex space-x-1">
              <div class="bg-white text-black px-2 py-1 rounded">07</div>
              <div>:</div>
              <div class="bg-white text-black px-2 py-1 rounded">12</div>
              <div>:</div>
              <div class="bg-white text-black px-2 py-1 rounded">23</div>
            </div>
          </div>
          <div class="text-3xl font-bold mt-2">100.000đ</div>
        </div>

        <div class="bg-green-50 p-4 border border-green-100 rounded-b-lg">
          <div class="flex items-center">
            <i class="fas fa-gift text-green-500 mr-2"></i>
            <span class="font-medium">Quà tặng khuyến mãi</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div class="flex items-start">
              <span class="mr-2">1.</span>
              <div>Nhập mã EGANY thêm 5% đơn hàng</div>
            </div>
            <div class="flex items-start">
              <span class="mr-2">2.</span>
              <div>Giảm giá 10% khi mua từ 5 sản phẩm</div>
            </div>
            <div class="flex items-start">
              <span class="mr-2">3.</span>
              <div>Giảm giá 10% khi mua từ 5 sản phẩm</div>
            </div>
            <div class="flex items-start">
              <span class="mr-2">4.</span>
              <div>Tặng phiếu mua hàng khi mua từ 500k</div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="flex items-center">
            <span class="text-gray-600 mr-4">Mã giảm giá</span>
            <div class="flex space-x-2 overflow-x-auto">
              <div
                class="border border-orange-300 rounded px-2 py-1 text-orange-500 text-sm flex items-center whitespace-nowrap"
              >
                <i class="fas fa-tag mr-1"></i>
                EGA50TH...
              </div>
              <div
                class="border border-orange-300 rounded px-2 py-1 text-orange-500 text-sm flex items-center whitespace-nowrap"
              >
                <i class="fas fa-tag mr-1"></i>
                EGA30TH...
              </div>
              <div
                class="border border-orange-300 rounded px-2 py-1 text-orange-500 text-sm flex items-center whitespace-nowrap"
              >
                <i class="fas fa-tag mr-1"></i>
                FREESHIP...
              </div>
              <button class="text-gray-400">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-2 text-gray-600">Cân nặng</div>
            <div class="flex flex-wrap gap-2">
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                &lt; 3kg
              </button>
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                3 - 5kg
              </button>
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                5 - 10kg
              </button>
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                10 - 20kg
              </button>
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                &gt; 20kg
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-2 text-gray-600">Lông</div>
            <div class="flex flex-wrap gap-2">
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                Ngắn
              </button>
              <button
                class="border border-gray-200 rounded px-4 py-2 text-sm hover:border-orange-500 focus:border-orange-500 focus:outline-none"
              >
                Dài
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-2 text-gray-600">Ngày đến</div>
            <div class="w-full">
              <input
                type="text"
                placeholder="Chọn ngày"
                class="w-full border border-gray-200 rounded px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-2 text-gray-600">Số lượng</div>
            <div class="flex items-center">
              <button class="border border-gray-200 rounded-l px-3 py-1 text-gray-600 hover:bg-gray-100">
                <i class="fas fa-minus"></i>
              </button>
              <input type="text" value="1" class="border-t border-b border-gray-200 w-12 text-center py-1" />
              <button class="border border-gray-200 rounded-r px-3 py-1 text-gray-600 hover:bg-gray-100">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              class="bg-white border border-orange-500 text-orange-500 font-medium rounded-full px-6 py-3 hover:bg-orange-50 flex-1 text-center"
            >
              Mua ngay
            </button>
            <button
              class="bg-orange-500 text-white font-medium rounded-full px-6 py-3 hover:bg-orange-600 flex-1 text-center"
            >
              Thêm vào giỏ
            </button>
          </div>

          <div class="mt-6 space-y-3">
            <div class="flex items-center">
              <i class="fas fa-truck text-gray-400 mr-2"></i>
              <span class="text-gray-600 text-sm">Giao hàng miễn phí trong 24h (chỉ áp dụng khu vực nội thành)</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-credit-card text-gray-400 mr-2"></i>
              <span class="text-gray-600 text-sm">Trả góp lãi suất 0% qua thẻ tín dụng Visa, Master, JCB</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-undo text-gray-400 mr-2"></i>
              <span class="text-gray-600 text-sm">Đổi trả miễn phí trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Information Section -->
    <div class="mt-12">
      <div class="border-b border-gray-200">
        <div class="flex">
          <button class="py-2 px-4 border-b-2 border-orange-500 font-medium text-orange-500">Đặc điểm nổi bật</button>
          <button class="py-2 px-4 text-gray-500 hover:text-gray-700">Đánh giá sản phẩm</button>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-gray-600 mb-4">
          Dịch vụ tắm spa cho chó mèo EGA Pets với nhiều chi nhánh của hãng tại Hà Nội, TPHCM và Đà Nẵng tại đây cung
          cấp phương pháp chăm sóc thú cưng toàn diện từ A đến Z.
        </p>
        <p class="text-gray-600">
          <strong>Trọn gói bao gồm:</strong> tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ lông tai, vệ sinh tai, cắt
          mài móng chân, cạo lông theo yêu cầu. Tất cả đều với mong muốn mang tới cho thú cưng của bạn một cuộc sống
          khỏe mạnh và hạnh phúc nhất.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// You can add any necessary reactive data or methods here
</script>
