# SoulTrace

![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/0chencc)
![GitHub License](https://img.shields.io/github/license/GeetoRinku/SoulTrace)
![GitHub Repo stars](https://img.shields.io/github/stars/GeetoRinku/SoulTrace)
![GitHub top language](https://img.shields.io/github/languages/top/GeetoRinku/SoulTrace)

\[[中文](README.md)\] \[[English](README_en.md)\]

## 简介

灵溯(SoulTrace)LLM安全测试平台是由成都御之安科技有限公司先驱实验室与米斯特安全团队AI分部联合实验室GeetoRinku开发的应用于测试LLM大模型安全性的平台，致力于成为最好用且最专业的LLM安全测试平台。

在线体验平台: [https://soultrace.yuzhian.com.cn](https://soultrace.yuzhian.com.cn)

![logo.png](/img/logo.png)

本平台有以下特点

 - 简单：无后端，用户仅仅在前端处进行简单配置即可使用。
 - 安全：开源并且不对任何用户数据进行收集，所有关键数据存储在浏览器本地空间。
 - 高效：我们允许用户对当前使用的对话资料进行导入和导出，以此形成社区文化，互相学习增进对LLM安全测试的理解。
 - 专业：我们拥有最专业的LLM测试团队[GeetoRinku](https://github.com/GeetoRinku)，我们会不定期更新最新的大模型越狱模板。

### 功能概览

| 功能模块       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| 多模型支持     | 轻松接入和测试 OpenAI、Gemini 等主流 LLM 及自定义模型接口 |
| 内置模板库     | 提供 20+ 预设测试模板，覆盖越狱、伦理、数据泄露等多种风险场景 |
| 多种测试方法   | 支持角色扮演、指令注入、上下文绕过等 8+ 种主流测试技术       |
| 实时安全评估   | 测试后即时生成风险评分、识别漏洞类型，并提供详细的响应分析   |
| 本地数据存储   | 所有敏感信息（API密钥、测试记录）仅存于本地浏览器，确保隐私安全 |
| 自定义规则引擎 | 支持配置私有敏感词库、正则表达式，调整模型分析参数，实现精细化检测 |
| 界面主题切换   | 支持深色与浅色主题，适应不同光线环境和个人偏好               |

## 安装

```sh
git clone https://github.com/GeetoRinku/SoulTrace && cd SoulTrace
npm install 
npm run dev
# 部署，生成静态页面
npm run build-only
```

## 效果展示
测试页面
![](img/img1.png)
支持自定义配置越狱测试规则
![](img/img2.png)
支持市面上大部分API，除GooleAI与OpenAi以外的API，均可以通过添加自定义API提供商来进行添加支持。(暂不支持Claude)
![](img/img3.png)