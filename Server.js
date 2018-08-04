var http = require("http");
var express = require("express");
var ejs=require("ejs");
var fs = require("fs");

var app = express();

app.use(express.static(__dirname));
//리스트 요청받기
app.get("./list",function(request, response){
	//클라이언트가 전송한 get방식의 데이터를 request 객체에서  끄집어 내자!!.
	console.log(request.query.currentPage);

	//페이징 처리 기법
	var currentPage = 1; //현재 보고 있는 페이지
	//사용자가 링크를 누른 경우엔... 넘어 온 currentPage 값으로 대체!!
	if(request.query.currentPage!=undefined){
		currentPage = parseInt(request.query.currentPage);
	}
	var totalRecord = 1026; // 총 레코드 수
	var pageSize = 10; // 페이지당 보여질 레코드 수
	var totalPage = Math.ceil(totalRecord/pageSize); 
	var blockSize = 10; // 블럭당 보여질 페이지 수
	var firstPage = Math.floor(currentPage / blockSize)+1;
	var lastPage; = Math.ceil(currentPage / blockSize);

	fs.readFile("list.ejs","utf-8",function(error,data){
		if(error){
			console.log("읽기 실패",error);
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.end(ejs.render(data,{
			currentPage:currentPage,
			totalRecord:totalRecord,
			pageSize:pageSize,
			totalPage:totalPage,
			blockSize:blockSize
		}));
	});
});

var server = http.createServer(app);

server.listen(8888,function(){
	console.log("웹서버 가동중...");
}); //서버 가동