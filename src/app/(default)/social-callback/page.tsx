import { Suspense } from 'react';
import SocialCallback from './SocialCallback';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SocialCallback />
    </Suspense>
  );
}
