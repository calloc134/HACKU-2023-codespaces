// 画像をアップロードする
// アップロードした画像はsupabaseのストレージに保存される
// ストレージへのURLはDBに保存する
const handleImageChange = async (event) => {
  if (!event.target.files || event.target.files.length == 0) {
    // 画像が選択されていないのでreturn
    return;
  }

  const file = event.target.files[0]; // 選択された画像を取得
  const user_data = await supabase.auth.getUser(); // ログイン中のユーザー情報を取得
  const filePath = `${user_data.data.user.id}/${file.name}`; // 画像の保存先のpathを指定 authユーザーIDのフォルダの中にファイルを保存
  const { error } = await supabase.storage.from("icons").upload(filePath, file);
  if (error) {
    // ここでエラーハンドリング
    alert(error.message);
  } else {
    alert("画像をアップロードしました");
  }
  // 画像のURLを取得
  const { data } = supabase.storage.from("my_bucket").getPublicUrl(filePath);
  const icon_url = data.publicUrl;

  // 画像のURLをDBに保存
  const { error: databaseError } = await supabase
    .from("app_users")
    .update({ icon_url: icon_url })
    .eq("id", user_data.data.user.id);
};

<input type="file" onChange={handleImageChange} />;
