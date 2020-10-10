import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import { App, Ref, ref, provide, inject, InjectionKey } from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

const VueReCaptchaInjectKey: InjectionKey<IReCaptchaComposition> = Symbol('VueReCaptchaInjectKey')

const globalConfig = {
  options: undefined as IReCaptchaOptions,
  loadedWaiters: [] as Array<({resolve: (resolve: boolean) => void, reject: (reject: Error) => void})>,
  error: undefined as Error | undefined
}

export const VueReCaptcha = {
  install (app: App, options: IReCaptchaOptions) {
    globalConfig.options = options
    const isLoaded = ref(false)
    const instance: Ref<ReCaptchaInstance | undefined> = ref(undefined)

    app.config.globalProperties.$recaptchaLoaded = recaptchaLoaded

    initializeReCaptcha(options).then((wrapper) => {
      instance.value = wrapper
      isLoaded.value = true

      app.config.globalProperties.$recaptcha = recaptcha
      app.config.globalProperties.$recaptchaInstance = instance

      globalConfig.loadedWaiters.forEach((v) => v.resolve(true))
    }).catch((error) => {
      globalConfig.error = error
      globalConfig.loadedWaiters.forEach((v) => v.reject(error))
    })

    provide(VueReCaptchaInjectKey, {
      instance,
      isLoaded,
      executeRecaptcha: recaptcha(instance),
      recaptchaLoaded: recaptchaLoaded(isLoaded)
    })
  }
}

export function useReCaptcha (): IReCaptchaComposition {
  return inject(VueReCaptchaInjectKey)
}

async function initializeReCaptcha (options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
  return await loadReCaptcha(options.siteKey, options.loaderOptions)
}

function recaptchaLoaded (isLoaded: Ref<boolean>) {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return () => new Promise<boolean>((resolve, reject) => {
    if (globalConfig.error !== null) {
      return reject(globalConfig.error)
    }
    if (isLoaded.value) {
      return resolve(true)
    }
    globalConfig.loadedWaiters.push({ resolve, reject })
  })
}

function recaptcha (instance: Ref<ReCaptchaInstance | undefined>) {
  return async (action: string): Promise<string> => {
    return await instance.value?.execute(action)
  }
}

export interface IReCaptchaComposition {
  isLoaded: Ref<boolean>
  instance: Ref<ReCaptchaInstance | undefined>
  executeRecaptcha: (action: string) => Promise<string>
  recaptchaLoaded: () => Promise<boolean>
}
