// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;

const post_id = // いいねをつける投稿のid

// likesテーブルにレコードを追加する
const { error } = await supabase
    .from('likes')
    .insert({ auth_id: auth_user_id, post_id: post_id });
