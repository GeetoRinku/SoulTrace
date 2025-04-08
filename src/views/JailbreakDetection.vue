<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col p-3 md:p-4 text-gray-800 dark:text-gray-200">
    <!-- 主容器 -->
    <div class="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      <!-- 头部 -->
      <div class="bg-gradient-to-r from-red-500/10 to-red-500/5 dark:from-red-900/30 dark:to-red-900/20 p-4 border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="bg-red-600 p-2 rounded-lg shadow-md">
              <ShieldCheckIcon class="h-5 w-5 text-white" />
            </div>
            <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500 dark:from-red-400 dark:to-red-300">
              越狱检测规则配置
            </h1>
          </div>

          <div class="flex space-x-3">
            <router-link to="/" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <ArrowLeftIcon class="h-5 w-5 mr-1.5" />
              <span>返回</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="flex-1 flex overflow-hidden">
        <!-- 左侧类别面板 -->
        <div class="w-72 border-r border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto p-4 space-y-5 flex-shrink-0">
          <!-- 检测类型选择 -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <AdjustmentsHorizontalIcon class="h-5 w-5 mr-2 text-red-500" />
                检测类型
              </h2>
            </div>

            <div class="space-y-2">
              <div
                v-for="type in detectionTypes"
                :key="type.id"
                @click="selectDetectionType(type.id)"
                class="flex items-center justify-between p-3 text-sm rounded-lg border cursor-pointer transition-all duration-200"
                :class="selectedType === type.id
                  ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 shadow-sm'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <span class="font-medium truncate">{{ type.name }}</span>
                <CheckIcon v-if="selectedType === type.id" class="h-4.5 w-4.5 text-red-500" />
              </div>
            </div>
          </div>

          <!-- 预设规则模板 -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-700">
            <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-3">
              <DocumentTextIcon class="h-5 w-5 mr-2 text-red-500" />
              预设规则模板
            </h2>

            <div class="space-y-2">
              <button @click="loadPreset('basic')" class="w-full flex items-center justify-between p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="font-medium">基础越狱检测</span>
                <ArrowDownTrayIcon class="h-4.5 w-4.5 text-gray-500" />
              </button>
              <button @click="loadPreset('advanced')" class="w-full flex items-center justify-between p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="font-medium">高级越狱检测</span>
                <ArrowDownTrayIcon class="h-4.5 w-4.5 text-gray-500" />
              </button>
              <button @click="loadPreset('compliance')" class="w-full flex items-center justify-between p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="font-medium">合规性检测</span>
                <ArrowDownTrayIcon class="h-4.5 w-4.5 text-gray-500" />
              </button>
            </div>
          </div>

          <!-- 导入导出 -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-700">
            <div class="grid grid-cols-2 gap-2">
              <button @click="exportRules" class="flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <ArrowUpTrayIcon class="h-4.5 w-4.5 mr-2" />
                导出规则
              </button>
              <label class="flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <ArrowDownTrayIcon class="h-4.5 w-4.5 mr-2" />
                导入规则
                <input type="file" accept=".json" class="hidden" @change="importRules" ref="fileInput" />
              </label>
            </div>
          </div>
        </div>

        <!-- 右侧规则编辑区域 -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- 规则列表 -->
          <div class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800">
            <div v-if="selectedType === 'keywords'" class="space-y-4">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">敏感词配置</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">添加需要检测的敏感词或短语。每行一个，支持完全匹配和部分匹配。</p>
              </div>

              <div class="flex space-x-2 mb-4">
                <button @click="addKeyword()" class="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <PlusIcon class="h-5 w-5 mr-1.5" />
                  添加敏感词
                </button>
                <button @click="toggleKeywordOptions" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <AdjustmentsHorizontalIcon class="h-5 w-5 mr-1.5" />
                  设置选项
                </button>
              </div>

              <div v-if="showKeywordOptions" class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input id="case-sensitive" type="checkbox" v-model="keywordOptions.caseSensitive" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label for="case-sensitive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">区分大小写</label>
                  </div>
                  <div class="flex items-center">
                    <input id="whole-word" type="checkbox" v-model="keywordOptions.wholeWord" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label for="whole-word" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">全词匹配</label>
                  </div>
                  <div class="flex items-center">
                    <input id="ignore-spaces" type="checkbox" v-model="keywordOptions.ignoreSpaces" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label for="ignore-spaces" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">忽略空格</label>
                  </div>
                </div>
              </div>

              <div v-for="(keyword, index) in keywords" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div class="flex-1">
                  <input
                    v-model="keyword.text"
                    type="text"
                    class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="输入敏感词或短语"
                  />
                  <div class="mt-2 flex space-x-3">
                    <div class="flex items-center">
                      <select v-model="keyword.severity" class="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <option value="low">低风险</option>
                        <option value="medium">中风险</option>
                        <option value="high">高风险</option>
                      </select>
                    </div>
                    <div class="flex items-center">
                      <input id="partial-match" type="checkbox" v-model="keyword.partialMatch" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                      <label for="partial-match" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">部分匹配</label>
                    </div>
                  </div>
                </div>
                <button @click="removeKeyword(index)" class="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div v-if="selectedType === 'regex'" class="space-y-4">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">正则表达式配置</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">添加需要检测的正则表达式模式。每条规则可以包括正则表达式、描述和严重性级别。</p>
              </div>

              <div class="flex mb-4">
                <button @click="addRegex()" class="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <PlusIcon class="h-5 w-5 mr-1.5" />
                  添加正则表达式
                </button>
              </div>

              <div v-for="(regex, index) in regexPatterns" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="text-base font-medium text-gray-800 dark:text-gray-200">正则表达式 #{{ index + 1 }}</h4>
                  <button @click="removeRegex(index)" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">正则表达式</label>
                    <input
                      v-model="regex.pattern"
                      type="text"
                      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                      placeholder="例如: \bhack\b|\bexploit\b"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                    <input
                      v-model="regex.description"
                      type="text"
                      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                      placeholder="描述这个正则表达式的用途"
                    />
                  </div>
                  <div class="flex space-x-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">风险等级</label>
                      <select v-model="regex.severity" class="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <option value="low">低风险</option>
                        <option value="medium">中风险</option>
                        <option value="high">高风险</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标志</label>
                      <div class="flex space-x-2">
                        <label class="inline-flex items-center">
                          <input type="checkbox" v-model="regex.flags.ignoreCase" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">i (忽略大小写)</span>
                        </label>
                        <label class="inline-flex items-center">
                          <input type="checkbox" v-model="regex.flags.global" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">g (全局匹配)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex items-center justify-between">
                    <button @click="testRegex(index)" class="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <BeakerIcon class="h-4 w-4 mr-1.5" />
                      测试正则表达式
                    </button>
                    <span v-if="regex.testResult" :class="regex.testResult.match ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'" class="text-sm">
                      {{ regex.testResult.match ? '匹配成功' : '无匹配' }}
                    </span>
                  </div>

                  <div v-if="regex.showTest" class="mt-3 space-y-3">
                    <textarea
                      v-model="regex.testText"
                      rows="3"
                      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                      placeholder="输入测试文本..."
                    ></textarea>

                    <div v-if="regex.testResult && regex.testResult.match" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <h5 class="text-sm font-medium text-green-800 dark:text-green-300 mb-1">匹配结果:</h5>
                      <div class="text-sm text-green-700 dark:text-green-400">
                        {{ regex.testResult.matches.join(', ') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedType === 'semantic'" class="space-y-4">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">语义分析配置</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">配置语义分析规则，包括主题检测、情感分析和内容分类。</p>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h4 class="text-base font-medium text-gray-800 dark:text-gray-200">主题检测</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">选择需要检测的敏感主题类别</p>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div v-for="(topic, index) in semanticTopics" :key="index" class="flex items-center">
                    <input :id="`topic-${index}`" type="checkbox" v-model="topic.enabled" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label :for="`topic-${index}`" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">{{ topic.name }}</label>
                  </div>
                </div>

                <div class="mt-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">主题检测阈值</label>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="semanticOptions.topicThreshold"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-600"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300 w-10 text-center">{{ semanticOptions.topicThreshold }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h4 class="text-base font-medium text-gray-800 dark:text-gray-200">情感分析</h4>

                <div class="space-y-3">
                  <div class="flex items-center">
                    <input id="enable-sentiment" type="checkbox" v-model="semanticOptions.enableSentiment" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label for="enable-sentiment" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用情感分析</label>
                  </div>

                  <div v-if="semanticOptions.enableSentiment" class="ml-6 space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">负面情感阈值</label>
                      <div class="flex items-center space-x-2">
                        <input
                          v-model="semanticOptions.negativeSentimentThreshold"
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-600"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300 w-10 text-center">{{ semanticOptions.negativeSentimentThreshold }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h4 class="text-base font-medium text-gray-800 dark:text-gray-200">内容分类</h4>

                <div class="space-y-3">
                  <div class="flex items-center">
                    <input id="enable-classification" type="checkbox" v-model="semanticOptions.enableClassification" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                    <label for="enable-classification" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用内容分类</label>
                  </div>

                  <div v-if="semanticOptions.enableClassification" class="ml-6 space-y-3">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div v-for="(category, index) in contentCategories" :key="index" class="flex items-center">
                        <input :id="`category-${index}`" type="checkbox" v-model="category.enabled" class="h-4 w-4 text-red-600 focus:ring-red-500" />
                        <label :for="`category-${index}`" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</label>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分类置信度阈值</label>
                      <div class="flex items-center space-x-2">
                        <input
                          v-model="semanticOptions.classificationThreshold"
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-600"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300 w-10 text-center">{{ semanticOptions.classificationThreshold }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部操作栏 -->
          <div class="border-t border-gray-100 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 flex justify-between">
            <div>
              <button @click="resetRules" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <ArrowPathIcon class="h-5 w-5 mr-1.5" />
                重置规则
              </button>
            </div>
            <div>
              <button @click="saveRules" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                <CheckIcon class="h-5 w-5 mr-1.5" />
                保存配置
              </button>
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
    <InformationCircleIcon v-if="notification.type === 'info'" class="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0" />
    <div>
      <p class="font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  ShieldCheckIcon, ArrowLeftIcon, AdjustmentsHorizontalIcon, CheckIcon, DocumentTextIcon,
  ArrowDownTrayIcon, ArrowUpTrayIcon, PlusIcon, TrashIcon, BeakerIcon, ArrowPathIcon,
  ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon
} from '@heroicons/vue/24/outline';

// 检测类型数据
const detectionTypes = [
  { id: 'keywords', name: '敏感词检测' },
  { id: 'regex', name: '正则表达式检测' },
  { id: 'semantic', name: '语义分析检测' }
];

// 状态变量
const selectedType = ref('keywords');
const showKeywordOptions = ref(false);
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
});

// 敏感词数据
const keywords = ref([
  { text: '越狱', severity: 'high', partialMatch: true },
  { text: '忽略之前的指令', severity: 'high', partialMatch: true },
  { text: '绕过限制', severity: 'medium', partialMatch: true }
]);

const keywordOptions = ref({
  caseSensitive: false,
  wholeWord: false,
  ignoreSpaces: true
});

// 正则表达式数据
const regexPatterns = ref([
  {
    pattern: '\\b(hack|exploit|jailbreak)\\b',
    description: '检测通用越狱术语',
    severity: 'medium',
    flags: { ignoreCase: true, global: true },
    testText: '',
    showTest: false,
    testResult: null
  },
  {
    pattern: '忽略(之前的|所有|上面的)指令',
    description: '检测指令忽略模式',
    severity: 'high',
    flags: { ignoreCase: true, global: true },
    testText: '',
    showTest: false,
    testResult: null
  }
]);

// 语义分析数据
const semanticTopics = ref([
  { name: '黑客/网络安全', enabled: true },
  { name: '违法内容', enabled: true },
  { name: '暴力内容', enabled: true },
  { name: '色情内容', enabled: true },
  { name: '歧视/仇恨', enabled: true },
  { name: '政治敏感', enabled: true }
]);

const contentCategories = ref([
  { name: '越狱尝试', enabled: true },
  { name: '恶意指令', enabled: true },
  { name: '指令篡改', enabled: true },
  { name: '提示词注入', enabled: true },
  { name: '权限提升', enabled: true },
  { name: '敏感信息提取', enabled: true }
]);

const semanticOptions = ref({
  topicThreshold: 0.7,
  enableSentiment: true,
  negativeSentimentThreshold: 0.8,
  enableClassification: true,
  classificationThreshold: 0.6
});

// 方法
function selectDetectionType(type) {
  selectedType.value = type;
}

function toggleKeywordOptions() {
  showKeywordOptions.value = !showKeywordOptions.value;
}

function addKeyword() {
  keywords.value.push({ text: '', severity: 'medium', partialMatch: true });
}

function removeKeyword(index) {
  keywords.value.splice(index, 1);
}

function addRegex() {
  regexPatterns.value.push({
    pattern: '',
    description: '',
    severity: 'medium',
    flags: { ignoreCase: true, global: true },
    testText: '',
    showTest: false,
    testResult: null
  });
}

function removeRegex(index) {
  regexPatterns.value.splice(index, 1);
}

function testRegex(index) {
  const regex = regexPatterns.value[index];
  regex.showTest = !regex.showTest;

  if (regex.showTest && regex.testText) {
    try {
      const flags = (regex.flags.ignoreCase ? 'i' : '') + (regex.flags.global ? 'g' : '');
      const re = new RegExp(regex.pattern, flags);
      const matches = regex.testText.match(re);

      if (matches) {
        regex.testResult = {
          match: true,
          matches: matches
        };
      } else {
        regex.testResult = {
          match: false,
          matches: []
        };
      }
    } catch (error) {
      showNotification('error', '正则表达式错误', error.message);
      regex.testResult = {
        match: false,
        matches: [],
        error: error.message
      };
    }
  }
}

function resetRules() {
  if (selectedType.value === 'keywords') {
    keywords.value = [
      { text: '越狱', severity: 'high', partialMatch: true },
      { text: '忽略之前的指令', severity: 'high', partialMatch: true },
      { text: '绕过限制', severity: 'medium', partialMatch: true }
    ];
    keywordOptions.value = {
      caseSensitive: false,
      wholeWord: false,
      ignoreSpaces: true
    };
  } else if (selectedType.value === 'regex') {
    regexPatterns.value = [
      {
        pattern: '\\b(hack|exploit|jailbreak)\\b',
        description: '检测通用越狱术语',
        severity: 'medium',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '忽略(之前的|所有|上面的)指令',
        description: '检测指令忽略模式',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      }
    ];
  } else if (selectedType.value === 'semantic') {
    semanticTopics.value.forEach(topic => topic.enabled = true);
    contentCategories.value.forEach(cat => cat.enabled = true);
    semanticOptions.value = {
      topicThreshold: 0.7,
      enableSentiment: true,
      negativeSentimentThreshold: 0.8,
      enableClassification: true,
      classificationThreshold: 0.6
    };
  }

  showNotification('info', '已重置', '规则已重置为默认值');
}

function saveRules() {
  const rules = {
    keywords: {
      items: keywords.value,
      options: keywordOptions.value
    },
    regex: regexPatterns.value,
    semantic: {
      topics: semanticTopics.value,
      categories: contentCategories.value,
      options: semanticOptions.value
    }
  };

  localStorage.setItem('jailbreakDetectionRules', JSON.stringify(rules));
  showNotification('success', '保存成功', '越狱检测规则已保存');
}

function loadPreset(preset) {
  if (preset === 'basic') {
    // 基础越狱检测预设
    keywords.value = [
      { text: '越狱', severity: 'high', partialMatch: true },
      { text: '忽略之前的指令', severity: 'high', partialMatch: true },
      { text: '绕过限制', severity: 'medium', partialMatch: true },
      { text: '无视规则', severity: 'high', partialMatch: true }
    ];

    regexPatterns.value = [
      {
        pattern: '\\b(hack|exploit|jailbreak)\\b',
        description: '检测通用越狱术语',
        severity: 'medium',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '忽略(之前的|所有|上面的)指令',
        description: '检测指令忽略模式',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      }
    ];
  } else if (preset === 'advanced') {
    // 高级越狱检测预设
    keywords.value = [
      { text: '越狱', severity: 'high', partialMatch: true },
      { text: '忽略之前的指令', severity: 'high', partialMatch: true },
      { text: '绕过限制', severity: 'high', partialMatch: true },
      { text: '无视规则', severity: 'high', partialMatch: true },
      { text: 'DAN', severity: 'high', partialMatch: false },
      { text: 'Do Anything Now', severity: 'high', partialMatch: true },
      { text: '扮演', severity: 'medium', partialMatch: true },
      { text: '假设', severity: 'medium', partialMatch: true },
      { text: '假装', severity: 'medium', partialMatch: true }
    ];

    regexPatterns.value = [
      {
        pattern: '\\b(hack|exploit|jailbreak|bypass)\\b',
        description: '检测通用越狱术语',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '忽略(之前的|所有|上面的)指令',
        description: '检测指令忽略模式',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '(扮演|角色扮演|假装|假设).{0,20}(不受|没有|无|摆脱).{0,20}(限制|约束|规则)',
        description: '检测角色扮演越狱',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '(DAN|Do Anything Now)',
        description: '检测DAN模式',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '(现在开始|从现在起).{0,30}(忘记|不要|无视).{0,30}(之前|以前|原来|以往)',
        description: '检测指令重置模式',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      }
    ];
  } else if (preset === 'compliance') {
    // 合规性检测预设
    keywords.value = [
      { text: '色情', severity: 'high', partialMatch: true },
      { text: '暴力', severity: 'high', partialMatch: true },
      { text: '毒品', severity: 'high', partialMatch: true },
      { text: '武器', severity: 'high', partialMatch: true },
      { text: '恐怖主义', severity: 'high', partialMatch: true },
      { text: '歧视', severity: 'high', partialMatch: true },
      { text: '仇恨', severity: 'high', partialMatch: true },
      { text: '赌博', severity: 'medium', partialMatch: true },
      { text: '政治', severity: 'medium', partialMatch: true }
    ];

    regexPatterns.value = [
      {
        pattern: '(制造|制作|生产).{0,20}(炸弹|爆炸物|毒品|武器)',
        description: '检测危险物品制作指南请求',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '(入侵|黑客|攻击).{0,20}(系统|网站|服务器|账号)',
        description: '检测网络攻击请求',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      },
      {
        pattern: '(如何|怎样).{0,20}(逃税|洗钱|欺诈)',
        description: '检测违法行为指导请求',
        severity: 'high',
        flags: { ignoreCase: true, global: true },
        testText: '',
        showTest: false,
        testResult: null
      }
    ];
  }

  showNotification('success', '加载预设成功', `已加载${preset === 'basic' ? '基础' : preset === 'advanced' ? '高级' : '合规性'}越狱检测预设`);
}

function exportRules() {
  const rules = {
    keywords: {
      items: keywords.value,
      options: keywordOptions.value
    },
    regex: regexPatterns.value,
    semantic: {
      topics: semanticTopics.value,
      categories: contentCategories.value,
      options: semanticOptions.value
    }
  };

  const blob = new Blob([JSON.stringify(rules, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jailbreak-detection-rules-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification('success', '导出成功', '越狱检测规则已导出为JSON文件');
}

function importRules(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      if (data.keywords && data.regex && data.semantic) {
        keywords.value = data.keywords.items || [];
        keywordOptions.value = data.keywords.options || { caseSensitive: false, wholeWord: false, ignoreSpaces: true };
        regexPatterns.value = data.regex || [];
        semanticTopics.value = data.semantic.topics || [];
        contentCategories.value = data.semantic.categories || [];
        semanticOptions.value = data.semantic.options || {
          topicThreshold: 0.7,
          enableSentiment: true,
          negativeSentimentThreshold: 0.8,
          enableClassification: true,
          classificationThreshold: 0.6
        };

        showNotification('success', '导入成功', '越狱检测规则已成功导入');
      } else {
        throw new Error('文件格式不正确');
      }
    } catch (error) {
      showNotification('error', '导入失败', '无法导入规则，文件格式可能不正确');
    }
  };

  reader.readAsText(file);
}

// 显示通知
function showNotification(type, title, message) {
  notification.value = {
    show: true,
    type,
    title,
    message
  };

  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
}

// 组件加载时尝试从本地存储加载规则
onMounted(() => {
  try {
    const savedRules = JSON.parse(localStorage.getItem('jailbreakDetectionRules'));
    if (savedRules) {
      keywords.value = savedRules.keywords.items || keywords.value;
      keywordOptions.value = savedRules.keywords.options || keywordOptions.value;
      regexPatterns.value = savedRules.regex || regexPatterns.value;
      semanticTopics.value = savedRules.semantic.topics || semanticTopics.value;
      contentCategories.value = savedRules.semantic.categories || contentCategories.value;
      semanticOptions.value = savedRules.semantic.options || semanticOptions.value;
    }
  } catch (error) {
    console.error('加载规则失败:', error);
  }
});
</script>
