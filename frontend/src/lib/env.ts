const requiredPublicVariables = ['NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_API_URL'] as const;

type PublicEnv = Record<(typeof requiredPublicVariables)[number], string>;

function getPublicEnv(): PublicEnv {
  const missing = requiredPublicVariables.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing required frontend environment variable(s): ${missing.join(', ')}`);
  }

  return {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL as string,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  };
}

export const publicEnv = getPublicEnv();

