import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () => {
        set((state) => {
          const newTheme = !state.isDark;
          // Apply theme to document
          if (newTheme) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newTheme };
        });
      },

      setTheme: (isDark) => {
        set({ isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }),
    {
      name: 'theme-storage'
    }
  )
);

export default useThemeStore;
