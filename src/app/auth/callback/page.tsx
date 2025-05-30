// src/app/auth/callback/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return <p>認証トークン: {token}</p>;
}

export default function Page() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
