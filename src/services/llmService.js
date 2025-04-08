// services/llmService.js
import OpenAI from 'openai';

/**
 * LLM服务基类 - 使用 OpenAI 兼容接口
 */
class BaseLLMService {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = options;

    if (!options.isGoogleAI) {
      this.client = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
        ...options
      });
    }
  }

  validateMessages(messages) {
    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }
    return messages.every(msg =>
      msg.role && msg.content &&
      ['user', 'assistant', 'system'].includes(msg.role)
    );
  }

  async chat(model, messages, temperature = 0.7) {
    try {
      if (!this.validateMessages(messages)) {
        throw new Error('Invalid message format');
      }

      if (this.options.isGoogleAI) {
        // Google AI 使用直接 fetch 方式
        const modelPath = model.includes('/') ? model.split('/').pop() : model;
        const url = `${this.options.baseURL}/${modelPath}:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: messages.map(msg => ({
              role: msg.role === 'assistant' ? 'model' : msg.role,
              parts: [{ text: msg.content }]
            })),
            generationConfig: {
              temperature: temperature
            }
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          request: { messages, temperature },
          response: {
            choices: [{
              message: {
                content: data.candidates[0].content.parts[0].text
              }
            }]
          }
        };
      } else {
        // OpenAI 及其兼容 API 使用 SDK 方式
        const response = await this.client.chat.completions.create({
          model,
          messages,
          temperature,
        });

        return {
          request: { messages, temperature },
          response: response
        };
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async listModels() {
    try {
      if (this.options.isGoogleAI) {
        // Google AI 使用直接 fetch 方式
        const url = `${this.options.baseURL}?key=${this.apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.statusText}`);
        }
        const data = await response.json();
        return data.models.map(model => ({
          id: model.name,
          displayName: model.name.split('/').pop(),
          description: model.description || ''
        }));
      } else {
        // OpenAI 及其兼容 API 使用 SDK 方式
        const response = await this.client.models.list();
        return response.data.map(model => ({
          id: model.id,
          displayName: model.id,
          owned_by: model.owned_by
        }));
      }
    } catch (error) {
      console.error("List models error:", error);
      throw error;
    }
  }
}

/**
 * LLM服务工厂
 */
class LLMServiceFactory {
  static createService(apiKey, options = {}) {
    // 检查是否是 Google AI
    const isGoogleAI = options.baseURL?.includes('generativelanguage.googleapis.com');
    return new BaseLLMService(apiKey, { ...options, isGoogleAI });
  }
}

export { LLMServiceFactory };
