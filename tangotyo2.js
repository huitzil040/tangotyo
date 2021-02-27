//let mysql = require("mysql");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
const stbtn = document.querySelector("#start");
const edbtn = document.querySelector("#edit");
const opbtn = document.querySelector("#option");
const quiz = document.querySelector("#quiz");
const quiz2 = document.querySelector("#quiz2");
let qubtn;
let nebtn;
let enbtn;
let sebtn;
let dobtn;
let areaQ;
let areaA;
let areaGS;
let areaGB;
let checkR = 0;
let random;
let randoms = [];
let qanda_array = [];
let check = 0;


//jsonファイル作成
let json_maker = (originalData, fileName) => {
  const data = JSON.stringify(originalData);
  const link = document.createElement("a");
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}


//json読み取り
let json_reader = () => {
  url = "https://huitzil040.github.io/tangotyo/test1.json";
  $.getJSON(url,(data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data)
      areaQ = data[i].question;
      areaA = data[i].answer;
      areaGS = data[i].genre_nameS;
      areaaB = data[i].genre_nameB;
      qanda_array.push({
        areaQ,
        areaA,
        areaGS,
        areaGB
      });
    }
  });
}

json_reader();


let random_maker = () => {
  let min = 1,
    max = qanda_array.length;

  for (i = min; i <= max; i++) {
    while (true) {
      let tmp = intRandom(min, max);
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }
  }
}
/** min以上max以下の整数値の乱数を返す */
function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//「開始する」ボタンのなかみs
let start_quiz_part = () => {
  check = 0;
  //配列を順々に使っていき、配列が終わったらもう一度乱数の配列を持ってくる
  if (qanda_array == 0) {
    console.log("miss" + qanda_array.length)

    title.textContent = "";
    quiz.textContent = "";
    content.innerText = "問題が登録されていません";
    quiz2.textContent = "";
  } else {
    if (checkR == qanda_array.length) {
      checkR = 0;
    };
    console.log(checkR)
    if (checkR == 0) {
      randoms = [];
      random_maker();
      console.log(randoms);
    };

    random = randoms[checkR] - 1;
    console.log(random);
    let questionN = qanda_array[random];
    title.innerText = "問題";
    content.innerText = (checkR + 1) + "/" + qanda_array.length + ":   " + questionN.areaQ;
    quiz.innerHTML = '<input type="text" id="answer">';
    quiz.innerHTML += '<button type="button" id="question">回答</button>'
    quiz2.textContent = "";

    //「回答」ボタン
    let answer_quiz = () => {
      check = 1;
      title.innerText = "答え合わせ";
      let answer = document.querySelector("#answer").value;
      let correct = questionN.areaA;
      //console.log(answer);
      console.log(qanda_array);
      content.innerText = 'あなたの回答:' + answer;
      content.innerHTML += "<br>"
      content.innerText += '答え:' + correct;
      quiz.innerHTML = '<button type="button" id="next">次の問題へ</button>';
      quiz.innerHTML += '<button type="button" id="end">終わり</button>';
      console.log(quiz);
      //「次の問題」ボタン
      let next_quiz = () => {
        check = 0;
        checkR = checkR + 1;
        start_quiz()
      }
      //「終わり」ボタン
      let end_quiz = () => {
        check = 0;
        checkR = 0;
        randoms = [];
        title.textContent = "";
        content.textContent = "";
        quiz.textContent = "";
        quiz2.textContent = "";
      }
      nebtn = document.querySelector("#next");
      nebtn.addEventListener("click", next_quiz);
      enbtn = document.querySelector("#end");
      enbtn.addEventListener("click", end_quiz);
    }
    qubtn = document.querySelector("#question");
    qubtn.addEventListener("click", answer_quiz);
    console.log(quiz)
    console.log(stbtn)
  }
}


let edit_quiz_part = () => {
  check = 0;
  title.innerText = "編集";
  content.textContent = "";
  quiz.innerHTML = '<textarea rows="3" cols="30" id="quiz_editer" placeholder="問題を記入してください"></textarea></br>';
  quiz.innerHTML += '<textarea rows="3" cols="30" id="answer_editer" placeholder="答えを記入してください"></textarea></br>';
  quiz.innerHTML += '<textarea rows="1" cols="30" id="genreS_editer" placeholder="小ジャンルを記入してください"></textarea></br>';
  quiz.innerHTML += '<textarea rows="1" cols="30" id="genreB_editer" placeholder="大ジャンルを記入してください"></textarea>';
  quiz.innerHTML += '<button type="button" id="send_quiz">確定</button>'
  quiz2.textContent = "";
  console.log(quiz);
  //クイズを作成する
  let quiz_make = () => {
    areaQ = document.querySelector("#quiz_editer").value;
    areaA = document.querySelector("#answer_editer").value;
    areaGS = document.querySelector("#genreS_editer").value;
    areaGB = document.querySelector("#genreB_editer").value;
    qanda_array.push({
      areaQ,
      areaA,
      areaGS,
      areaGB
    });
    quiz2.innerText = "登録しました";
    console.log(areaQ);
    console.log(areaA);
    console.log(areaGS);
    console.log(qanda_array);
    //json_maker({
    //    id: 123,
    //    name: "mochi",
    //    food:[areaQ,areaA]
    //  },"test.json");
  }
  sebtn = document.querySelector("#send_quiz");
  sebtn.addEventListener("click", quiz_make);
}

let option_quiz_part = () => {
  check = 0;
  title.innerText = "設定";
  content.textContent = "";
  quiz.innerText = "問題データのダウンロードは→";
  quiz.innerHTML += '<button type="button" id="download_quiz">ダウンロード</button>'
  quiz2.textContent = "";
  let quiz_data_download = () => {
    json_maker(qanda_array, "tangotyo_data.json")
  }
  dobtn = document.querySelector("#download_quiz");
  dobtn.addEventListener("click", quiz_data_download);
}

//「開始する」ボタン
let start_quiz = () => {
  //問題回答中に誤って他ページに飛ぶことの帽子　check=1が回答中
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      start_quiz_part();
    }
  } else {
    start_quiz_part();
  }
}

let edit_quiz = () => {
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      edit_quiz_part();
    }
  } else {
    edit_quiz_part();
  }
}

let option_quiz = () => {
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      option_quiz_part();
    }
  } else {
    option_quiz_part();
  }
}
stbtn.addEventListener("click", start_quiz);
edbtn.addEventListener("click", edit_quiz);
opbtn.addEventListener("click", option_quiz);
