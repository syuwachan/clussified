import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { createClient, Session, User } from '@supabase/supabase-js';
import { redirect, useRouter } from 'next/navigation';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (formData: FormData) => {
    // フォームからデータ取得
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    // サインアップ
    const { error } = await supabase.auth.signUp(data)
  
    // サインアップエラーの場合
    if (error) {
      return { error };
    }
  
    // トップページのlayoutを再検証
 
    // トップページへリダイレクト
    redirect('/')
  }

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return {
    user,
    signup,
    signIn,
    signOut,
  };
}