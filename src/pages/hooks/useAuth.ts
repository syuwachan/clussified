import { useState } from 'react';
import supabase from '../../lib/supabase';

const useAuth = () => {
  const onSignUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  return { onSignUp };
};

export default useAuth; 