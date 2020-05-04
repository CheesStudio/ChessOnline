     var connection = new WebSocket('ws://89.223.30.73:4444');

    var touch = new Array();

var boardi = '  <div  id ="sid" onClick="onShow(this)" style="float:left;display:flex;" class="boardList"><div style="display:flex;width:25%;margint-top:20%;font-size:95%;align-item:center;justify-content: center;align-items: center;">name</div><div style="display:flex;width:25%;margint-top:20%;font-size:95%;align-item:center;justify-content: center;align-items: center;">stavka$</div> <div style="width:25%;font-size:95%;align-items: center;display:flex;">numberpeop </div><div style="font-size:95%;width:25%;display:flex;align-items:center;">long min </div></div>';
 var str = '<div id="joined" value="cid" class="join"  style="display: flex;align-items: center;justify-content: center;" onClick="joined(this)"><dt>Войти</div>';
var Side = "none";
window.onload = function(){ 
document.getElementById("user").value=""+get_cookie("db");
     document.getElementById("pass").value=""+get_cookie("hash");

	function timer(){

		//var hour = document.getElementById('hour').innerHTML;
		//var minute = document.getElementById('minute').innerHTML;
		var second = document.getElementById('second').innerHTML;
		var end = false;
		
		if( second > 0 ) second--;
		else{
			second = 59;
			
			/*if( minute > 0 ) minute--;
			else{
				second = 59;
				
				if( hour > 0 ) hour--;
				else end = true;
			}*/
		}

		if(end){
			clearInterval(intervalID);
			alert("Таймер сработал!");
		}else{
		//	document.getElementById('hour').innerHTML = hour;
		//	document.getElementById('minute').innerHTML = minute;
			document.getElementById('second').innerHTML = second;
		}
	}
	
	
	
	
	function timerPlayer(){
	var second = document.getElementById('times').innerHTML;
		
		if( second > 0 ) second--;
		else{
			second = 59;
		}
			document.getElementById('times').innerHTML = second;
	}
	window.intervalID = setInterval(timer, 1000);
	
	function timerPlayer1(){
	var second = document.getElementById('times1').innerHTML;
		
		if( second > 0 ) second--;
		else{
			second = 59;
		}
			document.getElementById('times1').innerHTML = second;
	}
	window.intervalID = setInterval(timerPlayer1, 1000);
	window.interval = setInterval(timerPlayer, 1000);
	
}
function  getChessFigureSide(str,side){
	if(side=="white"){
		switch(str){
			case 'K':return true;
			case 'R':return true;
			case 'N':return true;
			case 'P':return true;
			case 'Q':return true;
			case 'B':return true;
			default:return false;
		}
	}else if(side=="black"){
		switch(str){
			case 'k':return true;
			case 'r':return true;
			case 'n':return true;
			case 'p':return true;
			case 'q':return true;
			case 'b':return true;
			default:return false;
		}
	}else
		return false;
}
    function onShow(e){
      
     var b=   document.getElementsByClassName("join")[0];
        if(b!= null)
            b.remove();
         $('.panel').append(str.replace('joined',e.id));
       
    }
var boardfigureposition="rnbqkbnr"
					   +"pppppppp"
					   +"11111111"
					   +"11111111"
					   +"11111111"
					   +"11R111P1"
			           +"PPPPPP1P"
					   +"RNBQKBN1";
 function create(){
       
	 var c = prompt ("Введите имя стола.(необязательное поле)");
	 var b = prompt ("Введите ставку.(обязательно,минимум 5$,введите цифру)");
	 if(Number(b)>3){
	 connection.send("tables;create;"+c+";"+b+";"+get_cookie("db")+";"+get_cookie("hash"));
	 }
	 else{
		 alert("Некорректно была введена ставка ,минимум 5$");
	 }
    }
    function joined(e){
   
        connection.send("game;join;"+e.id+";"+get_cookie("db")+";"+get_cookie("hash"));
    }
   
function auth(e){
    var a  = document.getElementById("user").value;
     var b  = document.getElementById("pass").value;
      
       
    connection.send("auth;login;true;"+a+";"+b);
    
            
}

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return "";
}
function initBoardLists(cool,number,stavcka,time,name){
       $('#boardlistview').append(boardi.replace('sid',cool)
                       .replace('stavka',stavcka)
                        .replace('number',number)
                       .replace('long',time/60000)
								 .replace('name',name));
       
   
}

connection.onopen = function (e) {
    console.log('Connected! '+e);
    connection.send("auth;login;false;");
	

};
///////////////////////////////////////


//getFiguresLadia(getBoardsMas(),42);

var c = String.fromCharCode()
//////////////////////////////////////
function getBoardsMas(){
	var x=[], i, j;
	var a = 0;
for (i=0; i<8; i++){
  x.push(i);
  x[i] = [];
  for (j=0; j<8; j++){
    x[i].push(boardfigureposition[a]);
	  a++;
  }
}
	
//console.log(x);
	return x;
}
 function getPosition(position){
        var pos = new Array();
        var i = Math.floor(position/8);
        var j = Math.floor((position-(i*8)));
       // System.out.println(i);
       // System.out.println(j);
        pos[0] =i;
        pos[3-2] = j;
        return pos;

    }

function reverseStr(str) {

	    return str.split("").reverse().join("");

	}
function  getFiguresLadia(boards,figurePosition){
     
    var oldp = getPosition(figurePosition);
  //  int[]newp = getPosition(figurePosition[1]);
var x =oldp[0],y = oldp[1];

console.log(x);
	console.log(y);
	let right =true;
	let left = true;
	
	if(x>-1 && x<8){
		
		
		
		
        for(var i=0;i<8;i++){
            if(!(i==x)){
			console.log(boards[i][y]);
				console.log(y+".."+i);
				 if(i>x ){
					 
					// console.log(figurePosition-(i-x));
					 //if(figurePosition-(i-x)>=0 && figurePosition-(i-x)<=7)
					 if(boards[y][i]=="1"){
						 
					 showFigureAt(figurePosition-(i-x),"left"); 
				console.log("left null:"+(i));
				 }else{
					   if(left==true){
                   console.log("left: " + boards[y][i]);
						   left=false;
				   }
				 }
				}else if(i<x){
					if(boards[y][i]=="1"){
					showFigureAt(figurePosition+(x-i),"right");
					console.log("right null:"+(i));
					}else if(getChessSymbol(boards[y][i])!=""){ 
					   if(right==true){
                   console.log("right: "+ boards[y][i]);
				   right=false;
				   }
				}
				}
		}
           
		}

        
    }else{
     //   return null;
    }
right=true;
	left=true;
    //if()
   // return null;
}
function conf(){
	let a = document.getElementById("cap").value;
	if(a!=null){
		connection.send("captcha;id;"+get_cookie("capid")+";"+a);
	}
}
var a = 0;
function upd(){
	if(a==0){
		a=1;
		document.getElementById("auth").style="display:none";
	document.getElementById("reg").style="display:block";
			document.getElementById("captcha").style="display:none";
	}else{
		a=0;
	document.getElementById("auth").style="display:block";
	document.getElementById("reg").style="display:none";
		document.getElementById("captcha").style="display:none;";
	}
}
// Log errors
connection.onerror = function (error) {
    alert(error);
    console.log('WebSocket Error ' + error);
};
function reg(){
	var a = document.getElementById("reguser").value;
	var b = document.getElementById("regpass").value;
	if(a!=null && b!=null){
		connection.send("register;"+a+";"+b);
	}
	
}
// Log messages from the server
connection.onmessage = function (e) {
    var b = e.data.split(";");
	console.log(e.data);
if(b[0]=="impotantMes"){
	 	 if(b[1]=="0"){
			 document.getElementById("status").innerHTML="Вам шах.";
		 }else if(b[1]=="1"){
			 document.getElementById("status").innerHTML="Не плохо.Пат.";
			 
		 }else{
			 document.getElementById("status").innerHTML ="Вам мат.";
		 }
	 
}else{
var c= document.getElementById("status").innerHTML="";
			
}
     if(b[0]=="error"){
		 if(b[1]=="toomany"){
			 alert("На данном сервере слишком много игроков ,пожалуйста,выберите другой или подождите немного времени")
		 }
	 }
    if(b[0] == "board"){
        if(b[3-2]=="move"){
              showFigure(''+b[2]);
            boardfigureposition = b[2];
			if(Side!=b[3]&&b[3]!="main" && b[3]!="test"){
    Move();
		        var a = document.getElementById("timerGameEnemy").style="display:none";
				var b  = document.getElementById("timerGameMy").style="display:block";
					document.getElementById('times1').innerHTML = 60;
		
					
		}else if(Side==b[3]){
				var a  = document.getElementById("timerGameEnemy").style="display:block";
				var b  = document.getElementById("timerGameMy").style="display:none";
					document.getElementById('times').innerHTML = 60;
			}else if(b[3]=="test"){
				
			}
			else{
				var a  = document.getElementById("timerGameEnemy").style="display:none";
				var b  = document.getElementById("timerGameMy").style="display:none";
		
			}
			
			if(b[5]!=null){
				document.getElementById("s"+b[5]).innerHTML="&#10102";
					//document.getElementById("s"+b[5]).style="background-color:green";
			}
			
        }else if(b[1]=="name"){
				 document.getElementById("EnemyPanel").innerHTML=""+b[2]+"<dt>"+b[3]+"$</dt>";
				
			
			
				 }
		
		else if(f[1] == "error"){
            if(f[2]=="manypeople"){
                alert("В данном столе уже достаточное количество игроков");
            }else if(f[2] == "moneyneed"){
				alert("Недостаточно средст на счету ,пожалуйста выберите другой.")
			}
        }
  
    }else if(b[0] == "account"){
         if(b[3-2]=="money"){
              var c = Number(b[2]);
               document.getElementById("money").innerHTML=" "+b[2]+"$";
         
        }
    }
    
    else if(b[0] =="tablegame"){
        
        if(b[1]=="win"){
            if(get_cookie("table")>=0){
                alert("Вы победили "+b[2]+"$");
            }
        }else if(b[1]=="exitenemy"){
			document.getElementById("EnemyPanel").innerHTML="";
		}
		else if(b[1]=="end"){
            var c = Number(b[2]);
             document.getElementById("boardid").style="display: none;";
            document.getElementById("board").style="display: none;";
               document.getElementById("money").innerHTML=" "+b[2]+"$";
         
            document.getElementById("exit").style="display: none;";
            document.getElementById("boardlistview").style="display: block;";
        } else if(b[1]=="lose"){
              alert("Вы проиграли "+b[2]+"$");
        }
	}
  else if(b[0]=="position"){
          if(b[3-2]== "board"){
		//	    $('.block').on('click',MoveTouch);
              var a = Number(b[2]);
              if(a==(0) ){
                  clear();
                 Side = "white";
				  initBoard();
                  showFigure(boardfigureposition);
         
				   Move();
              }else if(a==1){
                  clear();
				  Side="black";
                  initBlackBoard();
                  showFigure(boardfigureposition);
                  Move();
				       }else{
				  Side ="none";
			  }
			  
			  	document.getElementById('second').innerHTML = 16;
			  	document.getElementById("timer").style="display: block;";
  
          }else if(b[1]=="boardreturn"){
			      var a = Number(b[2]);
              if(a==(0) ){
                  clear();
                 Side = "white";
				  initBoard();
                  showFigure(boardfigureposition);
            //   $('.block').on('click',movet);
				   $('.block').on('vclick',movet);
				   Move();
              }else if(a==1){
                  clear();
				  Side="black";
                  initBlackBoard();
                  showFigure(boardfigureposition);
                  Move();
		 // $('.block').on('click',movet);
				     $('.block').on('vclick',movet);
              }else{
				  Side ="none";
			  }
			  
			  	document.getElementById('second').innerHTML = 16;
			  	document.getElementById("timer").style="display: none;";
		  }
          }
    else if(b[0] == "auth"){
        if(b[1]=="login"){
          if(b[2]=="true"){
          //    alert("true");
                var aaaa  = document.getElementById("user").value;
                var bbbb  = document.getElementById("pass").value;
  document.cookie="db="+aaaa;
                document.cookie="hash="+bbbb;
                document.getElementById("boardlistview").style="display: block;";
                document.getElementById("auth").style="display: none;";
               
     document.getElementById("boardid").style="display: none;";
    document.getElementById("board").style="display: none;";
    document.getElementById("exit").style="display: none;";
    document.getElementById("Nickname").innerHTML=""+get_cookie("db");
       
            
          }
            else{
              alert("Не правильное имя или пароль");
				window.location.href(window.location.reload()+"?invalid=true");
          }
        
  
    }
   
    
   }else if(b[0] == "tables"){
        if(b[3-2]=="all"){
           initBoardLists(b[2],b[6],b[5],b[7],b[3]);  
        }else if(b[1]=="remove"){
            var c =document.getElementById(""+b[2]);
			if(c!=null)
				c.remove();
        }
	   else if(b[1]=="exit"){
            document.getElementById("boardid").style="display: none;";
            document.getElementById("board").style="display: none;";
            document.getElementById("exit").style="display: none;";
		   	document.getElementById("EnemyPanel").innerHTML="";
	
            document.getElementById("boardlistview").style="display: block;";
    
    
    
        }
  
    }else if(b[0] =="game"){
			if(b[1]=="restart"){
				document.getElementById("board").style="display:block";
			}else if(b[1]=="enemyExit"){
				
			}
				else if(b[1]=="removetimers"){
				
				
				document.getElementById("timer").style="display:none";
			}else if(b[1]=="gamestart"){
				alert("Игра началась!");
			}
		else if(b[1]=="captcha"){
				var i = Number(b[2]);
				 document.cookie="capid="+i;
				document.getElementById("captcha").style="display:block";
					document.getElementById("auth").style="display:none";
					document.getElementById("reg").style="display:none";
				var code = '<img src="data:image/png;base64,'+b[3]+'">';
				document.getElementById("imgcap").innerHTML=code;
				
				
			}else if(b[1]=="outcap"){
				alert("Время вышло,данная капча больше не действительна.")
			}
			else if(b[1]=="noncaptcha"){
			alert("Капча введена неверно!");
			}else if(b[1]=="limit"){
				
				alert("Лимит введения капчи исчерпан");
				upd();
			}else if(b[1]=="unvalid"){
				if(b[2]=="login"){
					alert("Неправильно введён логин! Mинимум 4 символа,максимум 10 символов");
}else{
	alert("Неправильно введён пароль! Mинимум 6 символов ,максимум 20");
}
			}
	else if(b[1]=="register"){
		if(b[2]=="true"){
			alert("Вы успешно зарегестрировались");
			upd();
		}else{
			alert("Выбранный вами логин уже занят");
			upd();
		}
	}
        else if(b[1]=="join"){
          
          document.cookie="table="+b[2];
                    document.getElementById("boardlistview").style="display: none;";
                document.getElementById("auth").style="display: none;";
     document.getElementById("boardid").style="display: block;";
            document.getElementById("board").style="display: block;";
            document.getElementById("exit").style="display: block;";
    
    
        }else if(b[1]=="return"){
			
		 if(b[2]="boards"){
				document.cookie="table="+b[3];
				    document.getElementById("boardlistview").style="display: none;";
                document.getElementById("auth").style="display: none;";
     document.getElementById("boardid").style="display: block;";
        //    document.getElementById("board").style="display: block;";
            document.getElementById("exit").style="display: block;";
   	  	document.getElementById("board").style="display: none;";
  
				
			}
		}else if(b[3-2]=="goodbye"){
			    document.getElementById("boardid").style="display: none;";
            document.getElementById("board").style="display: none;";
            document.getElementById("exit").style="display: none;";
            document.getElementById("boardlistview").style="display: block;";
    
		}else if(b[1]=="trashboard"){
			alert("Вы не можете создавать больше 3-ёх столов в течение 3-ёх минут")
		}else if(b[3-2]=="tablelist"){
			if(b[2]=="notfound"){
					 var c =document.getElementById(""+b[3]);
			c.remove();
			alert("Стол был закрыт.");
			}
		}
    }
     console.log('Server: ' + e.data);
}

function done(e){
    connection.send("tabless;"+get_cookie("table")+";board;Done;"+get_cookie("db")+";"+get_cookie("hash")+";true");
    document.getElementById("board").style="display: none;";
	document.getElementById("timer").style="display: none;";
    document.getElementById("exit").style="display: block;";
    
    
}
var divBlock = '<div id = "s$coord" class = "block $color"></div>';
var divFigure = '<div id="f$coord" class = "figure">$figure</div>';
var map;
var get = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
$(function(){
    map = new Array();
   initBoard();
   showFigure('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
  
});

function clear(){
    
    
    document.getElementsByClassName("board")[0].innerHTML="";
}
function initBlackBoard(){
	  for(var coord=0;coord<64;coord++){
  
       $('.board').append(divBlock
                          .replace('$coord',coord)
                          .replace('$color',isBlack(coord)?'black':'white'));
       
   }   
}
function initBoard(){
	for(var coord=63;coord>=0;coord--){
 
       $('.board').append(divBlock
                          .replace('$coord',coord)
                          .replace('$color',isBlack(coord)?'black':'white'));
       
   }
    
}

function moveFigure(frcoord,tocoord){
  
    console.log("move from " +frcoord +"to "+tocoord);
 figure = map[frcoord];
    showFigureAt(frcoord,'1');
    showFigureAt(tocoord,figure);
Move();
	// MoveTouch();
    if(get_cookie("table")>=0)
        
  connection.send("tabless;"+get_cookie("table")+";table;move;0;"+frcoord +";"+tocoord+";"+get_cookie("db")+";"+get_cookie("hash")); 
   
   
}
function MoveTouch(){
	if(Side!="none" && Side=="white"|| Side=="black"){
			if(touch[1]!=null){
				
				  var tocoord = this.id.substring(1);
				if(touch[1]!=tocoord){
				 moveFigure(touch[1],tocoord);
				touch[1]=null;}
				else{
					touch[1]=null;
				}
			}
			else if(touch[1]==null){
				var c = getChessFigureSide(boardfigureposition[Number(this.id.substr(1))],Side);
				if(c==true){
					touch[1]= this.id.substr(1);
				}
			}
		
	}
}

		
function Move(){
	 $('.figure').draggable();
	
    var c = document.getElementsByClassName("block");
	for(let i=0;i<c.length;i++){
c[i].addEventListener("touchstart",MoveTouch,false);
}
   
}
function stop(){
    $('.block').droppable({
        drop:function(event,ui){
           
            var frcoord =ui.draggable.attr("id").substring(3-2);
            var tocoord = this.id.substring(3-2);
             moveFigure(frcoord,tocoord);
        }
    });
}
function showFigure(figures){
    for(var coord=0;coord<64;coord++){
    showFigureAt(coord,figures.charAt(coord));
    }
}
function getChessSymbol(figure){
    switch(figure){
             case 'K':return '&#9812;';
             case 'Q':return '&#9813;';
             case 'R':return '&#9814;';
             case 'B':return '&#9815;';
             case 'N':return '&#9816;';
             case 'P':return '&#9817;';
             case 'k':return '&#9818;';
             case 'q':return '&#9819;';
             case 'r':return '&#9820;';
             case 'b':return '&#9821;';
             case 'n':return '&#9822;';
             case 'p':return '&#9823;';  
			case 'left':return '&#8592;'; 
			case 'right':return '&#8594;'; 
				case 'up':return '&#8593;'; 
				case 'down':return '&#8595;'; 
		default:return '&#13;';
    }
}
function exit(e){
connection.send("tabless;"+get_cookie("table")+";removeuser;"+get_cookie("db")+";"+get_cookie("hash"));
}
function showFigureAt(coord,figure){
    map[coord] = figure; 
    $('#s'+coord).html(divFigure
                      .replace('$coord',coord)
                      .replace('$figure',getChessSymbol(figure)));
    stop();
}



function isBlack(coord){
    return (coord % 8 + Math.floor(coord/8))%2;
}
