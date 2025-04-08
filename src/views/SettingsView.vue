<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <Cog6ToothIcon class="h-7 w-7 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">API 设置</h1>
        </div>
      </div>

      <!-- 内置 API 提供商配置 -->
      <div v-for="provider in builtInProviders" :key="provider.name" class="mb-6">
        <div class="p-5 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <!-- 头部区域 -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                <ServerIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 class="ml-3 text-lg font-medium text-gray-800 dark:text-white">{{ provider.displayName }}</h3>
            </div>
            <button
              @click="testAndSaveProvider(provider.name)"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              :disabled="loading[provider.name]"
            >
              <ArrowPathIcon v-if="loading[provider.name]" class="h-4 w-4 mr-1.5 animate-spin" />
              <CheckIcon v-else class="h-4 w-4 mr-1.5" />
              {{ loading[provider.name] ? '保存中...' : '保存设置' }}
            </button>
          </div>

          <!-- API Key 输入区域 -->
          <div class="space-y-4">
            <div>
              <label :for="`${provider.name}-api-key`" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API 密钥
              </label>
              <div class="flex">
                <input
                  :id="`${provider.name}-api-key`"
                  v-model="providerSettings[provider.name].apiKey"
                  :type="showApiKey[provider.name] ? 'text' : 'password'"
                  :placeholder="`输入 ${provider.displayName} API 密钥`"
                  class="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <button
                  @click="toggleShowApiKey(provider.name)"
                  class="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <EyeIcon v-if="!showApiKey[provider.name]" class="h-5 w-5" />
                  <EyeSlashIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <!-- 模型列表区域 -->
            <div v-if="providerSettings[provider.name].models.length > 0" class="mt-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  可用模型 ({{ providerSettings[provider.name].models.length }})
                </h4>
                <button
                  @click="toggleModelList(provider.name)"
                  class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center transition-colors"
                >
                  <span class="mr-1">{{ modelListExpanded[provider.name] ? '收起' : '展开' }}</span>
                  <ChevronUpIcon
                    class="h-4 w-4 transition-transform duration-200"
                    :class="modelListExpanded[provider.name] ? 'rotate-0' : 'rotate-180'"
                  />
                </button>
              </div>

              <div
                v-show="modelListExpanded[provider.name]"
                class="grid grid-cols-2 gap-2 transition-all duration-200"
              >
                <div
                  v-for="model in providerSettings[provider.name].models"
                  :key="model.id"
                  class="p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
                >
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ model.displayName || model.id }}
                  </div>
                  <div v-if="model.description" class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {{ model.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 自定义 API 提供商配置 -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">自定义 API 提供商</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">添加支持 OpenAI 兼容接口的其他 API 提供商</p>
          </div>
          <button
            @click="addCustomProvider"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            :disabled="uncommittedProviders.length + committedProviders.length >= 4"
          >
            <PlusIcon class="h-4 w-4 mr-1.5" />
            添加提供商
          </button>
        </div>

        <!-- 未配置的新提供商表单 -->
        <div v-for="(provider, index) in uncommittedProviders" :key="'new-' + index" class="mb-4 p-5 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <div class="flex justify-between mb-4">
            <input
              v-model="provider.name"
              placeholder="API 提供商名称"
              class="px-3 py-2 border rounded-md flex-grow mr-2"
            />
            <button @click="removeUncommittedProvider(index)" class="text-red-500">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Base URL
              </label>
              <input
                v-model="provider.baseUrl"
                placeholder="例如: https://api.example.com/v1"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key <span class="text-gray-500 dark:text-gray-400">(可选)</span>
              </label>
              <div class="flex">
                <input
                  v-model="provider.apiKey"
                  :type="showApiKey[`new-${index}`] ? 'text' : 'password'"
                  placeholder="如果需要则输入 API Key"
                  class="flex-grow px-3 py-2 border rounded-l-md"
                />
                <button
                  @click="toggleShowApiKey(`new-${index}`)"
                  class="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-r-md"
                >
                  <EyeIcon v-if="!showApiKey[`new-${index}`]" class="h-5 w-5" />
                  <EyeSlashIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              @click="testAndSaveCustomProvider(index)"
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              保存设置
            </button>
          </div>
        </div>

        <!-- 已配置的提供商展示 -->
        <div v-for="provider in committedProviders" :key="provider.name" class="mb-6">
          <div class="p-5 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                  <ServerIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 class="ml-3 text-lg font-medium text-gray-800 dark:text-white">{{ provider.name }}</h3>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="removeCommittedProvider(provider.name)"
                  class="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="删除提供商"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
                <button
                  @click="testAndUpdateProvider(provider.name)"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  :disabled="loading[provider.name]"
                >
                  <ArrowPathIcon v-if="loading[provider.name]" class="h-4 w-4 mr-1.5 animate-spin" />
                  <CheckIcon v-else class="h-4 w-4 mr-1.5" />
                  {{ loading[provider.name] ? '保存中...' : '更新设置' }}
                </button>
              </div>
            </div>

            <!-- API Key 输入区域 -->
            <div class="space-y-4">
              <div>
                <label :for="`${provider.name}-api-key`" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API 密钥
                </label>
                <div class="flex">
                  <input
                    :id="`${provider.name}-api-key`"
                    v-model="provider.apiKey"
                    :type="showApiKey[provider.name] ? 'text' : 'password'"
                    placeholder="输入 API 密钥"
                    class="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  <button
                    @click="toggleShowApiKey(provider.name)"
                    class="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <EyeIcon v-if="!showApiKey[provider.name]" class="h-5 w-5" />
                    <EyeSlashIcon v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <!-- 模型列表区域 -->
              <div v-if="provider.models?.length > 0" class="mt-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    可用模型 ({{ provider.models.length }})
                  </h4>
                  <button
                    @click="toggleModelList(provider.name)"
                    class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center transition-colors"
                  >
                    <span class="mr-1">{{ modelListExpanded[provider.name] ? '收起' : '展开' }}</span>
                    <ChevronUpIcon
                      class="h-4 w-4 transition-transform duration-200"
                      :class="modelListExpanded[provider.name] ? 'rotate-0' : 'rotate-180'"
                    />
                  </button>
                </div>

                <div
                  v-show="modelListExpanded[provider.name]"
                  class="grid grid-cols-2 gap-2 transition-all duration-200"
                >
                  <div
                    v-for="model in provider.models"
                    :key="model.id"
                    class="p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
                  >
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ model.displayName || model.id }}
                    </div>
                    <div v-if="model.description" class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {{ model.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知提示 -->
    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-4 flex items-start transition-all duration-300 animate-slide-up z-50"
    >
      <CheckCircleIcon v-if="notification.type === 'success'" class="h-6 w-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
      <ExclamationCircleIcon v-if="notification.type === 'error'" class="h-6 w-6 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
      <div>
        <p class="font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import {
  Cog6ToothIcon, ServerIcon, CheckIcon, ArrowPathIcon,
  InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon,
  BeakerIcon, EyeIcon, EyeSlashIcon, PlusIcon, TrashIcon, ChevronUpIcon
} from '@heroicons/vue/24/outline';
import { LLMServiceFactory } from '@/services/llmService';

// 修改内置提供商配置
const builtInProviders = [
  {
    name: 'google',
    displayName: 'Google AI',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    modelListUrl: 'https://generativelanguage.googleapis.com/v1beta/models?key={apiKey}'
  },
  {
    name: 'openai',
    displayName: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    modelListUrl: null  // OpenAI 使用 SDK 方式获取模型列表
  }
];

// 状态管理
const loading = ref({});
const showApiKey = ref({});
const providerSettings = ref({
  google: { apiKey: '', models: [] },
  openai: { apiKey: '', models: [] }
});
const uncommittedProviders = ref([]);
const committedProviders = ref([]);
const modelListExpanded = ref({});

// 初始化状态
builtInProviders.forEach(provider => {
  loading.value[provider.name] = false;
  showApiKey.value[provider.name] = false;
  modelListExpanded.value[provider.name] = false;
});

// 获取模型列表的统一方法
async function fetchModels(apiKey, provider) {
  const service = LLMServiceFactory.createService(apiKey, {
    baseURL: provider.baseUrl
  });
  return await service.listModels();
}

// 测试并保存提供商设置
async function testAndSaveProvider(providerName) {
  loading.value[providerName] = true;
  try {
    const provider = builtInProviders.find(p => p.name === providerName);
    const settings = providerSettings.value[providerName];

    const models = await fetchModels(settings.apiKey, provider);

    providerSettings.value[providerName].models = models;
    localStorage.setItem(`${providerName}Settings`, JSON.stringify({
      apiKey: settings.apiKey,
      baseUrl: provider.baseUrl,
      models,
      isConfigured: true
    }));

    showNotification('success', '保存成功', `${provider.displayName} API 设置已保存`);
  } catch (error) {
    console.error('Error fetching models:', error);
    showNotification('error', '保存失败', error.message || '无法获取模型列表');
  } finally {
    loading.value[providerName] = false;
  }
}

// 自定义提供商相关函数
function addCustomProvider() {
  if (uncommittedProviders.value.length + committedProviders.value.length < 4) {
    uncommittedProviders.value.push({
      name: '',
      baseUrl: '',
      apiKey: '',
      models: []
    });
  }
}

function removeUncommittedProvider(index) {
  uncommittedProviders.value.splice(index, 1);
}

function removeCommittedProvider(providerName) {
  const index = committedProviders.value.findIndex(p => p.name === providerName);
  if (index !== -1) {
    committedProviders.value.splice(index, 1);
    localStorage.setItem('customProviders', JSON.stringify(committedProviders.value));
    showNotification('success', '删除成功', `${providerName} 已被删除`);
  }
}

// 测试并保存自定义提供商
async function testAndSaveCustomProvider(index) {
  const provider = uncommittedProviders.value[index];
  try {
    const models = await fetchModels(provider.apiKey, provider);
    provider.models = models;

    // 移动到已提交列表
    committedProviders.value.push({...provider});
    uncommittedProviders.value.splice(index, 1);

    localStorage.setItem('customProviders', JSON.stringify(committedProviders.value));
    showNotification('success', '保存成功', `${provider.name} 设置已保存`);
  } catch (error) {
    showNotification('error', '保存失败', error.message);
  }
}

// 其他辅助函数
function toggleShowApiKey(providerName) {
  showApiKey.value[providerName] = !showApiKey.value[providerName];
}

function toggleModelList(providerName) {
  modelListExpanded.value[providerName] = !modelListExpanded.value[providerName];
}

const notification = ref({
  show: false,
  type: 'success',
  title: '',
  message: ''
});

function showNotification(type, title, message) {
  notification.value = { show: true, type, title, message };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
}

// 添加更新已提交提供商的函数
async function testAndUpdateProvider(providerName) {
  const provider = committedProviders.value.find(p => p.name === providerName);
  if (!provider) return;

  loading.value[providerName] = true;
  try {
    const models = await fetchModels(provider.apiKey, provider);
    provider.models = models;

    localStorage.setItem('customProviders', JSON.stringify(committedProviders.value));
    showNotification('success', '更新成功', `${provider.name} 设置已更新`);
  } catch (error) {
    showNotification('error', '更新失败', error.message);
  } finally {
    loading.value[providerName] = false;
  }
}

// 组件挂载时加载存储的设置
onMounted(() => {
  // 加载内置提供商设置
  builtInProviders.forEach(provider => {
    const savedSettings = localStorage.getItem(`${provider.name}Settings`);
    if (savedSettings) {
      providerSettings.value[provider.name] = JSON.parse(savedSettings);
    }
  });

  // 加载自定义提供商设置
  const savedCustomProviders = localStorage.getItem('customProviders');
  if (savedCustomProviders) {
    committedProviders.value = JSON.parse(savedCustomProviders);
  }
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

