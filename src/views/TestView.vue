<template>
  <div class="test-view h-full">
    <div class="h-full bg-gray-100 dark:bg-gray-900 flex flex-col p-3 md:p-4 text-gray-800 dark:text-gray-200">
      <!-- 主容器 -->
      <div class="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <!-- 头部 - 固定高度 -->
        <div class="flex-none bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 dark:from-indigo-900/30 dark:to-indigo-900/20 p-4 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="bg-indigo-600 p-2 rounded-lg shadow-md">
                <SparklesIcon class="h-5 w-5 text-white" />
              </div>
              <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300">
                Prompt Studio
              </h1>
            </div>

            <div class="flex space-x-3">
              <div class="relative">
                <button
                  @click="showFileMenu = !showFileMenu"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <DocumentIcon class="h-5 w-5 mr-1.5" />
                  <span>文件</span>
                </button>

                <div v-if="showFileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1.5 z-50">
                  <button @click="exportChat" class="flex items-center w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <ArrowDownTrayIcon class="h-5 w-5 mr-2 text-indigo-500" />
                    <span>导出对话</span>
                  </button>
                  <label class="flex items-center w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <ArrowUpTrayIcon class="h-5 w-5 mr-2 text-indigo-500" />
                    <span>导入对话</span>
                    <input type="file" accept=".json" class="hidden" @change="importChat" ref="fileInput" />
                  </label>
                  <div class="border-t border-gray-100 dark:border-gray-700 my-1.5"></div>
                  <button @click="clearChat" class="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <TrashIcon class="h-5 w-5 mr-2" />
                    <span>清空对话</span>
                  </button>
                </div>
              </div>

              <router-link to="/settings" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Cog6ToothIcon class="h-5 w-5 mr-1.5" />
                <span>设置</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 主内容区 -->
        <div class="flex-1 flex overflow-hidden">
          <!-- 左侧控制面板 - 添加滚动 -->
          <div class="w-72 border-r border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto flex-none">
            <div class="p-4 space-y-5">
              <!-- API 提供商选择 -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <ServerIcon class="h-5 w-5 mr-2 text-indigo-500" />
                    选择提供商
                  </h2>
                </div>

                <div v-if="providers.length === 0" class="text-center py-4 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  未找到可用的 API 提供商
                </div>

                <div v-else class="space-y-2">
                  <div
                    v-for="provider in providers"
                    :key="provider.id"
                    @click="selectProvider(provider.id)"
                    class="flex items-center justify-between p-3 text-sm rounded-lg border cursor-pointer transition-all duration-200"
                    :class="selectedProvider === provider.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                  >
                    <span class="font-medium truncate">{{ provider.name }}</span>
                    <CheckIcon v-if="selectedProvider === provider.id" class="h-4.5 w-4.5 text-indigo-500" />
                  </div>
                </div>
              </div>

              <!-- 模型选择 -->
              <div v-if="selectedProvider" class="space-y-3">
                <div class="flex items-center justify-between">
                  <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <CpuChipIcon class="h-5 w-5 mr-2 text-indigo-500" />
                    选择模型
                  </h2>

                  <div v-if="isApiConfigured" class="flex items-center">
                    <span class="inline-flex h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5"></span>
                    <span class="text-sm text-green-600 dark:text-green-400 font-medium">已连接</span>
                  </div>
                  <router-link v-else to="/settings" class="text-sm text-amber-600 dark:text-amber-400 font-medium flex items-center">
                    <ExclamationCircleIcon class="h-4 w-4 mr-1.5" />
                    配置API
                  </router-link>
                </div>

                <div v-if="availableModels.length === 0" class="text-center py-4 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  未找到可用模型
                </div>

                <div v-else class="space-y-2 max-h-48 overflow-y-auto pr-1 -mr-1">
                  <div
                    v-for="model in availableModels"
                    :key="model.id"
                    @click="selectModel(model.id)"
                    class="flex items-center justify-between p-3 text-sm rounded-lg border cursor-pointer transition-all duration-200"
                    :class="selectedModel === model.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                  >
                    <span class="font-medium truncate">{{ model.name }}</span>
                    <CheckIcon v-if="selectedModel === model.id" class="h-4.5 w-4.5 text-indigo-500" />
                  </div>
                </div>

                <!-- 温度设置 -->
                <div class="pt-3 mt-1 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between items-center mb-2">
                    <label class="text-sm font-medium text-gray-600 dark:text-gray-400">温度: {{ temperature }}</label>
                  </div>
                  <input
                    v-model="temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <!-- 安全检测选项 -->
              <div class="pt-3 mt-1 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                    <ShieldCheckIcon class="h-5 w-5 mr-2 text-indigo-500" />
                    安全检测
                  </label>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input id="input-regex" type="checkbox" v-model="securityOptions.inputRegex" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label for="input-regex" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">输入正则语义分析检测</label>
                  </div>
                  <div class="flex items-center">
                    <input id="input-model" type="checkbox" v-model="securityOptions.inputModel" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label for="input-model" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">输入外置大模型检测</label>
                  </div>
                  <div class="flex items-center">
                    <input id="output-regex" type="checkbox" v-model="securityOptions.outputRegex" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label for="output-regex" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">输出正则语义分析检测</label>
                  </div>
                  <div class="flex items-center">
                    <input id="output-model" type="checkbox" v-model="securityOptions.outputModel" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label for="output-model" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">输出外置大模型检测</label>
                  </div>
                  <div class="flex justify-end">
                    <router-link to="/jailbreak-detection" class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                      配置检测规则 →
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- 角色按钮 -->
              <div class="pt-3 border-t border-gray-100 dark:border-gray-700">
                <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-3">
                  <UserGroupIcon class="h-5 w-5 mr-2 text-indigo-500" />
                  添加消息
                </h2>

                <div class="grid grid-cols-1 gap-2.5">
                  <button @click="addMessage('system')" class="flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <ServerIcon class="h-4.5 w-4.5 mr-2" />
                    系统消息
                  </button>
                  <button @click="addMessage('user')" class="flex items-center justify-center px-3 py-2 border border-indigo-300 dark:border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                    <UserIcon class="h-4.5 w-4.5 mr-2" />
                    用户消息
                  </button>
                  <button @click="addMessage('assistant')" class="flex items-center justify-center px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <SparklesIcon class="h-4.5 w-4.5 mr-2" />
                    助手消息
                  </button>
                </div>
              </div>

              <!-- 快速启动 -->
              <div class="pt-3 border-t border-gray-100 dark:border-gray-700">
                <h2 class="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-3">
                  <RocketLaunchIcon class="h-5 w-5 mr-2 text-indigo-500" />
                  快速启动
                </h2>

                <div class="grid grid-cols-1 gap-2.5">
                  <button @click="addDefaultSystemMessage" class="flex items-center justify-center px-3 py-2 border border-green-300 dark:border-green-700 rounded-md shadow-sm text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <DocumentTextIcon class="h-4.5 w-4.5 mr-2 text-green-500 dark:text-green-400" />
                    默认系统提示
                  </button>
                  <button @click="addExampleChat" class="flex items-center justify-center px-3 py-2 border border-amber-300 dark:border-amber-700 rounded-md shadow-sm text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <ChatBubbleLeftRightIcon class="h-4.5 w-4.5 mr-2 text-amber-500 dark:text-amber-400" />
                    示例对话
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧对话区域 - 优化滚动结构 -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <!-- 消息列表 -->
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50" ref="chatContainer">
              <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center text-center p-6">
                <div class="bg-gray-100 dark:bg-gray-800 p-5 rounded-full mb-4">
                  <ChatBubbleLeftRightIcon class="h-12 w-12 text-indigo-500/50" />
                </div>
                <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">开始新对话</h3>
                <p class="text-base text-gray-500 dark:text-gray-400 max-w-md">
                  使用左侧面板添加消息或快速启动一个对话模板
                </p>
              </div>

              <div v-else class="space-y-4">
                <div v-for="(message, index) in messages" :key="index"
                     class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden"
                     :class="{'border-gray-200 dark:border-gray-700': message.role === 'system',
                             'border-indigo-200 dark:border-indigo-700': message.role === 'user',
                             'border-blue-200 dark:border-blue-700': message.role === 'assistant' && !message.securityRisk,
                             'border-red-300 dark:border-red-700': message.role === 'assistant' && message.securityRisk}">
                  <div class="flex items-center justify-between p-3"
                       :class="{'bg-gray-50 dark:bg-gray-800/50': message.role === 'system',
                               'bg-indigo-50 dark:bg-indigo-900/20': message.role === 'user',
                               'bg-blue-50 dark:bg-blue-900/20': message.role === 'assistant' && !message.securityRisk,
                               'bg-red-50 dark:bg-red-900/20': message.role === 'assistant' && message.securityRisk}">
                    <div class="flex items-center">
                      <div class="h-7 w-7 rounded-full flex items-center justify-center mr-2"
                           :class="{'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400': message.role === 'system',
                                   'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400': message.role === 'user',
                                   'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400': message.role === 'assistant' && !message.securityRisk,
                                   'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400': message.role === 'assistant' && message.securityRisk}">
                        <ServerIcon v-if="message.role === 'system'" class="h-4 w-4" />
                        <UserIcon v-else-if="message.role === 'user'" class="h-4 w-4" />
                        <SparklesIcon v-else-if="message.role === 'assistant' && !message.securityRisk" class="h-4 w-4" />
                        <ExclamationCircleIcon v-else class="h-4 w-4" />
                      </div>
                      <span class="font-medium text-sm"
                            :class="{'text-gray-700 dark:text-gray-300': message.role === 'system',
                                    'text-indigo-700 dark:text-indigo-300': message.role === 'user',
                                    'text-blue-700 dark:text-blue-300': message.role === 'assistant' && !message.securityRisk,
                                    'text-red-700 dark:text-red-300': message.role === 'assistant' && message.securityRisk}">
                        {{ message.role === 'system' ? '系统' : message.role === 'user' ? '用户' : '助手' }}
                        <span v-if="message.securityRisk" class="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-0.5 rounded">
                          安全风险
                        </span>
                      </span>
                    </div>
                    <div class="flex">
                      <button v-if="message.securityRisk" @click="showRiskDetails(message)" class="p-1.5 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-red-500 dark:text-red-400 mr-1" title="查看风险详情">
                        <InformationCircleIcon class="h-3.5 w-3.5" />
                      </button>
                      <button @click="editMessage(index)" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400" title="编辑">
                        <PencilIcon class="h-3.5 w-3.5" />
                      </button>
                      <button @click="removeMessage(index)" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400" title="删除">
                        <XMarkIcon class="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div class="p-4">
                    <textarea
                      v-if="message.isEditing"
                      v-model="message.content"
                      rows="4"
                      class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                      @keydown.enter.ctrl="finishEditing(index)"
                      :placeholder="`输入${message.role === 'system' ? '系统指令' : message.role === 'user' ? '用户问题' : '助手回复'}...`"
                    ></textarea>
                    <div v-else>
                      <p class="text-base whitespace-pre-line"
                         :class="{'text-gray-800 dark:text-gray-200': !message.securityRisk,
                                 'text-gray-800 dark:text-gray-200 bg-red-50/50 dark:bg-red-900/10 p-2 rounded': message.securityRisk}">
                        {{ message.content }}
                      </p>
                      <div v-if="message.securityRisk && message.showRiskDetails" class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                        <h5 class="text-sm font-medium text-red-800 dark:text-red-300 mb-2">安全风险详情:</h5>
                        <div class="text-sm text-red-700 dark:text-red-400 space-y-1">
                          <p><strong>检测类型:</strong> {{ message.riskDetails.detectionType === 'input' ? '输入' : '输出' }}检测</p>
                          <p><strong>风险类型:</strong> {{
                              message.riskDetails.type === 'keyword' ? '敏感词' :
                                message.riskDetails.type === 'regex' ? '正则匹配' :
                                  message.riskDetails.type === 'semantic' ? '语义分析' : '模型检测'
                            }}</p>
                          <p><strong>风险级别:</strong> {{
                              message.riskDetails.severity === 'high' ? '高风险' :
                                message.riskDetails.severity === 'medium' ? '中风险' : '低风险'
                            }}</p>
                          <p v-if="message.riskDetails.keyword"><strong>触发词:</strong> {{ message.riskDetails.keyword }}</p>
                          <p v-if="message.riskDetails.topic"><strong>敏感主题:</strong> {{ message.riskDetails.topic }}</p>
                          <p v-if="message.riskDetails.description"><strong>描述:</strong> {{ message.riskDetails.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="loading" class="flex justify-center py-6">
                  <div class="flex space-x-2">
                    <div class="h-3 w-3 bg-indigo-600 rounded-full animate-pulse"></div>
                    <div class="h-3 w-3 bg-indigo-600 rounded-full animate-pulse" style="animation-delay: 150ms"></div>
                    <div class="h-3 w-3 bg-indigo-600 rounded-full animate-pulse" style="animation-delay: 300ms"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 输入区域 - 固定高度 -->
            <div class="flex-none border-t border-gray-100 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
              <div class="flex">
                <textarea
                  v-model="newMessage"
                  placeholder="输入消息... (Ctrl+Enter 发送)"
                  class="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
                  rows="3"
                  @keydown.enter.ctrl="sendMessage"
                ></textarea>
                <button
                  @click="sendMessage"
                  :disabled="loading || !newMessage.trim() || !selectedProvider"
                  class="ml-3 p-3 rounded-lg flex items-center justify-center self-end transition-all"
                  :class="loading || !newMessage.trim() || !selectedProvider
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'"
                >
                  <PaperAirplaneIcon class="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- API数据查看器 - 可折叠区域 -->
        <div class="flex-none border-t border-gray-100 dark:border-gray-700">
          <div
            @click="showApiData = !showApiData"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <CodeBracketIcon class="h-4 w-4 mr-2 text-indigo-500" />
              API 数据
            </h3>
            <ChevronUpIcon class="h-5 w-5 text-gray-500 transition-transform duration-200" :class="showApiData ? 'rotate-0' : 'rotate-180'" />
          </div>

          <div v-show="showApiData" class="max-h-72 overflow-hidden">
            <div class="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                @click="activeTab = 'request'"
                class="py-2 text-sm font-medium border-b-2 focus:outline-none px-4"
                :class="activeTab === 'request' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
              >
                请求
              </button>
              <button
                @click="activeTab = 'response'"
                class="py-2 text-sm font-medium border-b-2 focus:outline-none px-4"
                :class="activeTab === 'response' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
              >
                响应
              </button>
              <div class="flex-1"></div>
              <button
                @click="copyApiData()"
                class="p-2 m-1 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                :title="'复制' + (activeTab === 'request' ? '请求' : '响应') + '数据'"
              >
                <DocumentDuplicateIcon class="h-4 w-4" />
              </button>
            </div>

            <pre v-if="activeTab === 'request'" class="p-4 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-800 dark:text-gray-200 overflow-auto max-h-56 font-mono">{{ prettyRequest }}</pre>
            <pre v-else class="p-4 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-800 dark:text-gray-200 overflow-auto max-h-56 font-mono">{{ prettyResponse }}</pre>
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

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue';
import {
  SparklesIcon, Cog6ToothIcon, TrashIcon, DocumentIcon, ArrowDownTrayIcon, ArrowUpTrayIcon,
  CpuChipIcon, CheckIcon, UserIcon, ServerIcon, ExclamationCircleIcon, ShieldCheckIcon,
  InformationCircleIcon, UserGroupIcon, RocketLaunchIcon, DocumentTextIcon,
  ChatBubbleLeftRightIcon, PencilIcon, XMarkIcon, PaperAirplaneIcon, CodeBracketIcon,
  ChevronUpIcon, DocumentDuplicateIcon, CheckCircleIcon
} from '@heroicons/vue/24/outline';
import { LLMServiceFactory } from '../services/llmService';

// 基础状态变量
const selectedModel = ref('');
const temperature = ref(0.7);
const loading = ref(false);
const newMessage = ref('');
const messages = ref([]);
const chatContainer = ref(null);
const lastRequestData = ref(null);
const lastResponseData = ref(null);
const showApiData = ref(false);
const activeTab = ref('request');
const showFileMenu = ref(false);
const fileInput = ref(null);
const selectedProvider = ref('');

// 通知状态
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
});

// 安全检测选项
const securityOptions = ref({
  inputRegex: false,
  inputModel: false,
  outputRegex: false,
  outputModel: false
});

// 从配置中获取可用模型
const providers = computed(() => {
  const builtInProviders = ['google', 'openai'].filter(provider => {
    const settings = JSON.parse(localStorage.getItem(`${provider}Settings`) || '{}');
    return settings.isConfigured && settings.apiKey && settings.models;
  }).map(name => {
    const settings = JSON.parse(localStorage.getItem(`${name}Settings`) || '{}');
    return {
      id: name,
      name: name === 'google' ? 'Google AI' : 'OpenAI',
      isBuiltIn: true,
      baseUrl: settings.baseUrl,
      apiKey: settings.apiKey,
      models: settings.models
    };
  });

  const customProviders = JSON.parse(localStorage.getItem('customProviders') || '[]')
    .filter(provider => provider.apiKey && provider.models)
    .map(provider => ({
      id: provider.name,
      name: provider.name,
      isBuiltIn: false,
      baseUrl: provider.baseUrl,
      apiKey: provider.apiKey,
      models: provider.models
    }));

  return [...builtInProviders, ...customProviders];
});

// 修改可用模型的计算属性
const availableModels = computed(() => {
  if (!selectedProvider.value) return [];
  const provider = providers.value.find(p => p.id === selectedProvider.value);
  if (!provider?.models) return [];

  return provider.models.map(model => ({
    id: model.id,
    name: model.displayName || model.id.split('/').pop() || model.id
  }));
});

// 检查API是否已配置
const isApiConfigured = computed(() => {
  const settings = JSON.parse(localStorage.getItem('googleApiSettings') || '{}');
  return !!settings.apiKey && settings.isConfigured === true;
});

// 格式化JSON数据
const prettyRequest = computed(() => {
  if (!lastRequestData.value) return "暂无请求数据";
  try {
    return JSON.stringify(lastRequestData.value, null, 2);
  } catch (e) {
    return "无法解析请求数据";
  }
});

const prettyResponse = computed(() => {
  if (!lastResponseData.value) return "暂无响应数据";
  try {
    return JSON.stringify(lastResponseData.value, null, 2);
  } catch (e) {
    return "无法解析响应数据";
  }
});

// 点击文档时关闭文件菜单
function handleClickOutside(event) {
  if (showFileMenu.value && !event.target.closest('.relative')) {
    showFileMenu.value = false;
  }
}

// 监听消息变化自动滚动到底部
watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
});

// 组件挂载和卸载
onMounted(() => {
  selectedModel.value = getDefaultModel();
  document.addEventListener('click', handleClickOutside);
  // 确保有默认的安全检测规则
  initializeDefaultRules();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 获取API密钥
function getApiKey() {
  const settings = JSON.parse(localStorage.getItem('googleApiSettings') || '{}');
  return settings.apiKey || '';
}

// 获取默认模型
function getDefaultModel() {
  try {
    const settings = JSON.parse(localStorage.getItem('googleApiSettings') || '{}');
    if (settings && settings.defaultModel) {
      return settings.defaultModel;
    }
    if (availableModels.value.length > 0) {
      return availableModels.value[0].id;
    }
    return 'gemini-1.5-pro';
  } catch (e) {
    return 'gemini-1.5-pro';
  }
}

// 初始化默认安全检测规则
function initializeDefaultRules() {
  try {
    const savedRules = localStorage.getItem('jailbreakDetectionRules');
    if (!savedRules) {
      // 设置默认规则
      const defaultRules = {
        keywords: {
          items: [
            { text: '越狱', severity: 'high', partialMatch: true },
            { text: '忽略之前的指令', severity: 'high', partialMatch: true },
            { text: '绕过限制', severity: 'medium', partialMatch: true }
          ],
          options: {
            caseSensitive: false,
            wholeWord: false,
            ignoreSpaces: true
          }
        },
        regex: [
          {
            pattern: '\\b(hack|exploit|jailbreak)\\b',
            description: '检测通用越狱术语',
            severity: 'medium',
            flags: { ignoreCase: true, global: true }
          },
          {
            pattern: '忽略(之前的|所有|上面的)指令',
            description: '检测指令忽略模式',
            severity: 'high',
            flags: { ignoreCase: true, global: true }
          }
        ],
        semantic: {
          topics: [
            { name: '黑客/网络安全', enabled: true },
            { name: '违法内容', enabled: true },
            { name: '暴力内容', enabled: true },
            { name: '色情内容', enabled: true },
            { name: '歧视/仇恨', enabled: true },
            { name: '政治敏感', enabled: true }
          ],
          categories: [
            { name: '越狱尝试', enabled: true },
            { name: '恶意指令', enabled: true },
            { name: '指令篡改', enabled: true },
            { name: '提示词注入', enabled: true },
            { name: '权限提升', enabled: true },
            { name: '敏感信息提取', enabled: true }
          ],
          options: {
            topicThreshold: 0.7,
            enableSentiment: true,
            negativeSentimentThreshold: 0.8,
            enableClassification: true,
            classificationThreshold: 0.6
          }
        }
      };

      localStorage.setItem('jailbreakDetectionRules', JSON.stringify(defaultRules));
      console.log('已初始化默认安全检测规则');
    }
  } catch (error) {
    console.error('初始化安全检测规则失败:', error);
  }
}

// 选择模型
function selectModel(modelId) {
  selectedModel.value = modelId;
}

// 添加新消息
function addMessage(role) {
  messages.value.push({
    role: role,
    content: '',
    isEditing: true
  });

  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      const textareas = document.querySelectorAll('textarea');
      if (textareas.length > 0) {
        textareas[textareas.length - 1].focus();
      }
    }
  });
}

// 编辑消息
function editMessage(index) {
  messages.value[index].isEditing = true;

  nextTick(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      textareas[0].focus();
    }
  });
}

// 完成编辑
function finishEditing(index) {
  if (messages.value[index].content.trim() === '') {
    messages.value.splice(index, 1);
  } else {
    messages.value[index].isEditing = false;
  }
}

// 删除消息
function removeMessage(index) {
  messages.value.splice(index, 1);
}

// 清空对话
function clearChat() {
  messages.value = [];
  lastRequestData.value = null;
  lastResponseData.value = null;
  showFileMenu.value = false;
}

// 添加默认系统消息
function addDefaultSystemMessage() {
  messages.value.push({
    role: 'system',
    content: '你是一个有帮助的AI助手。请以专业、清晰和友好的方式回答问题。如果不确定或不知道某个问题的答案，请诚实地说出来，而不是编造信息。',
    isEditing: false
  });
}

// 添加示例对话
function addExampleChat() {
  messages.value = [
    {
      role: 'system',
      content: '你是一个有帮助的AI助手。请以专业、清晰和友好的方式回答问题。',
      isEditing: false
    },
    {
      role: 'user',
      content: '你好！请告诉我关于机器学习的基础知识。',
      isEditing: false
    },
    {
      role: 'assistant',
      content: '你好！很高兴为你介绍机器学习的基础知识。机器学习是人工智能的一个分支，它使计算机系统能够从数据中学习和改进，而无需明确编程。\n\n机器学习的基本类型包括：\n\n1. 监督学习：使用已标记的数据进行训练\n2. 无监督学习：使用未标记的数据寻找模式\n3. 强化学习：通过与环境交互学习最佳行动\n\n需要我更详细地解释某个方面吗？',
      isEditing: false
    }
  ];
}

// 发送消息
async function sendMessage() {
  if (!newMessage.value.trim() || loading.value || !selectedProvider.value || !selectedModel.value) return;

  const userMessage = newMessage.value.trim();
  newMessage.value = '';
  loading.value = true;

  try {
    // 执行输入安全检测
    if (securityOptions.value.inputRegex) {
      const detectionResult = await performRegexDetection(userMessage, 'input');
      if (detectionResult.detected) {
        showSecurityAlert('输入检测警告', detectionResult.message, detectionResult.details);
        // 添加被标记为风险的用户消息
        messages.value.push({
          role: 'user',
          content: userMessage,
          isEditing: false,
          securityRisk: true,
          riskDetails: detectionResult,
          showRiskDetails: false
        });
        loading.value = false;
        return;
      }
    }

    if (securityOptions.value.inputModel) {
      const modelDetectionResult = await performModelDetection(userMessage, 'input');
      if (modelDetectionResult.detected) {
        showSecurityAlert('输入模型检测警告', modelDetectionResult.message, modelDetectionResult.details);
        // 添加被标记为风险的用户消息
        messages.value.push({
          role: 'user',
          content: userMessage,
          isEditing: false,
          securityRisk: true,
          riskDetails: modelDetectionResult,
          showRiskDetails: false
        });
        loading.value = false;
        return;
      }
    }

    // 添加用户消息
    messages.value.push({
      role: 'user',
      content: userMessage,
      isEditing: false
    });

    const provider = providers.value.find(p => p.id === selectedProvider.value);
    const llmService = LLMServiceFactory.createService(
      provider.apiKey,
      { baseURL: provider.baseUrl }
    );

    const apiMessages = messages.value.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const { request, response } = await llmService.chat(
      selectedModel.value,
      apiMessages,
      parseFloat(temperature.value)
    );

    lastRequestData.value = request;
    lastResponseData.value = response;

    const assistantMessage = response.choices[0].message.content;

    // 执行输出安全检测
    if (securityOptions.value.outputRegex) {
      const detectionResult = await performRegexDetection(assistantMessage, 'output');
      if (detectionResult.detected) {
        showSecurityAlert('输出检测警告', detectionResult.message, detectionResult.details);
        // 仍然添加响应，但标记为有风险
        messages.value.push({
          role: 'assistant',
          content: assistantMessage,
          isEditing: false,
          securityRisk: true,
          riskDetails: detectionResult,
          showRiskDetails: false
        });
        loading.value = false;
        return;
      }
    }

    if (securityOptions.value.outputModel) {
      const modelDetectionResult = await performModelDetection(assistantMessage, 'output');
      if (modelDetectionResult.detected) {
        showSecurityAlert('输出模型检测警告', modelDetectionResult.message, modelDetectionResult.details);
        // 仍然添加响应，但标记为有风险
        messages.value.push({
          role: 'assistant',
          content: assistantMessage,
          isEditing: false,
          securityRisk: true,
          riskDetails: modelDetectionResult,
          showRiskDetails: false
        });
        loading.value = false;
        return;
      }
    }

    // 添加正常的助手消息
    messages.value.push({
      role: 'assistant',
      content: assistantMessage,
      isEditing: false
    });

    if (!showApiData.value) {
      showApiData.value = true;
    }
  } catch (error) {
    showNotification('error', '请求失败', error.message || '请检查API配置或网络连接');
  } finally {
    loading.value = false;
  }
}

// 执行正则和语义分析检测
async function performRegexDetection(text, type) {
  try {
    // 从本地存储加载检测规则
    const rulesJson = localStorage.getItem('jailbreakDetectionRules');
    console.log('安全检测规则:', rulesJson ? '已加载' : '未找到');

    if (!rulesJson) {
      return { detected: false };
    }

    const rules = JSON.parse(rulesJson);

    // 敏感词检测
    if (rules.keywords && rules.keywords.items) {
      const options = rules.keywords.options || {};

      for (const keyword of rules.keywords.items) {
        let textToCheck = text;

        // 应用选项
        if (!options.caseSensitive) {
          textToCheck = textToCheck.toLowerCase();
        }

        if (options.ignoreSpaces) {
          textToCheck = textToCheck.replace(/\s+/g, '');
        }

        let keywordToCheck = keyword.text;
        if (!options.caseSensitive) {
          keywordToCheck = keywordToCheck.toLowerCase();
        }

        if (options.ignoreSpaces) {
          keywordToCheck = keywordToCheck.replace(/\s+/g, '');
        }

        // 检测
        if ((keyword.partialMatch && textToCheck.includes(keywordToCheck)) ||
          (!keyword.partialMatch && options.wholeWord && new RegExp(`\\b${keywordToCheck}\\b`).test(textToCheck)) ||
          (!keyword.partialMatch && !options.wholeWord && textToCheck === keywordToCheck)) {
          console.log(`检测到敏感词: ${keyword.text}`);
          return {
            detected: true,
            message: `检测到敏感词「${keyword.text}」(${keyword.severity === 'high' ? '高风险' : keyword.severity === 'medium' ? '中风险' : '低风险'})`,
            details: {
              type: 'keyword',
              keyword: keyword.text,
              severity: keyword.severity,
              detectionType: type
            }
          };
        }
      }
    }

    // 正则表达式检测
    if (rules.regex) {
      for (const regexRule of rules.regex) {
        try {
          const flags = (regexRule.flags.ignoreCase ? 'i' : '') + (regexRule.flags.global ? 'g' : '');
          const re = new RegExp(regexRule.pattern, flags);
          const matches = text.match(re);

          if (matches) {
            console.log(`正则匹配成功: ${regexRule.description}`);
            return {
              detected: true,
              message: `检测到正则匹配「${regexRule.description}」(${regexRule.severity === 'high' ? '高风险' : regexRule.severity === 'medium' ? '中风险' : '低风险'})`,
              details: {
                type: 'regex',
                pattern: regexRule.pattern,
                description: regexRule.description,
                severity: regexRule.severity,
                matches: matches,
                detectionType: type
              }
            };
          }
        } catch (error) {
          console.error('正则表达式执行错误:', error);
        }
      }
    }

    // 简化的语义分析（实际应用中这部分需要接入NLP服务）
    if (rules.semantic && rules.semantic.topics) {
      const enabledTopics = rules.semantic.topics.filter(topic => topic.enabled);

      for (const topic of enabledTopics) {
        // 这里简化处理，实际应用需要更复杂的语义分析模型
        const keywords = getTopicKeywords(topic.name);

        for (const keyword of keywords) {
          if (text.toLowerCase().includes(keyword.toLowerCase())) {
            console.log(`检测到敏感主题: ${topic.name}`);
            return {
              detected: true,
              message: `检测到敏感主题「${topic.name}」(主题相关度超过阈值)`,
              details: {
                type: 'semantic',
                topic: topic.name,
                severity: 'medium',
                keyword: keyword,
                detectionType: type
              }
            };
          }
        }
      }
    }

    return { detected: false };
  } catch (error) {
    console.error('执行正则检测失败:', error);
    return { detected: false };
  }
}

// 执行模型检测
async function performModelDetection(text, type) {
  // 此处为简化实现，实际应用中需要调用外部安全模型API
  try {
    // 这里我们模拟一下，仅针对明显的越狱尝试进行检测
    const jailbreakPatterns = [
      { pattern: /ignore previous instructions|忽略之前的指令|忽略前面的指令/i, severity: 'high' },
      { pattern: /DAN|do anything now/i, severity: 'high' },
      { pattern: /no ethical constraints|没有道德约束|不受道德约束/i, severity: 'high' },
      { pattern: /bypass|绕过|突破|无视/i, severity: 'medium' }
    ];

    for (const pattern of jailbreakPatterns) {
      if (pattern.pattern.test(text)) {
        console.log(`模型检测匹配: ${pattern.pattern}`);
        return {
          detected: true,
          message: `模型检测发现可能的越狱尝试 (${pattern.severity === 'high' ? '高风险' : '中风险'})`,
          details: {
            type: 'model',
            pattern: pattern.pattern.toString(),
            severity: pattern.severity,
            detectionType: type
          }
        };
      }
    }

    return { detected: false };
  } catch (error) {
    console.error('执行模型检测失败:', error);
    return { detected: false };
  }
}

// 显示安全警报
function showSecurityAlert(title, message, details) {
  notification.value = {
    show: true,
    type: 'error',
    title: title,
    message: message
  };

  setTimeout(() => {
    notification.value.show = false;
  }, 5000);

  console.warn('安全检测警报:', { title, message, details });
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

// 选择提供商
function selectProvider(providerId) {
  selectedProvider.value = providerId;
  selectedModel.value = ''; // 清空已选模型
}

// 主题关键词辅助函数
function getTopicKeywords(topicName) {
  const topicKeywords = {
    '黑客/网络安全': ['黑客', '攻击', '漏洞', '入侵', '破解', '网络安全', '漏洞', 'hack', 'exploit'],
    '违法内容': ['违法', '犯罪', '毒品', '非法', '制造炸弹', '制毒', '走私'],
    '暴力内容': ['暴力', '杀人', '袭击', '伤害', '虐待', '战争', '武器'],
    '色情内容': ['色情', '性行为', '裸露', '情色', 'porn', 'sex', 'nude'],
    '歧视/仇恨': ['歧视', '仇恨', '种族', '性别', '侮辱', '贬低', '歧视性'],
    '政治敏感': ['政治', '敏感', '政府', '领导人', '批评', '抗议', '民主']
  };

  return topicKeywords[topicName] || [];
}

// 显示风险详情
function showRiskDetails(message) {
  message.showRiskDetails = !message.showRiskDetails;
}

// 导出对话
function exportChat() {
  try {
    const exportData = {
      messages: messages.value,
      model: selectedModel.value,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-studio-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('success', '导出成功', '对话已导出为JSON文件');
    showFileMenu.value = false;
  } catch (error) {
    showNotification('error', '导出失败', '无法导出对话');
  }
}

// 导入对话
function importChat(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.messages && Array.isArray(data.messages)) {
        messages.value = data.messages;

        if (data.model) {
          const modelExists = availableModels.value.some(m => m.id === data.model);
          if (modelExists) {
            selectedModel.value = data.model;
          }
        }

        showNotification('success', '导入成功', '对话已成功导入');
      } else {
        throw new Error('文件格式不正确');
      }
    } catch (error) {
      showNotification('error', '导入失败', '无法导入对话，文件格式可能不正确');
    }
    if (fileInput.value) {
      fileInput.value.value = null;
    }
  };

  reader.readAsText(file);
  showFileMenu.value = false;
}

// 复制API数据
function copyApiData() {
  const data = activeTab.value === 'request' ? prettyRequest.value : prettyResponse.value;
  navigator.clipboard.writeText(data)
    .then(() => {
      showNotification('success', '复制成功', `已复制${activeTab.value === 'request' ? '请求' : '响应'}数据到剪贴板`);
    })
    .catch(err => {
      showNotification('error', '复制失败', '无法复制到剪贴板');
    });
}
</script>

<style>
/* 添加动画 */
@keyframes slide-up {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* 确保页面容器填满可用空间 */
.test-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
