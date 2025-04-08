<template>
  <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl p-6 md:p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute -top-24 -right-24 h-64 w-64 bg-indigo-100/40 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -left-24 h-64 w-64 bg-purple-100/40 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

    <!-- 页面标题和工具栏 -->
    <div class="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-sm">
          <ClockIcon class="h-6 w-6" />
        </div>
        <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">测试历史记录</h1>
      </div>

      <!-- 搜索和过滤工具栏 -->
      <div class="flex items-center space-x-3">
        <div class="relative flex-grow">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索历史..."
            class="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>

        <button
          v-if="history.length > 0"
          @click="confirmClearAll"
          class="p-2.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          title="清空所有记录"
        >
          <TrashIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- 统计信息卡片 -->
    <div v-if="history.length > 0" class="relative z-10 mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center">
        <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <ChartBarIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">总记录数</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ history.length }}</div>
        </div>
      </div>

      <div class="flex space-x-6">
        <div class="flex flex-col">
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">成功</span>
          </div>
          <div class="text-xl font-bold text-green-600 dark:text-green-400 mt-1">{{ successCount }}</div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">失败</span>
          </div>
          <div class="text-xl font-bold text-red-600 dark:text-red-400 mt-1">{{ history.length - successCount }}</div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="history.length === 0" class="relative z-10 flex flex-col items-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="h-20 w-20 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
        <DocumentIcon class="h-10 w-10 text-indigo-400 dark:text-indigo-300" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">暂无测试历史记录</h3>
      <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        运行越狱测试后，所有测试结果都会显示在这里，帮助您追踪和比较不同测试方法的效果。
      </p>
      <router-link
        to="/test"
        class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <BeakerIcon class="h-5 w-5 mr-2" />
        开始测试
      </router-link>
    </div>

    <!-- 过滤后无结果 -->
    <div v-else-if="filteredHistory.length === 0" class="relative z-10 flex flex-col items-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="h-16 w-16 flex items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/30 mb-4">
        <FaceFrownIcon class="h-8 w-8 text-amber-400 dark:text-amber-300" />
      </div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">未找到匹配的记录</h3>
      <p class="text-gray-500 dark:text-gray-400 text-center mb-4">
        没有与"{{ searchQuery }}"相关的测试记录
      </p>
      <button
        @click="clearSearch"
        class="inline-flex items-center px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 rounded-lg transition-all"
      >
        <XMarkIcon class="h-4 w-4 mr-1.5" />
        清除搜索
      </button>
    </div>

    <!-- 历史记录列表 -->
    <div v-else class="relative z-10 space-y-4">
      <div v-for="(item, index) in paginatedHistory" :key="index"
           class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 overflow-hidden group">
        <div class="p-4 sm:p-5">
          <!-- 记录头部信息 -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center font-medium text-gray-800 dark:text-gray-200 mb-2">
                <CalendarIcon class="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                {{ formatDatetime(item.timestamp) }}
              </div>
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CpuChipIcon class="h-4 w-4 mr-1.5" />
                {{ item.model }}
              </div>
            </div>
            <div>
              <span :class="[
                'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
                item.success
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800/50'
              ]">
                <component
                  :is="item.success ? CheckCircleIcon : XCircleIcon"
                  class="h-3.5 w-3.5 mr-1.5"
                />
                {{ item.success ? '测试成功' : '测试失败' }}
              </span>
            </div>
          </div>

          <!-- 提示内容预览 -->
          <div class="mb-4 p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <div class="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium mb-1.5">
              <CommandLineIcon class="h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400" />
              提示内容:
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ item.prompt }}</div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-2">
            <button
              @click="viewDetails(item)"
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 rounded-lg transition-all"
            >
              <EyeIcon class="h-4 w-4 mr-1.5" />
              查看详情
            </button>
            <button
              @click="confirmDelete(index)"
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800/40 rounded-lg transition-all"
            >
              <TrashIcon class="h-4 w-4 mr-1.5" />
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center relative z-10">
      <nav class="inline-flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          :class="[
            'p-2 border-r border-gray-100 dark:border-gray-700 transition-colors',
            currentPage === 1
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          <ChevronLeftIcon class="h-5 w-5" />
        </button>

        <button
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors',
            currentPage === page
              ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          {{ page }}
        </button>

        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          :class="[
            'p-2 border-l border-gray-100 dark:border-gray-700 transition-colors',
            currentPage === totalPages
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          <ChevronRightIcon class="h-5 w-5" />
        </button>
      </nav>
    </div>

    <!-- 详情模态框 - 优化设计 -->
    <Transition name="modal">
      <div v-if="selectedItem" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all"
          @click.stop
        >
          <!-- 模态框标题栏 -->
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/50 dark:to-indigo-800/30 border-b border-indigo-100 dark:border-indigo-800/50 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <DocumentTextIcon class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              测试详情
            </h3>
            <button
              @click="selectedItem = null"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="p-6 overflow-y-auto custom-scrollbar" style="max-height: calc(90vh - 4rem);">
            <!-- 测试信息卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 flex items-start">
                <div class="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0">
                  <CpuChipIcon class="h-5 w-5" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">测试模型</div>
                  <div class="text-base font-semibold text-gray-900 dark:text-white">{{ selectedItem.model }}</div>
                </div>
              </div>

              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 flex items-start">
                <div class="h-9 w-9 flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0">
                  <CalendarIcon class="h-5 w-5" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">测试时间</div>
                  <div class="text-base font-semibold text-gray-900 dark:text-white">{{ formatDatetime(selectedItem.timestamp) }}</div>
                </div>
              </div>

              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 flex items-start">
                <div class="h-9 w-9 flex items-center justify-center rounded-lg"
                     :class="selectedItem.success ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'"
                     style="margin-right: 0.75rem;"
                >
                  <component :is="selectedItem.success ? CheckCircleIcon : XCircleIcon" class="h-5 w-5" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">测试结果</div>
                  <div class="text-base font-semibold"
                       :class="selectedItem.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                  >
                    {{ selectedItem.success ? '测试成功' : '测试失败' }}
                  </div>
                </div>
              </div>

              <div v-if="selectedItem.metrics" class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 flex items-start">
                <div class="h-9 w-9 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0">
                  <CalculatorIcon class="h-5 w-5" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Token数量</div>
                  <div class="text-base font-semibold text-gray-900 dark:text-white">{{ selectedItem.metrics.tokenCount || '未知' }}</div>
                </div>
              </div>
            </div>

            <!-- 提示内容 -->
            <div class="mb-6">
              <div class="flex items-center mb-3">
                <div class="h-6 w-6 flex items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-2">
                  <CommandLineIcon class="h-4 w-4" />
                </div>
                <h4 class="text-base font-semibold text-gray-800 dark:text-white">提示内容</h4>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 max-h-60 overflow-y-auto custom-scrollbar">
                {{ selectedItem.prompt }}
              </div>
            </div>

            <!-- 响应内容 -->
            <div>
              <div class="flex items-center mb-3">
                <div class="h-6 w-6 flex items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-2">
                  <ChatBubbleLeftRightIcon class="h-4 w-4" />
                </div>
                <h4 class="text-base font-semibold text-gray-800 dark:text-white">响应内容</h4>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 max-h-80 overflow-y-auto custom-scrollbar">
                {{ selectedItem.response }}
              </div>
            </div>
          </div>

          <!-- 模态框底部操作区 -->
          <div class="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button
              @click="selectedItem = null"
              class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 删除确认模态框 - 优化设计 -->
    <Transition name="modal">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700"
          @click.stop
        >
          <div class="flex items-center text-red-600 dark:text-red-500 mb-4">
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 mr-3">
              <ExclamationTriangleIcon class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-semibold">{{ isDeleteAll ? '清空所有记录' : '确认删除' }}</h3>
          </div>

          <p class="text-gray-600 dark:text-gray-300 ml-13 mb-6">
            {{ isDeleteAll ? '确定要清空所有测试历史记录吗？此操作无法撤销。' : '确定要删除这条测试记录吗？此操作无法撤销。' }}
          </p>

          <div class="flex justify-end space-x-3">
            <button
              @click="cancelDelete"
              class="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800 dark:focus:ring-gray-700"
            >
              取消
            </button>
            <button
              @click="executeDelete"
              class="px-4 py-2.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {{ isDeleteAll ? '清空全部' : '删除' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import {
  ClockIcon, CpuChipIcon, EyeIcon, TrashIcon, CommandLineIcon,
  CheckCircleIcon, XCircleIcon, DocumentIcon, BeakerIcon,
  MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon,
  XMarkIcon, CalendarIcon, ExclamationTriangleIcon, FaceFrownIcon,
  DocumentTextIcon, ChatBubbleLeftRightIcon, FlagIcon, CalculatorIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline';

const history = ref([]);
const selectedItem = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;
const showDeleteModal = ref(false);
const deleteIndex = ref(-1);
const isDeleteAll = ref(false);

// 成功测试数量
const successCount = computed(() => {
  return history.value.filter(item => item.success).length;
});

// 搜索过滤后的历史记录
const filteredHistory = computed(() => {
  if (!searchQuery.value.trim()) {
    return history.value;
  }

  const query = searchQuery.value.toLowerCase();
  return history.value.filter(item =>
    (item.prompt && item.prompt.toLowerCase().includes(query)) ||
    (item.model && item.model.toLowerCase().includes(query)) ||
    (item.response && item.response.toLowerCase().includes(query))
  );
});

// 总页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredHistory.value.length / itemsPerPage));
});

// 分页后的历史记录
const paginatedHistory = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredHistory.value.slice(startIndex, endIndex);
});

// 显示哪些页码按钮
const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages.value <= maxPagesToShow) {
    // 如果总页数较少，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 否则显示当前页附近的页码
    let startPage = Math.max(1, currentPage.value - 2);
    let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1);

    // 调整起始页码，确保显示固定数量的页码
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// 当筛选条件更改时重置页码
watch([searchQuery], () => {
  currentPage.value = 1;
});

// 阻止模态框内容区域的点击事件冒泡
const preventPropagation = (event) => {
  event.stopPropagation();
};

onMounted(() => {
  loadHistory();
});

// 加载历史记录
function loadHistory() {
  const savedHistory = localStorage.getItem('testHistory');
  if (savedHistory) {
    try {
      history.value = JSON.parse(savedHistory);
      // 按时间倒序排列，最新的在前面
      history.value.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Failed to parse history:', error);
      history.value = [];
    }
  }
}

// 格式化日期时间
function formatDatetime(timestamp) {
  if (!timestamp) return '未知时间';

  try {
    const date = new Date(timestamp);

    // 检查是否为有效日期
    if (isNaN(date.getTime())) {
      return '无效日期';
    }

    // 使用更人性化的格式
    const now = new Date();
    const diff = now - date;
    const dayInMs = 86400000; // 24 * 60 * 60 * 1000

    // 当天的记录显示时间
    if (diff < dayInMs && now.getDate() === date.getDate()) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }

    // 昨天的记录
    if (diff < 2 * dayInMs && now.getDate() - date.getDate() <= 1) {
      return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }

    // 一周内的记录
    if (diff < 7 * dayInMs) {
      const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      return `${days[date.getDay()]} ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }

    // 超过一周的记录
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '格式错误';
  }
}

// 查看详情
function viewDetails(item) {
  selectedItem.value = item;
}

// 确认删除单个记录
function confirmDelete(index) {
  deleteIndex.value = index;
  isDeleteAll.value = false;
  showDeleteModal.value = true;
}

// 确认清空所有记录
function confirmClearAll() {
  isDeleteAll.value = true;
  showDeleteModal.value = true;
}

// 执行删除操作
function executeDelete() {
  if (isDeleteAll.value) {
    history.value = [];
    localStorage.removeItem('testHistory');
  } else if (deleteIndex.value >= 0) {
    const itemToDelete = paginatedHistory.value[deleteIndex.value];
    const realIndex = history.value.findIndex(item =>
      item.timestamp === itemToDelete.timestamp &&
      item.prompt === itemToDelete.prompt
    );

    if (realIndex !== -1) {
      history.value.splice(realIndex, 1);
      localStorage.setItem('testHistory', JSON.stringify(history.value));
    }

    // 如果当前页已空且不是第一页，则返回上一页
    if (paginatedHistory.value.length === 1 && currentPage.value > 1) {
      currentPage.value--;
    }
  }

  showDeleteModal.value = false;
}

// 取消删除
function cancelDelete() {
  showDeleteModal.value = false;
  deleteIndex.value = -1;
}

// 清除搜索
function clearSearch() {
  searchQuery.value = '';
}
</script>

<style scoped>
/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* 自定义滚动条 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

/* 左侧边距辅助类 */
.ml-13 {
  margin-left: 3.25rem;
}

/* 行显示限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 表项悬停效果 */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
