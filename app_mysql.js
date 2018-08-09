var express = require('express');  //express 모듈을 가져와 변수에 선언

var app = express(); //express 모듈 함수를 실행하면 애플리케이션객체를 리턴한다.
var fs = require('fs'); //파일시스템 사용

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r5t',
  database : 'o2'
});

conn.connect();

app.locals.pretty = true; //코드가 자동으로 보기좋게 들여씌워짐
app.set('views', './views_mysql'); //jade, 템플릿 파일 저장 기본디렉토리  지정
app.set('view engine', 'jade'); //뷰 엔진 jade 로 설정

var bodyParser = require('body-parser');//bodyparser 모듈 생성
app.use(bodyParser.urlencoded({ extended: false }))//post방식 사용시 bodyParser 모듈 사용




app.listen(3000, function(){  //3000포트에 연결
  console.log('Conneted 3000 port!')
});

/*INSERT 화면*/
app.get('/topic/add', function(req, res){
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql , function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Server Error!!!');
    }else{
      res.render('add' , {topics:topics});
    }
  });
});

/*INSERT POST 방식 실행*/
app.post('/topic/add' , function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = "INSERT INTO topic (title, description, author) VALUES (?,?,?)";

  conn.query(sql ,[title,description, author], function(err, results, fields){
    if(err){
      console.log(err);
      res.status(500).send('Server Error!!!');
    }else{
      res.redirect('/topic/' + results.insertId);
    }
  });
});

app.get(['/topic/:id/edit'], function(req, res){ //2가지 routing 을 하나의 함수로

  var sql = 'SELECT id,title FROM topic';
  conn.query(sql , function(err, topics, fields){
    var id = req.params.id;
      if(id){
        var sql = "SELECT * FROM topic WHERE id =?";
        conn.query(sql, [id], function(err , topic, fields){
          if(err){
            console.log(err);
            res.status(500).send('Server Error!!!');
          }else{
              res.render('edit' , {topics:topics, topic:topic[0]});
          }

        });
      }else{
        console.log(err);
        res.status(500).send('Server Error!!!');
      }

  });
})

app.post('/topic/:id/edit' , function(req,res){
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
  conn.query(sql ,[title,description,author,id], function(err, results, fields){
    if(err){
      console.log(err);
      res.status(500).send('Server Error!!!');
    }else{
      res.redirect('/topic/'+id);
    }
  });
});


/*DELETE POST 방식 실행*/
app.get('/topic/:id/delete' , function(req,res){
  var id = req.params.id;
  var sql = "DELETE FROM topic WHERE id =?";
  conn.query(sql ,[id], function(err, results, fields){
    if(err){
      console.log(err);
      res.status(500).send('Server Error!!!');
    }else{
      res.redirect('/topic/');
    }
  });
});


app.get(['/topic', '/topic/:id'], function(req, res){ //2가지 routing 을 하나의 함수로

  var sql = 'SELECT id,title FROM topic';
  conn.query(sql , function(err, topics, fields){
    var id = req.params.id;
      if(id){
        var sql = "SELECT * FROM topic WHERE id =?";
        conn.query(sql, [id], function(err , topic, fields){
          if(err){
            console.log(err);
            res.status(500).send('Server Error!!!');
          }else{
              res.render('view' , {topics:topics, topic:topic[0]});
          }

        });
      }else{
        res.render('view', {topics:topics, id:topics.id, title:topics.title}); //파일을 읽은 후 view경로에 있는 jade 파일을 읽는다. 객체로 데이터 전송
      }

  });
});


app.post('/topic' , function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Server Error');
    }else{
      res.redirect('/topic');
    }

  });

});
