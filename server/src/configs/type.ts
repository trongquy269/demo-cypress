export type AppConfig = {
  env: {
    type: 'production' | 'development';
  };
  api: {
    port: number;
    path: string;
    url: string;
  };
  auth: {
    accessToken: {
      secret: string;
      expiresIn: string;
    };
    refreshToken: {
      secret: string;
      expiresIn: string;
    };
  };
};
