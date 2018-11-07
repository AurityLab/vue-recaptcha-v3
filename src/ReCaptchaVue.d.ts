import Vue from 'vue'

declare module 'vue/types/vue' {
  // tslint:disable-next-line:interface-name
  interface Vue {
    $recaptcha(action: string): Promise<string>
  }
}
