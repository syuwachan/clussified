import supabase from '../lib/supabase'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    // 初期状態を設定
    if (typeof window !== 'undefined') {
      return {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: {
          username: 'テストユーザー'
        },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: 'authenticated'
      } as unknown as User;
    }
    return null;
  });

  useEffect(() => {
    // クライアントサイドでのみユーザーを設定
    if (typeof window !== 'undefined') {
      const testUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: {
          username: 'テストユーザー'
        },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: 'authenticated'
      } as unknown as User;
      setUser(testUser);
    }
  }, []);

  const onLogin = async () => {
    return { error: null };
  }

  const onSignup = async () => {
    return { error: null };
  }

  return { user, onLogin, onSignup }
}