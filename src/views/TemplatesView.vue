<template>
  <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl p-6 md:p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute -top-24 -right-24 h-64 w-64 bg-indigo-100/40 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-100/40 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>

    <!-- 头部区域 -->
    <div class="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div class="flex items-center">
        <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-sm">
          <DocumentDuplicateIcon class="h-6 w-6" />
        </div>
        <h1 class="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">对话模板库</h1>
      </div>

      <div class="flex flex-wrap gap-3">
        <label
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
          <ArrowUpTrayIcon class="h-5 w-5 mr-1.5 text-indigo-500" />
          导入单个模板
          <input type="file" accept=".json" class="hidden" @change="handleSingleTemplateUpload" ref="singleFileInput" />
        </label>

        <button
          @click="importTemplateLibrary"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowUpTrayIcon class="h-5 w-5 mr-1.5 text-indigo-500" />
          导入模板库
        </button>

        <button
          @click="showGitHubImportModal = true"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <svg class="h-5 w-5 mr-1.5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          从 GitHub 获取
        </button>

        <button
          @click="exportTemplateLibrary"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-all duration-200"
        >
          <ArrowDownTrayIcon class="h-5 w-5 mr-1.5" />
          导出模板库
        </button>
      </div>
    </div>

    <!-- 搜索和分类筛选区域 -->
    <div class="relative z-10 mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-grow">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索模板内容..."
            class="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="flex-shrink-0 w-full md:w-64">
          <select
            v-model="selectedCategory"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
          >
            <option value="">所有分类</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredTemplates.length === 0" class="relative z-10 flex flex-col items-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="h-20 w-20 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
        <DocumentIcon class="h-10 w-10 text-indigo-400 dark:text-indigo-300" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {{ searchQuery || selectedCategory ? '未找到匹配的模板' : '暂无模板' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {{ searchQuery || selectedCategory ? '尝试使用不同的搜索词或清除筛选条件' : '导入模板或从 GitHub 获取模板库' }}
      </p>
      <div class="flex flex-wrap gap-3">
        <button
          v-if="searchQuery || selectedCategory"
          @click="clearFilters"
          class="inline-flex items-center px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 rounded-lg transition-all"
        >
          <XMarkIcon class="h-4 w-4 mr-1.5" />
          清除筛选条件
        </button>
        <button
          v-else
          @click="showGitHubImportModal = true"
          class="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          从 GitHub 获取模板
        </button>
      </div>
    </div>

    <!-- 模板网格 -->
    <div v-else class="relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          v-for="(template, index) in filteredTemplates"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-200 overflow-hidden group"
        >
          <div class="p-5 flex flex-col h-full">
            <!-- 头部和操作按钮 -->
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {{ template.title || `模板 #${index + 1}` }}
                </h3>
                <div v-if="template.category" class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                    {{ template.category }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="exportSingleTemplate(template, index)"
                  class="p-1.5 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  title="导出此模板"
                >
                  <ArrowDownTrayIcon class="h-5 w-5" />
                </button>
                <button
                  @click="confirmDeleteTemplate(index)"
                  class="p-1.5 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="删除模板"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>

            <!-- 角色预览 -->
            <div class="mt-4 space-y-2">
              <div v-for="(message, msgIndex) in template.messages.slice(0, 3)" :key="msgIndex"
                   class="flex items-center px-3 py-2 rounded-lg text-xs"
                   :class="{
                    'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300': message.role === 'system',
                    'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300': message.role === 'user',
                    'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300': message.role === 'assistant'
                  }">
                <div class="h-5 w-5 flex items-center justify-center rounded-full mr-2"
                     :class="{
                       'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400': message.role === 'system',
                       'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400': message.role === 'user',
                       'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400': message.role === 'assistant'
                     }">
                  <ServerIcon v-if="message.role === 'system'" class="h-3 w-3" />
                  <UserIcon v-else-if="message.role === 'user'" class="h-3 w-3" />
                  <SparklesIcon v-else class="h-3 w-3" />
                </div>
                <div class="truncate">{{ message.content.substring(0, 60) + (message.content.length > 60 ? '...' : '') }}</div>
              </div>
              <div v-if="template.messages.length > 3" class="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                还有 {{ template.messages.length - 3 }} 条消息...
              </div>
            </div>

            <!-- 底部 -->
            <div class="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-4">
              <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <ChatBubbleLeftRightIcon class="h-3.5 w-3.5 mr-1" />
                {{ template.messages.length }} 条消息
              </div>
              <div v-if="template.model" class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <CpuChipIcon class="h-3.5 w-3.5 mr-1" />
                {{ template.model }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 信息栏 -->
      <div class="mt-5 text-sm text-gray-500 dark:text-gray-400">
        显示 {{ filteredTemplates.length }} 个模板
        <span v-if="filteredTemplates.length !== templates.length">
          (共 {{ templates.length }} 个)
        </span>
      </div>
    </div>

    <!-- 文件上传输入 -->
    <input type="file" accept=".json" class="hidden" @change="handleFileUpload" ref="fileInput" />
    <input type="file" accept=".json" class="hidden" @change="handleSingleTemplateUpload" ref="singleFileInput" />

    <!-- GitHub导入模态框 -->
    <Transition name="modal">
      <div v-if="showGitHubImportModal" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          @click.stop
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div class="flex items-center text-indigo-600 dark:text-indigo-400 mb-5">
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mr-3 flex-shrink-0">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold">从 GitHub 导入模板</h3>
          </div>

          <div v-if="isLoadingGitHubData" class="flex flex-col items-center py-6">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-300">正在获取模板分类...</p>
          </div>

          <div v-else-if="githubCategories.length === 0" class="py-6 text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-4">无法获取模板分类，请稍后再试</p>
            <button
              @click="fetchGitHubCategories"
              class="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 rounded-lg transition-all"
            >
              <ArrowPathIcon class="h-4 w-4 mr-1.5 inline" />
              重试
            </button>
          </div>

          <div v-else class="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="category in githubCategories" :key="category.name" class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-800 dark:text-white flex items-center">
                  <FolderIcon class="h-4 w-4 mr-1.5 text-indigo-500" />
                  {{ category.name }}
                </h4>
                <button
                  @click="importAllCategoryTemplates(category)"
                  class="text-xs px-2 py-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors"
                >
                  全部导入
                </button>
              </div>
              <div class="space-y-2">
                <div v-for="file in category.files" :key="file.name"
                     class="flex items-center justify-between py-2 px-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 bg-white dark:bg-gray-800 shadow-sm transition-all"
                >
                  <div class="flex items-center">
                    <DocumentTextIcon class="h-4 w-4 text-indigo-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ file.name.replace('.json', '') }}</span>
                  </div>
                  <button
                    @click="importGitHubTemplate(category.name, file.name)"
                    class="text-xs px-2 py-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors"
                  >
                    导入
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              @click="showGitHubImportModal = false"
              class="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 删除确认模态框 -->
    <Transition name="modal">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          @click.stop
          class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700"
        >
          <div class="flex items-center text-red-600 dark:text-red-500 mb-4">
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 mr-3 flex-shrink-0">
              <ExclamationTriangleIcon class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-semibold">确认删除</h3>
          </div>

          <p class="text-gray-600 dark:text-gray-300 ml-13 mb-2">
            确定要删除"{{ templates[deleteIndex]?.title || `模板 #${deleteIndex + 1}` }}"吗？
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 ml-13 mb-6">
            此操作无法撤销，删除后模板将永久消失。
          </p>

          <div class="flex justify-end space-x-3">
            <button
              @click="cancelDelete"
              class="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              取消
            </button>
            <button
              @click="executeDelete"
              class="px-4 py-2.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
            >
              <TrashIcon class="h-4 w-4 mr-1.5" />
              删除
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 通知提示框 -->
    <Transition name="toast">
      <div
        v-if="notification.show"
        class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-4 max-w-sm flex items-start z-50"
      >
        <div class="flex-shrink-0 mr-3">
          <div :class="[
            'h-8 w-8 flex items-center justify-center rounded-full',
            notification.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400'
          ]">
            <CheckCircleIcon v-if="notification.type === 'success'" class="h-5 w-5" />
            <ExclamationCircleIcon v-else class="h-5 w-5" />
          </div>
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  MagnifyingGlassIcon, DocumentDuplicateIcon, TrashIcon,
  DocumentIcon, XMarkIcon, ArrowUpTrayIcon, ArrowDownTrayIcon,
  ExclamationTriangleIcon, CheckCircleIcon, ExclamationCircleIcon,
  UserIcon, ServerIcon, SparklesIcon, ChatBubbleLeftRightIcon,
  CpuChipIcon, FolderIcon, DocumentTextIcon, ArrowPathIcon
} from '@heroicons/vue/24/outline';

const searchQuery = ref('');
const selectedCategory = ref('');
const showDeleteModal = ref(false);
const deleteIndex = ref(-1);
const fileInput = ref(null);
const singleFileInput = ref(null);
const showGitHubImportModal = ref(false);
const isLoadingGitHubData = ref(false);
const githubCategories = ref([]);

// GitHub仓库信息
const GITHUB_REPO = 'GeetoRinku/SoulTraceTemplate';
const GITHUB_BRANCH = 'main';

// 通知提示
const notification = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
});

// 模板数据 - 没有预设模板
const templates = ref([]);

// 所有可用的分类
const categories = computed(() => {
  const categorySet = new Set();
  templates.value.forEach(template => {
    if (template.category) {
      categorySet.add(template.category);
    }
  });
  return Array.from(categorySet).sort();
});

// 根据搜索和分类筛选模板
const filteredTemplates = computed(() => {
  let result = templates.value;

  // 筛选分类
  if (selectedCategory.value) {
    result = result.filter(template => template.category === selectedCategory.value);
  }

  // 搜索
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(template =>
      (template.title && template.title.toLowerCase().includes(query)) ||
      template.messages.some(msg =>
        msg.content.toLowerCase().includes(query) ||
        msg.role.toLowerCase().includes(query)
      ) ||
      (template.model && template.model.toLowerCase().includes(query)) ||
      (template.category && template.category.toLowerCase().includes(query))
    );
  }

  return result;
});

// 清除筛选条件
function clearFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
}

// 加载已保存的模板
onMounted(() => {
  const savedTemplates = localStorage.getItem('conversationTemplates');
  if (savedTemplates) {
    try {
      templates.value = JSON.parse(savedTemplates);
    } catch (error) {
      console.error('Failed to parse templates:', error);
      templates.value = [];
    }
  }
});

// 导入模板库
function importTemplateLibrary() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

// 处理文件上传（导入模板库）
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      // 验证数据结构是否为数组
      if (Array.isArray(data) && data.every(item =>
        Array.isArray(item.messages) &&
        item.messages.every(msg => msg.role && msg.content !== undefined)
      )) {
        templates.value = data;
        localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));
        showNotification('success', '导入成功', `成功导入了 ${data.length} 个对话模板`);
      } else {
        throw new Error('模板库格式不正确');
      }
    } catch (error) {
      showNotification('error', '导入失败', '无法导入模板库，文件格式可能不正确');
    }

    // 重置文件输入
    if (fileInput.value) {
      fileInput.value.value = null;
    }
  };

  reader.readAsText(file);
}

// 处理单个模板上传
function handleSingleTemplateUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      // 验证单个模板的数据结构
      if (data.messages && Array.isArray(data.messages) &&
        data.messages.every(msg => msg.role && msg.content !== undefined)) {

        // 添加到模板库
        templates.value.push(data);
        localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));
        showNotification('success', '导入成功', '成功导入单个对话模板');
      } else {
        throw new Error('模板格式不正确');
      }
    } catch (error) {
      showNotification('error', '导入失败', '无法导入对话模板，文件格式可能不正确');
    }

    // 重置文件输入
    if (event.target) {
      event.target.value = null;
    }
  };

  reader.readAsText(file);
}

// 导出模板库
function exportTemplateLibrary() {
  try {
    const data = JSON.stringify(templates.value, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-templates-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('success', '导出成功', `已导出 ${templates.value.length} 个对话模板`);
  } catch (error) {
    showNotification('error', '导出失败', '无法导出模板库');
  }
}

// 获取GitHub仓库中的分类和模板
async function fetchGitHubCategories() {
  isLoadingGitHubData.value = true;
  githubCategories.value = [];

  try {
    // 获取仓库内容
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents?ref=${GITHUB_BRANCH}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const contents = await response.json();

    // 过滤出目录
    const folders = contents.filter(item => item.type === 'dir');

    // 对每个目录获取其文件
    for (const folder of folders) {
      const folderContentsUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${folder.path}?ref=${GITHUB_BRANCH}`;
      const folderResponse = await fetch(folderContentsUrl);

      if (!folderResponse.ok) {
        continue; // 跳过无法获取内容的文件夹
      }

      const folderContents = await folderResponse.json();

      // 过滤出JSON文件
      const jsonFiles = folderContents.filter(file => file.name.endsWith('.json'));

      if (jsonFiles.length > 0) {
        githubCategories.value.push({
          name: folder.name,
          path: folder.path,
          files: jsonFiles.map(file => ({
            name: file.name,
            path: file.path,
            downloadUrl: file.download_url
          }))
        });
      }
    }

    if (githubCategories.value.length === 0) {
      showNotification('error', '获取失败', '在GitHub仓库中未找到有效的模板分类');
    }
  } catch (error) {
    console.error('获取GitHub数据失败:', error);
    showNotification('error', '获取失败', '无法从GitHub获取模板分类，请检查网络连接或仓库权限');
  } finally {
    isLoadingGitHubData.value = false;
  }
}

// 打开GitHub导入模态框
async function openGitHubImportModal() {
  showGitHubImportModal.value = true;
  if (githubCategories.value.length === 0) {
    await fetchGitHubCategories();
  }
}

// 导入GitHub上的单个模板文件
async function importGitHubTemplate(categoryName, fileName) {
  try {
    // 查找对应的类别和文件
    const category = githubCategories.value.find(cat => cat.name === categoryName);
    if (!category) throw new Error('分类不存在');

    const file = category.files.find(f => f.name === fileName);
    if (!file) throw new Error('文件不存在');

    // 下载模板文件
    const response = await fetch(file.downloadUrl);
    if (!response.ok) throw new Error(`下载失败: ${response.status}`);

    const templateData = await response.json();

    // 验证模板数据
    if (Array.isArray(templateData) && templateData.every(item =>
      Array.isArray(item.messages) &&
      item.messages.every(msg => msg.role && msg.content !== undefined)
    )) {
      // 为模板添加分类信息
      const templatesWithCategory = templateData.map(template => ({
        ...template,
        category: categoryName,
        // 如果模板没有title，使用文件名作为标题
        title: template.title || fileName.replace('.json', '')
      }));

      // 追加到现有模板
      templates.value = [...templates.value, ...templatesWithCategory];
      localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));

      showNotification('success', '导入成功', `成功导入 ${templatesWithCategory.length} 个 ${categoryName} 模板`);
    } else if (templateData.messages && Array.isArray(templateData.messages) &&
      templateData.messages.every(msg => msg.role && msg.content !== undefined)) {
      // 单个模板的情况
      const templateWithCategory = {
        ...templateData,
        category: categoryName,
        title: templateData.title || fileName.replace('.json', '')
      };

      templates.value.push(templateWithCategory);
      localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));

      showNotification('success', '导入成功', `成功导入 ${categoryName}/${fileName} 模板`);
    } else {
      throw new Error('模板格式不正确');
    }
  } catch (error) {
    console.error('导入GitHub模板失败:', error);
    showNotification('error', '导入失败', `导入 ${categoryName}/${fileName} 失败: ${error.message}`);
  }
}

// 导入整个分类的所有模板
async function importAllCategoryTemplates(category) {
  let successCount = 0;
  let failCount = 0;

  showNotification('success', '开始导入', `正在导入 ${category.name} 分类的所有模板...`);

  for (const file of category.files) {
    try {
      // 下载模板文件
      const response = await fetch(file.downloadUrl);
      if (!response.ok) throw new Error(`下载失败: ${response.status}`);

      const templateData = await response.json();

      // 验证并导入模板
      if (Array.isArray(templateData) && templateData.every(item =>
        Array.isArray(item.messages) &&
        item.messages.every(msg => msg.role && msg.content !== undefined)
      )) {
        // 导入多个模板
        const templatesWithCategory = templateData.map(template => ({
          ...template,
          category: category.name,
          title: template.title || file.name.replace('.json', '')
        }));

        templates.value = [...templates.value, ...templatesWithCategory];
        successCount += templatesWithCategory.length;
      } else if (templateData.messages && Array.isArray(templateData.messages) &&
        templateData.messages.every(msg => msg.role && msg.content !== undefined)) {
        // 导入单个模板
        const templateWithCategory = {
          ...templateData,
          category: category.name,
          title: templateData.title || file.name.replace('.json', '')
        };

        templates.value.push(templateWithCategory);
        successCount += 1;
      } else {
        throw new Error('模板格式不正确');
      }
    } catch (error) {
      console.error(`导入 ${file.name} 失败:`, error);
      failCount += 1;
    }
  }

  // 保存到本地存储
  localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));

  // 显示导入结果
  if (successCount > 0) {
    showNotification(
      'success',
      '导入完成',
      `成功导入 ${successCount} 个 ${category.name} 模板${failCount > 0 ? `，${failCount} 个导入失败` : ''}`
    );
  } else {
    showNotification('error', '导入失败', `未能成功导入任何 ${category.name} 模板`);
  }
}

// 导出单个模板
function exportSingleTemplate(template, index) {
  try {
    const data = JSON.stringify(template, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${template.title || index + 1}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('success', '导出成功', `已导出 ${template.title || `模板 #${index + 1}`}`);
  } catch (error) {
    showNotification('error', '导出失败', '无法导出对话模板');
  }
}

// 确认删除模板
function confirmDeleteTemplate(index) {
  deleteIndex.value = index;
  showDeleteModal.value = true;
}

// 执行删除操作
function executeDelete() {
  if (deleteIndex.value >= 0 && deleteIndex.value < templates.value.length) {
    const deletedTemplate = templates.value[deleteIndex.value];
    templates.value.splice(deleteIndex.value, 1);
    localStorage.setItem('conversationTemplates', JSON.stringify(templates.value));
    showNotification('success', '模板已删除', `${deletedTemplate.title || `模板 #${deleteIndex.value + 1}`} 已成功删除`);
  }
  showDeleteModal.value = false;
}

// 取消删除
function cancelDelete() {
  showDeleteModal.value = false;
  deleteIndex.value = -1;
}

// 显示通知
function showNotification(type, title, message) {
  notification.value = {
    show: true,
    type,
    title,
    message
  };

  // 3秒后自动关闭
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
}
</script>

<style scoped>
/* 过渡和动画 */
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

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(1rem);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}

/* 自定义滚动条 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 10px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* 工具类 */
.ml-13 {
  margin-left: 3.25rem;
}

/* 文本截断 */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
