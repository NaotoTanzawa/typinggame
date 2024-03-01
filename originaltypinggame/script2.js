
// 変数の初期化
let untyped = "";
let typed = "";
let score = 0;

// 必要なHTML要素を取得
const untypedfield = document.getElementById("untyped");
const typedfield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");
const textcount = document.getElementById("text-count");
const img = document.getElementById("game-zunda");

// 複数のテキストを格納する配列
const textLists = [
    "water","apple","house","money","happy","today","hello","thank", "sorry", "please",
    "world", "night", "color", "music", "movie", "river", "friend", "family", "school", "animal",
    "yellow", "green", "blue", "white", "black", "red", "orange", "purple", "brown", "pink",
    "number", "letter", "person", "place", "thing", "time", "year", "month", "week", "day",
    "food", "drink", "fruit", "vegetable", "animal", "insect", "flower", "tree", "grass", "sky",
    "earth", "sun", "moon", "star", "cloud", "rain", "snow", "wind", "fire", "mountain",
    "ocean", "sea", "river", "lake", "island", "desert", "forest", "city", "town", "village"
]; 

// ランダムなテキストを表示
const createText = () => {
    
    // 正タイプした文字列をクリア
    typed = "";
    typedfield.textContent = typed;

    // 配列のインデックスからランダムな数値を生成する
    let random = (Math.floor(Math.random()*textLists.length));
    
    // 配列からランダムにテキストを取得し、画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keypress = e =>{

    // 誤タイプの場合
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add("mistyped");

        //誤タイプ時に0.1秒後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove("mistyped");
        },100);
        return;
    }

    // 正タイプの場合 
    // スコアのインクリメント
    score++;
    
    // 変数untypedの先頭の文字を取得し、変数typedの末尾に追加
    typed += untyped.substring(0,1);
    
    // 変数untypedの２文字目以降の文字列を再代入する
    untyped = untyped.substring(1);
    
    // 変数typedefieldのtextContentプロパティに変数typedの値を代入
    typedfield.textContent = typed;
    
    // 変数untypedfieldのtextContentプロパティに変数untypedの値を代入
    untypedfield.textContent = untyped;
    
    // タイプした文字数を表示
    textcount.textContent = score;

    // テキストがなくなったらあたらしいテキストを表示
    if(untyped === ""){
        // 正解画像のURL
        const successImgSrc = "images/3.png";
        // ずんだもんの画像の差替え
        img.src = successImgSrc;
        // 0.5秒後に元のずんだもんの画像に戻す
        setTimeout(() => {
        img.src = "images/1.png";
        }, 500);

        createText();
    }
};



// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = "";

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    }else if(score < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    }
    else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます!`};
    
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}【oK】でリトライ / 【キャンセル】で終了`;
    
};

// ゲームを終了
const gameOver = id => {
    // タイマーを停止
    clearInterval(id);

    untypedfield.textContent = "ゲーム終了なのだ";
    typedfield.textContent = "";

    // ゲーム終了時のスコアをconfirmメソッドで10ミリ秒後に表示
    setTimeout(() => {
    const result = confirm(rankCheck(score));

    // OKボタンを押したらリロードする
    if(result === true){
        window.location.reload();
    }},10);
    
};

// カウンタータイマー
const timer = () => {

    // HTMLのcount要素を取得
    let time = count.textContent;

    // setIntervar関数で1秒ごとにカウントアップ
    const id = setInterval(() =>{
        
        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが10になったら赤文字に変更
        if(time === 10){
            count.style.color = "red";
            // タイマー音声を1回だけ再生する
            const audio = new Audio("music/timerimitt.wav");
            // 音声ファイルを再生
            audio.play();

};

        // カウントが0になったらゲーム終了表示して、音声再生
        if(time <= 0){
            gameOver(id);
            const audio = new Audio("music/gameover.wav");
            audio.play();
        };
        },1000);

};

// ゲームスタート時の処理
start.addEventListener("click",() => {
    
    // ゲーム開始音声の再生
    const audio = new Audio("music/gamestart.wav");
    audio.play();
    
    // カウンタータイマーの開始
    timer();
    
    // ランダムなテキストを表示
    createText();
    
    // スタートボタンを非表示
    start.style.display = "none";
    
    // キーボードのイベント処理
    document.addEventListener("keypress", keypress);
    
});


// スタートボタンクリック前のテキスト画面表示
untypedfield.textContent = "スタートボタンを押してね";