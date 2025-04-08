<template>
  <div class="space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
        <UserGroupIcon class="h-7 w-7 text-indigo-600 dark:text-indigo-400 mr-3" />
        关于我们
      </h1>

      <!-- 团队信息 -->
      <div class="mb-10">
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800 transition-all duration-200 hover:shadow-md">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="mb-6 md:mb-0 text-center md:text-left">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">GeetoRinku团队</h2>
              <p class="text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed text-base">
                我们是一群专注于人工智能安全领域的研究人员和工程师，致力于确保AI技术安全可靠地为人类服务。团队由米斯特安全团队、米斯特安全团队AI分部和御之安先驱实验室组成，团队建立的初衷是为了探索更多AI领域的安全问题，并提供解决方案。
              </p>
              <div class="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <span class="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">大型语言模型</span>
                <span class="px-4 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm">AI安全</span>
                <span class="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm">红队测试</span>
                <span class="px-4 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm">可靠性研究</span>
              </div>
            </div>

            <div class="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/GeetoRinku" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://x.com/0chencc" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="mailto:admin@yuzhian.com.cn" class="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors transform hover:scale-110">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 团队组成 -->
      <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
          <PuzzlePieceIcon class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          团队组成
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 米斯特安全团队 -->
          <!-- <div class="bg-white dark:bg-gray-800/80 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 group">
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 shadow-sm group-hover:rotate-3 transition-all duration-300">
                <ShieldCheckIcon class="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">米斯特安全团队</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  专注于网络安全研究的核心团队，为AI系统提供全方位的安全防护方案，进行漏洞挖掘与风险评估。
                </p>
              </div>
            </div>
          </div> -->

          <!-- 御之安先驱实验室 -->
          <div class="bg-white dark:bg-gray-800/80 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 group">
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4 shadow-sm group-hover:rotate-3 transition-all duration-300">
                <CodeBracketIcon class="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">御之安先驱实验室</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  为网络安全领域所有先进技术提供测试与研究，为网络安全领域提供先进技术，目前的研究方向是AI安全与隐私保护。
                </p>
              </div>
            </div>
          </div>

          <!-- 米斯特安全团队AI分部 -->
          <div class="bg-white dark:bg-gray-800/80 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 group">
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4 shadow-sm group-hover:rotate-3 transition-all duration-300">
                <CpuChipIcon class="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">米斯特安全团队AI分部</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  人工智能技术研究小组，专注于大型语言模型的安全性研究、AI对齐技术开发和安全防护框架设计。
                </p>
              </div>
            </div>
          </div>

          <!-- 御之安科技有限公司 -->
          <!-- <div class="bg-white dark:bg-gray-800/80 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 group">
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 shadow-sm group-hover:rotate-3 transition-all duration-300">
                <BuildingOffice2Icon class="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">御之安科技有限公司</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  在网络安全领域有着丰富的经验，提供专业的企业级解决方案。
                </p>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <EnvelopeIcon class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          联系方式
        </h2>

        <div class="flex flex-wrap gap-4 items-center">
          <a href="mailto:admin@yuzhian.com.cn" class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <EnvelopeIcon class="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>admin@yuzhian.com.cn</span>
          </a>

          <a href="https://github.com/0chencc" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <svg class="h-5 w-5 mr-2 text-gray-700 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>github.com/0chencc</span>
          </a>

          <a href="https://x.com/0chencc" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <svg class="h-5 w-5 mr-2 text-gray-700 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            <span>x.com/0chencc</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 rounded-lg shadow-sm mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
          <div class="flex items-center mb-3 md:mb-0">
            <img src="/logo.png" alt="灵溯Logo" class="h-5 w-auto mr-2" />
            <p>灵溯LLM安全测试平台 © {{ new Date().getFullYear() }} - 仅用于安全研究目的</p>
          </div>
          <div class="flex flex-wrap justify-center gap-x-4 text-xs">
            <!-- <span class="flex items-center"><UserGroupIcon class="h-3 w-3 mr-1" />米斯特安全团队</span> -->
            <span class="flex items-center"><BuildingOffice2Icon class="h-3 w-3 mr-1" />御之安科技有限公司</span>
            <span class="flex items-center"><SparklesIcon class="h-3 w-3 mr-1" />米斯特安全团队AI分部</span>
            <span class="flex items-center"><CodeBracketIcon class="h-3 w-3 mr-1" />GeetoRinku</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {
  EnvelopeIcon,
  LinkIcon,
  UserGroupIcon,
  CodeBracketIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  CpuChipIcon,
  PuzzlePieceIcon
} from '@heroicons/vue/24/outline';
</script>

<style>
/* 添加一些过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 卡片悬停效果 */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 变换效果 */
.transform {
  transform-origin: center;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}

/* 暗模式适配优化 */
@media (prefers-color-scheme: dark) {
  .hover\:shadow-md:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
}
</style>
