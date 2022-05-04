//node js 설치
// npm init
// npm install express (서버 라이브러리)
// npm install -g nodemon
// npm install mongodb
// npm install ejs

// node server.js (서버 시작)
// nodemon server.js (노드몬으로 시작)

// express
const express = require("express");
const app = express();
// db
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb+srv://admin:aaa12134@cluster0.s7xxu.mongodb.net/todoapp?retryWrites=true&w=majority";
// view ejs
app.set("view engine", "ejs");

var db;
MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, client) {
    // 워닝메시지 제거해줌 useUnifiedTopology: true 이거

    if (err) return console.log(err);
    db = client.db("todoapp");

    // _id 직접 입력 안 하면 이상한 랜덤 문자로 만들어줌
    // db.collection("post").insertOne({ name: "John", _id: 100 }, function (err, result) {
    //     console.log("저장 완료");
    // });

    // 서버 열기 - 하단에 뒀다가 여기로 옮김
    app.listen(8080, function () {
        console.log("listening on 8080");
    });
});

// 2021년부터는 express에 body-parser가 기본 포함.
// 따로 설치 없이 아래와 같이 작성.
// 서버로 데이터 보내기
app.use(express.urlencoded({ extended: true }));

// res
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/pet", function (req, res) {
    res.send("펫1");
});

app.get("/beauty", function (req, res) {
    res.send("뷰티1");
});

app.get("/write", function (req, res) {
    res.sendFile(__dirname + "/write.html");
});

app.get("/list", function (req, res) {
    // db 모든 data 꺼내기
    db.collection("post").find().toArray(function (err, data) {
        console.log(data);
        res.render("list.ejs", { data: data });
    });
});

// req
app.post("/add", function (req, res) {
    console.log(req.body);
    res.send("전송완료");

    db.collection("post").insertOne(
        {
            title: req.body.title,
            date: req.body.date
        },
        function () {
            // 콜백
            console.log("저장완료");
        }
    );
});
