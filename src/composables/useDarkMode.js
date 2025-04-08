// src/composables/useDarkMode.js
import { ref, watch, onMounted } from 'vue';

export function useDarkMode() {
  // 通过系统偏好和本地存储确定初始状态
  const isDarkMode = ref(false);

  // 切换深色模式
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    updateTheme();
  };

  // 更新主题并保存设置
  const updateTheme = () => {
    // 更新 DOM
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 保存用户偏好
    localStorage.setItem('darkMode', isDarkMode.value);
  };

  // 监听系统主题变化
  const checkSystemPreference = () => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (localStorage.getItem('darkMode') === null) {
        isDarkMode.value = darkModePreference.matches;
        updateTheme();
      }
    };

    darkModePreference.addEventListener('change', handleChange);
    return () => darkModePreference.removeEventListener('change', handleChange);
  };

  // 初始化主题
  onMounted(() => {
    // 检查本地存储
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      isDarkMode.value = savedMode === 'true';
    } else {
      // 或者使用系统偏好
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    updateTheme();
    checkSystemPreference();
  });

  return {
    isDarkMode,
    toggleDarkMode
  };
}
