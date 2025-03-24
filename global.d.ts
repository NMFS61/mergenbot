
declare module 'next/config' {
  type ConfigTypes = () => {
    publicRuntimeConfig: {
      isProduction: boolean;
      isDevelopment: boolean;
      rootDataDir: string;
    };
    serverRuntimeConfig: {
      appHost: string;
    };
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
