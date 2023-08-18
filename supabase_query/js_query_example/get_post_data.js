// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;


// ログイン中のユーザーの投稿を取得する
const { error } = await supabase
    .from('posts_view')
    .select('*')
    .eq('auth_id', auth_user_id);


// すべての投稿のうち，作成日時が新しい100件を取得する
const { data, error } = await supabase
    .from('posts_view')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
