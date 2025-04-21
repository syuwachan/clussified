import supabase from '../../lib/supabase';
//新規登録処理
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

  //ログイン処理
const onLogin =async(email:string,password:string)=>{
const{data,error}=await supabase.auth.signInWithPassword({
  email,
  password,
})

if(error)throw error
return data;
}

//ログアウト処理
const onLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

  return { onSignUp,onLogin,onLogout };
};

export default useAuth; 