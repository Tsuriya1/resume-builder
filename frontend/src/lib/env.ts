type PublicEnv = {
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
};

function getPublicEnv(): PublicEnv {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  return {
    NEXT_PUBLIC_APP_URL: appUrl,
    NEXT_PUBLIC_API_URL: apiUrl,
  };
}

export const publicEnv = getPublicEnv();
