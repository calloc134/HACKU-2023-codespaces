// ログイン中のユーザー情報を取得する
const user_data = await supabase.auth.getUser(); 

// ユーザid(uuid)を取得
const auth_user_id = user_data.data.user.id;
