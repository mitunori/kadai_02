import { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  // ページを読み込む際（リロードした際）にデータを取得したい
  const getData = () => {
    const data = window.localStorage.getItem("test");

    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  // 登録されるデータを保持するuseState
  const [data, setData] = useState(getData);

  // タイトル入力欄のテキスト情報を保持するseState
  const [title, setTitle] = useState("");

  useEffect(() => {
    // 画面が表示された直後一回実行してくれます🤗
    localStorage.setItem("test", JSON.stringify(data));
  }, [data]);
  //useStateのdataの箱に「変更」があったらuseEffect動きます🤗

  const handleSubmit = (e) => {
    console.log(e, "eventとは？送信を押したときに発生する挙動");
    e.preventDefault();

    // データを登録するための「塊=オブジェクト」を作る
    let pushData = {
      title,
    };
    setData([...data, pushData]);
    setTitle(""); //useStateのtitleという箱を強制的に空にする
  };

  // console.log(data, "useState dataという箱の中身をチェック");

  return (
    <>
      {/* この中に書く */}
      <h1>localStrage</h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        {/* title */}
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        {/* <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        /> */}

        {/* 送信ボタン */}
        <Button variant="contained" type="submit">
          送信
        </Button>
        {/* <button>送信</button> */}
      </form>

      {/* 表示のロジックを記述します🤗 */}
      {/* dataという箱に登録されています🤗 */}
      {data.map((item, index) => (
        <div key={index}>
          {index}番目
          {item.title}
        </div>
      ))}
      {/* この中に書く */}
    </>
  );
}

export default App;
