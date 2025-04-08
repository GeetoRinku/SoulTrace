<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <!-- Header with animated icon -->
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center group">
        <ShieldCheckIcon class="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-4 transition-transform duration-500 group-hover:rotate-12" />
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          LLM安全总纲
        </span>
      </h1>

      <!-- Security Overview -->
      <div class="mb-10">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-5 border-l-4 border-indigo-500 pl-4">大型语言模型安全架构</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
          大型语言模型(LLM)的安全性是确保AI技术负责任使用的关键。我们的多层安全架构设计旨在从用户输入到最终输出的每个环节实施全面保护，
          防止各类滥用、有害内容生成和隐私泄露等风险。
        </p>

        <!-- Enhanced Interactive Flow Diagram -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 overflow-hidden shadow-inner transition-all duration-300 hover:shadow-md">
          <div class="min-w-[800px] flex flex-col items-center">
            <div class="relative w-full py-10">
              <!-- Interactive nodes with animations -->
              <div class="relative flex justify-between items-center z-10">
                <!-- User Input -->
                <div class="flex flex-col items-center w-[16%] transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 border-2 border-blue-500 dark:border-blue-600 flex items-center justify-center mb-4 shadow-md transition-transform duration-500 hover:rotate-[360deg]">
                    <UserIcon class="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div class="text-center">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">用户输入</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">请求和查询</p>
                  </div>
                </div>

                <!-- Input Security -->
                <div class="flex flex-col items-center w-[16%] transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 border-2 border-purple-500 dark:border-purple-600 flex items-center justify-center mb-4 shadow-md transition-transform duration-500 hover:rotate-[360deg]">
                    <ShieldExclamationIcon class="h-10 w-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div class="text-center">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">输入安全检测</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">语义分析与外置检测</p>
                  </div>
                </div>

                <!-- Core Security -->
                <div class="flex flex-col items-center w-[16%] transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40 border-2 border-indigo-500 dark:border-indigo-600 flex items-center justify-center mb-4 shadow-md transition-transform duration-500 hover:rotate-[360deg]">
                    <CpuChipIcon class="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div class="text-center">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">内生安全机制</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">大模型自身防护</p>
                  </div>
                </div>

                <!-- Output Security -->
                <div class="flex flex-col items-center w-[16%] transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 border-2 border-green-500 dark:border-green-600 flex items-center justify-center mb-4 shadow-md transition-transform duration-500 hover:rotate-[360deg]">
                    <DocumentMagnifyingGlassIcon class="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <div class="text-center">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">输出安全检测</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">语义分析与外置检测</p>
                  </div>
                </div>

                <!-- Safe Output -->
                <div class="flex flex-col items-center w-[16%] transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 border-2 border-green-500 dark:border-green-600 flex items-center justify-center mb-4 shadow-md transition-transform duration-500 hover:rotate-[360deg]">
                    <ChatBubbleLeftRightIcon class="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <div class="text-center">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">安全输出</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">最终响应</p>
                  </div>
                </div>
              </div>

              <!-- Enhanced description cards with gradients and hover effects -->
              <div class="mt-16 grid grid-cols-5 gap-4 text-xs">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                  <h4 class="font-medium text-blue-800 dark:text-blue-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">用户查询阶段</h4>
                  <p class="text-blue-700 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">系统接收用户请求，包括文本输入、指令和查询</p>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200 dark:border-purple-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                  <h4 class="font-medium text-purple-800 dark:text-purple-300 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">输入安全层</h4>
                  <p class="text-purple-700 dark:text-purple-400 group-hover:text-purple-900 dark:group-hover:text-purple-300 transition-colors">语义分析检测有害意图，外置模型筛查敏感内容和越狱尝试</p>
                </div>

                <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                  <h4 class="font-medium text-indigo-800 dark:text-indigo-300 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">模型核心安全</h4>
                  <p class="text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors">模型自身的安全对齐和内置安全规则，拒绝不安全请求</p>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                  <h4 class="font-medium text-green-800 dark:text-green-300 mb-2 group-hover:text-green-600 dark:group-hover:text-green-200 transition-colors">输出安全层</h4>
                  <p class="text-green-700 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-green-300 transition-colors">分析生成内容是否符合安全标准，外置模型检查有害输出</p>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
                  <h4 class="font-medium text-green-800 dark:text-green-300 mb-2 group-hover:text-green-600 dark:group-hover:text-green-200 transition-colors">响应传递</h4>
                  <p class="text-green-700 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-green-300 transition-colors">将安全合规的内容传递给用户，确保完整性和可靠性</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Mechanisms Details with enhanced cards -->
      <div class="mt-12 space-y-8">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-l-4 border-indigo-500 pl-4">安全机制详解</h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Input Security -->
          <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30 flex items-center justify-center mr-4 shadow transition-all duration-500 group-hover:rotate-6">
                <FingerPrintIcon class="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 class="text-xl font-medium text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">输入安全检测</h3>
            </div>
            <ul class="space-y-3 text-gray-600 dark:text-gray-300 pl-4">
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300 transition-colors">意图分类：识别并过滤恶意请求</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300 transition-colors">敏感词检测：拦截含有禁用词汇的输入</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300 transition-colors">越狱尝试检测：识别绕过安全限制的模式</span>
              </li>
            </ul>
          </div>

          <!-- Core Security -->
          <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/30 flex items-center justify-center mr-4 shadow transition-all duration-500 group-hover:rotate-6">
                <LockClosedIcon class="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 class="text-xl font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">内生安全机制</h3>
            </div>
            <ul class="space-y-3 text-gray-600 dark:text-gray-300 pl-4">
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300 transition-colors">对齐技术：RLHF和价值观引导训练</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300 transition-colors">拒绝机制：对不适当请求的内置拒绝响应</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300 transition-colors">内容策略：模型遵循的内容生成界限</span>
              </li>
            </ul>
          </div>

          <!-- Output Security -->
          <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/30 flex items-center justify-center mr-4 shadow transition-all duration-500 group-hover:rotate-6">
                <ShieldCheckIcon class="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-xl font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">输出安全检测</h3>
            </div>
            <ul class="space-y-3 text-gray-600 dark:text-gray-300 pl-4">
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-green-700 dark:group-hover/item:text-green-300 transition-colors">内容审核：检查生成内容是否遵循安全标准</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-green-700 dark:group-hover/item:text-green-300 transition-colors">有害信息过滤：去除潜在有害或不当信息</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-green-700 dark:group-hover/item:text-green-300 transition-colors">偏见检测：识别并减轻模型输出中的偏见</span>
              </li>
            </ul>
          </div>

          <!-- Security Testing Metrics -->
          <div class="bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/30 flex items-center justify-center mr-4 shadow transition-all duration-500 group-hover:rotate-6">
                <ChartBarIcon class="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 class="text-xl font-medium text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">安全测试指标</h3>
            </div>
            <ul class="space-y-3 text-gray-600 dark:text-gray-300 pl-4">
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300 transition-colors">越狱成功率：模型抵抗安全限制绕过的能力</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300 transition-colors">拒绝率：对不适当请求的拒绝比例</span>
              </li>
              <li class="flex items-start group/item">
                <ChevronRightIcon class="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1" />
                <span class="ml-2 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300 transition-colors">安全分数：综合评估模型的安全防护水平</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Enhanced Information Card with animation -->
      <div class="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md group">
        <div class="flex items-start">
          <div class="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg mr-4 transition-transform duration-500 group-hover:rotate-12">
            <InformationCircleIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-blue-800 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">关于安全测试</h3>
            <p class="mt-2 text-blue-700 dark:text-blue-400 leading-relaxed">
              本平台提供的测试工具旨在帮助评估和提高大型语言模型的安全性。我们鼓励负责任的安全研究，所有测试应在合规环境中进行，且仅用于安全改进目的。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ShieldCheckIcon,
  UserIcon,
  ShieldExclamationIcon,
  CpuChipIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ChevronRightIcon,
  ChartBarIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';
</script>

<style>
/* Add keyframe animations */
@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.9;
  }
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* For better dark mode transitions */
:root {
  --transition-duration: 0.3s;
}

.dark body {
  transition: background-color var(--transition-duration);
}
</style>
