//メールアドレス＆パスワード&ユーザーネームによるサインアップを行うための関数

import supabase  from '@/lib/supabase';


const useAuth = () => {
	const onSignUp = async (email: string, password: string, username: string) => {
	  const { error } = await supabase.auth.signUp({
	    email,
	    password,
	    options: {
	      data: { username },
	    },
	  });
        
	  if (error) {
	    throw error;
	  }
	};
        
	return { onSignUp };
        };

export default useAuth;