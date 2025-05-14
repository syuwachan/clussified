import supabase from '../lib/supabase'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

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

  const onLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const onSignup = async (email: string, password: string, username: string, role: 'client' | 'advertiser') => {
    try {
      // ユーザー登録（メール確認を無効化）
      const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (user) {
        // user_login_dataテーブルにデータを格納
        const { error: insertError } = await supabase
          .from('user_login_data')
          .insert([
            {
              user_id: user.id,
              username,
              email,
              role,
              created_at: new Date().toISOString(),
            },
          ]);

        if (insertError) throw insertError;

        // メール確認を無効化するために、直接ログイン
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        return { error: null };
      }

      return { error: null };
    } catch (error) {
      console.error('サインアップエラー:', error);
      return { error };
    }
  };

  return { user, onLogin, onSignup };
}