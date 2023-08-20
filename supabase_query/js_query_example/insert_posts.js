// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;

const content = "なにかしらのテキスト"
// postsテーブルにレコードを追加する
const { error } = await supabase
    .from('posts')
    .insert({ auth_id: auth_user_id, content: content });
// 嘘判定の結果をどうするかはまだ未定のため省略


// 投稿を論理削除する
const { error } = await supabase
    .from('posts')
    .update({ is_active: false })
    .eq('post_id', post_id);
