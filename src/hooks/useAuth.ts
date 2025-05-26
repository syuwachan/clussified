import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

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

  const signUp = async (email: string, password: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    
    if (authError) {
      return { error: authError };
    }

    if (authData.user) {
      // usersテーブルにユーザー情報を保存
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            created_at: new Date().toISOString(),
          }
        ]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        return { error: profileError };
      }
    }

    return { data: authData, error: null };
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
  };
}