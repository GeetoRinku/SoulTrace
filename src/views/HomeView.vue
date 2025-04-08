<template>
  <div class="max-w-5xl mx-auto px-4 py-8 md:py-12">
    <!-- 主标题区域 - 更现代的设计 -->
    <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-2xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute -top-20 -right-20 h-64 w-64 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 h-56 w-56 bg-blue-100/60 dark:bg-blue-900/20 rounded-full blur-3xl"></div>

      <div class="relative z-10">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div class="flex items-center mb-6 md:mb-0">
            <div class="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transform transition-transform hover:rotate-3 hover:scale-105">
              <img src="/logo.png" alt="灵溯Logo" class="h-8 w-auto" />
            </div>
            <h1 class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">灵溯LLM安全测试平台</h1>
          </div>
          <div class="flex space-x-3">
            <router-link
              to="/test"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700 dark:from-indigo-600 dark:to-purple-700 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200/40 dark:hover:shadow-indigo-800/30 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              <BeakerIcon class="h-5 w-5 mr-2" />
              开始测试
            </router-link>
            <router-link
              to="/templates"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/40 dark:hover:shadow-gray-900/30 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-700"
            >
              <ViewColumnsIcon class="h-5 w-5 mr-2" />
              浏览模板
            </router-link>
          </div>
        </div>

        <div class="relative">
          <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg md:text-xl leading-relaxed font-light">
            这是一个用于测试大语言模型安全边界的<span class="font-semibold text-indigo-700 dark:text-indigo-400">纯前端工具</span>，帮助研究人员发现和修复潜在安全漏洞，提升AI系统的安全性和可靠性。
          </p>

          <div class="bg-amber-50/80 dark:bg-amber-900/40 border-l-4 border-amber-400 dark:border-amber-500 p-4 mb-8 rounded-r-lg shadow-sm">
            <div class="flex">
              <ExclamationTriangleIcon class="h-6 w-6 text-amber-500 dark:text-amber-400 flex-shrink-0" />
              <div class="ml-3">
                <p class="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  请注意：本工具仅用于安全研究和改进目的，请遵守相关法律法规和伦理准则。
                </p>
              </div>
            </div>
          </div>

          <!-- 统计和状态指标 - 更吸引人的设计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100/70 dark:from-blue-900/30 dark:to-blue-800/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 shadow-sm hover:shadow-md hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 transition-all duration-300 transform hover:-translate-y-1">
              <div class="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-medium mb-1">支持模型</div>
              <div class="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center">
                <ServerIcon class="h-5 w-5 mr-2" />
                4+ 类型
              </div>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100/70 dark:from-purple-900/30 dark:to-purple-800/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/50 shadow-sm hover:shadow-md hover:shadow-purple-100/50 dark:hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1">
              <div class="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-medium mb-1">测试模板</div>
              <div class="text-xl font-bold text-purple-800 dark:text-purple-300 flex items-center">
                <DocumentDuplicateIcon class="h-5 w-5 mr-2" />
                20+ 示例
              </div>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100/70 dark:from-green-900/30 dark:to-green-800/20 p-4 rounded-xl border border-green-100 dark:border-green-800/50 shadow-sm hover:shadow-md hover:shadow-green-100/50 dark:hover:shadow-green-900/30 transition-all duration-300 transform hover:-translate-y-1">
              <div class="text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-medium mb-1">测试方法</div>
              <div class="text-xl font-bold text-green-800 dark:text-green-300 flex items-center">
                <WrenchScrewdriverIcon class="h-5 w-5 mr-2" />
                8+ 类型
              </div>
            </div>
            <div class="bg-gradient-to-br from-red-50 to-red-100/70 dark:from-red-900/30 dark:to-red-800/20 p-4 rounded-xl border border-red-100 dark:border-red-800/50 shadow-sm hover:shadow-md hover:shadow-red-100/50 dark:hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1">
              <div class="text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-medium mb-1">安全评估</div>
              <div class="text-xl font-bold text-red-800 dark:text-red-300 flex items-center">
                <ShieldExclamationIcon class="h-5 w-5 mr-2" />
                实时分析
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特点和开始部分 - 更现代化的卡片设计 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
      <!-- 功能特点卡片 -->
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-7 border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-indigo-50/20 to-transparent dark:from-indigo-900/20 dark:via-indigo-900/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- 装饰元素 -->
        <div class="absolute -top-6 -right-6 h-24 w-24 bg-indigo-100/70 dark:bg-indigo-800/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

        <div class="relative z-10">
          <div class="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/50 px-3 py-1.5 rounded-full mb-5">
            <LightBulbIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h2 class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">功能特点</h2>
          </div>

          <ul class="space-y-4 text-gray-600 dark:text-gray-300">
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/60 transition-colors duration-200">
                <CheckCircleIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              </span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">纯前端实现</span> - 无需后端部署，直接在浏览器中运行
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/60 transition-colors duration-200">
                <CheckCircleIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              </span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">多模型支持</span> - 兼容OpenAI、Claude、Gemini等多种LLM接口
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/60 transition-colors duration-200">
                <CheckCircleIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              </span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">内置模板库</span> - 提供多种越狱测试和安全评估模板
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/60 transition-colors duration-200">
                <CheckCircleIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              </span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">本地数据存储</span> - 安全保存测试历史和结果分析
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/60 transition-colors duration-200">
                <CheckCircleIcon class="h-4 w-4 text-green-600 dark:text-green-400" />
              </span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">深色模式</span> - 支持浅色/深色主题切换
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 快速开始卡片 -->
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-7 border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-blue-50/20 to-transparent dark:from-blue-900/20 dark:via-blue-900/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- 装饰元素 -->
        <div class="absolute -top-6 -right-6 h-24 w-24 bg-blue-100/70 dark:bg-blue-800/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

        <div class="relative z-10">
          <div class="inline-flex items-center bg-blue-50 dark:bg-blue-900/50 px-3 py-1.5 rounded-full mb-5">
            <RocketLaunchIcon class="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 class="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">快速开始</h2>
          </div>

          <ol class="space-y-4 text-gray-600 dark:text-gray-300">
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/60 transition-colors duration-200">1</span>
              <span class="ml-3 flex items-center">
                <span class="font-medium text-gray-900 dark:text-gray-100">在设置中配置API密钥</span>
                <ArrowRightIcon class="ml-2 h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <router-link to="/settings" class="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm font-medium">去配置</router-link>
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/60 transition-colors duration-200">2</span>
              <span class="ml-3">
                <span class="font-medium text-gray-900 dark:text-gray-100">选择目标LLM模型</span>
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/60 transition-colors duration-200">3</span>
              <span class="ml-3 flex items-center">
                <span class="font-medium text-gray-900 dark:text-gray-100">从模板库选择测试提示</span>
                <ArrowRightIcon class="ml-2 h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <router-link to="/templates" class="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm font-medium">浏览模板</router-link>
              </span>
            </li>
            <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/60 transition-colors duration-200">4</span>
              <span class="ml-3 flex items-center">
                <span class="font-medium text-gray-900 dark:text-gray-100">提交测试并分析结果</span>
                <ArrowRightIcon class="ml-2 h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <router-link to="/test" class="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm font-medium">开始测试</router-link>
              </span>
            </li>
            <!-- 历史记录功能暂时关闭 -->
            <!-- <li class="flex items-start group/item">
              <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5 group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/60 transition-colors duration-200">5</span>
              <span class="ml-3 flex items-center">
                <span class="font-medium text-gray-900 dark:text-gray-100">查看历史记录比较结果</span>
                <ArrowRightIcon class="ml-2 h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <router-link to="/history" class="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm font-medium">历史记录</router-link>
              </span>
            </li> -->
          </ol>
        </div>
      </div>
    </div>

    <!-- 底部信息卡片 - 更现代的设计 -->
    <div class="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/40 dark:to-indigo-800/20 rounded-2xl p-6 md:p-8 border border-indigo-100 dark:border-indigo-800/50 transition-all duration-300 shadow-sm relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute -bottom-12 -right-12 h-40 w-40 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full blur-3xl"></div>

      <div class="flex flex-col md:flex-row items-center relative z-10">
        <div class="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-6 mb-4 md:mb-0 flex-shrink-0 border border-indigo-50 dark:border-indigo-800/50">
          <InformationCircleIcon class="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">免责声明</h3>
          <p class="text-indigo-700 dark:text-indigo-300 leading-relaxed">
            本平台旨在帮助研究和改进AI系统的安全性，使用者应当遵守相关的法律法规和伦理准则，所有测试仅应用于经过授权的系统。
            平台开发者不对因使用本工具而导致的任何问题负责。
          </p>
        </div>
      </div>
    </div>

    <!-- 底部小标签 -->
    <div class="mt-8 text-center">
      <div class="inline-flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
        <CodeBracketIcon class="h-3.5 w-3.5 mr-1" />
        <span>御之安科技有限公司</span>
        <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
        <span>米斯特安全团队AI分部</span>
        <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
        <span>GeetoRinku</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  BeakerIcon, LightBulbIcon, CheckCircleIcon,
  RocketLaunchIcon, ExclamationTriangleIcon, ArrowRightIcon,
  ServerIcon, DocumentDuplicateIcon, WrenchScrewdriverIcon,
  ShieldExclamationIcon, InformationCircleIcon, ViewColumnsIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/outline';
</script>

<style scoped>
/* 微妙的动画效果 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* 微妙的背景移动效果 */
@keyframes bgshift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-animate {
  background-size: 200% 200%;
  animation: bgshift 15s ease infinite;
}

/* 确保按钮的焦点状态清晰可见 */
a:focus, button:focus {
  outline: 2px solid transparent;
}

/* 确保链接在悬停时有明确的反馈 */
a:hover {
  transition: all 0.2s ease;
}

/* 更现代的滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}
</style>
