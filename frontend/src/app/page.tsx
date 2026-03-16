import { publicEnv } from '@/lib/env';

export default function HomePage() {
  return (
    <main>
      <h1>Resume Builder</h1>
      <p>Frontend scaffold is ready.</p>
      <p>
        API base URL from env: <code>{publicEnv.NEXT_PUBLIC_API_URL}</code>
      </p>
    </main>
  );
}

