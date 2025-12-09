// TODO: Add all the environment variables here
export type Environment = {
  NODE_ENV: 'development' | 'production';
  API_PORT: string;
  API_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRATION_TIME: string;
};

export const getEnv = <K extends keyof Environment>(
  key: K,
  fallback?: Environment[K],
): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (value === undefined) {
    // handle fallback falsy cases that should still be used as value
    if (fallback === '') {
      return fallback;
    }
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}.`);
  }

  return value;
};
