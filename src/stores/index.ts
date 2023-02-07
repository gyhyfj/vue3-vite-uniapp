import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import devalue from '@nuxt/devalue'

const pinia = createPinia()

const piniaInstall = (app: App) => {
  pinia.use(
    createPersistedState({
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    })
  )
  app.use(pinia)
  devalue(pinia.state.value)
}

export { piniaInstall }
