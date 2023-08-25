supabase
  .channel("*")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "posts",
    },
    (payload) => {
      if (payload.eventType == "INSERT") {
        console.log("登録データ", payload.new);
        console.log("変更前のデータ", payload.old);
      }
    },
  )
  .subscribe();
