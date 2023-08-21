// ログイン中のユーザー情報を取得する
const user_data = await supabase.auth.getUser(); 

// ユーザid(uuid)を取得
const auth_user_id = user_data.data.user.id;


// 特定の投稿に対してコメントを作成する
const { data, error } = await supabase
    .from('comments')
    .insert([
        { 
            replying_post_id: replying_post_id, //大本の投稿のid
            auth_id: auth_user_id, 
            content: "text"
        }
    ]);

// コメントに対してコメントを作成する
const { data, error } = await supabase
    .from('comments')
    .insert([
        {
            replying_post_id: replying_post_id, //返信ツリーのてっぺんにある投稿のid
            replying_comment_id: comment_id, //返信先のコメントのid
            auth_id: auth_user_id,
            content: "text"
        }
    ]);


// 特定の投稿に対するコメント一覧を取得する
const { data, error } = await supabase
    .from('comments')
    .select("*")
    .eq("post_id", post_id);

