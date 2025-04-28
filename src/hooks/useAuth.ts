import supabase from '../lib/supabase'

export default function useAuth() {
  const onLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const onSignup = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })
    return { error }
  }

  return { onLogin, onSignup }
}