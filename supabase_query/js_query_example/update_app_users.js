// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;

// アプリ側のユーザテーブルのユーザ名を更新する
const { error } = await supabase
    .from('app_users')
    .update({ name: 'YourName' })
    .eq('auth_id', auth_user_id);


// ユーザを論理削除する
const { error } = await supabase
    .from('app_users')
    .update({ is_active: false })
    .eq('auth_id', auth_user_id);
