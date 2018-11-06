export interface IReCaptchaExecute {
  execute(action: string): Promise<string>
}
