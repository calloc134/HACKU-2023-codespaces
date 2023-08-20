// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;

const post_id = // いいねをつける投稿のid

// 特定の投稿にいいねをつける
const { error } = await supabase
    .from('likes')
    .upsert({ auth_id: auth_user_id, post_id: post_id, is_active: true });


// 特定の投稿にいいねを消す
const { error } = await supabase
.from('likes')
.upsert({ auth_id: auth_user_id, post_id: post_id, is_active: false });

