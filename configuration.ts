const envSettings = window as any;
export class envConfig {
  static API_URL = envSettings.VITE_API_URL;
  static TOKEN_KEY = envSettings.VITE_TOKEN_KEY;
}
