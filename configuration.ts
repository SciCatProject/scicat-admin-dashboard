const envSettings = window as unknown as {
  API_URL: string;
  TOKEN_KEY: string;
};
export class envConfig {
  static API_URL = envSettings.API_URL;
  static TOKEN_KEY = envSettings.TOKEN_KEY;
}
