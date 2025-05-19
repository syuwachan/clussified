import supabase from '../lib/supabase'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

type UserLoginData = {
  user_id: string;
  email: string;
  username: string;
  created_at: string;
  role: 'client' | 'advertiser';
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 現在のセッションを取得
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const onLogin = async (data: { email: string, password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    return { error };
  };

   //サインアップ処理
  const onSignup = async (email: string, user_name: string, password: string, role: 'client' | 'advertiser') => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: user_name,
            role: role,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!user) {
        throw new Error('ユーザー作成に失敗しました');
      }
      // メール確認を無効化するために、直接ログイン
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      return { error: null, data: { user } };
    } catch (error: any) {
      throw error;
    }
  };

  return { user, onSignup };
}