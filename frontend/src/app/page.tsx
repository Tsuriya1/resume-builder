import { publicEnv } from '@/lib/env';
import { AuthPanel } from '@/modules/auth/auth-panel';

export default function HomePage() {
  return (
    <main>
      <h1>Resume Builder</h1>
      <p>Local MVP auth bootstrap is ready.</p>
      <p>
        API base URL from env: <code>{publicEnv.NEXT_PUBLIC_API_URL}</code>
      </p>
      <AuthPanel />
    </main>
  );
}
