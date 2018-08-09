var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r5t',
  database : 'o2'
});

conn.connect();

/*

var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields){
  if(err){
      console.log(err);
  }else{
      for(var i=0; i<rows.length; i++){
        console.log(rows[i].title);
      }
  }
});

var sql = 'INSERT INTO topic (title,description, author) VALUES(? , ? , ?)';
var param = ['Express' , 'Web Framework' , 'eeve1205'];
conn.query(sql, param, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});


var sql = 'UPDATE topic SET title=? , description=? WHERE id=?';
var param = ['Express_update' , 'Web Framework_update' , '4'];
conn.query(sql, param, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
*/

var sql = 'DELETE FROM topic WHERE id=?';
var param = ['4'];
conn.query(sql, param, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
conn.end();
