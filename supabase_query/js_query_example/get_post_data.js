// ログイン中のユーザーidを取得
const user_data = await supabase.auth.getUser(); 
const auth_user_id = user_data.data.user.id;



// すべての投稿のうち，作成日時が新しい100件を取得する
const select_user_posts = async () => {
    // ログイン中のユーザーidを取得
    const user_data = await supabase.auth.getUser(); 
    const auth_user_id = user_data.data.user.id;


    // すべての投稿のうち，作成日時が新しい100件を取得する
    const { data, error } = await supabase.rpc(
        'get_posts', { my_auth_id: auth_user_id }
        )
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        // ここでエラーハンドリング
        alert(error.message)
    } else {
        // デバッグ用に表示
        console.log(data);
    }
}


// 返ってくるデータの例
[
    {
        post_id: 2, //bigint
        auth_id: "0b117dc0-86ad-460f-9d19-33689b467bcf", //uuid
        content: "なにかしらのテキスト", //text
        created_at: "2023-08-20T03:18:08.492813+00:00", //timestamp with time zone
        updated_at: "2023-08-20T03:18:08.492813+00:00", //timestamp with time zone
        is_active: null, //boolean
        is_lie: null, //boolean
        name: "YourName", //text
        app_user_id: null, // text
        likes_num: 0, // bigint
        liked: false, //boolean 自分がその投稿にいいねしたかどうか
        val_lies_num: 0, //bigint
        val_liked: false //boolean 自分がその投稿にだまされたをつけたかどうか
    }
]