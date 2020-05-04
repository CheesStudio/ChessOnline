

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
   // showFigureAt(0,'R');
//    showFigureAt(63,'r');
    showFigure('rnbUkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    Move();
   // stop();
});
/*
var connection = new WebSocket('ws://192.168.1.104:4444');

connection.onopen = function (e) {
    console.log('Connected! '+e);
   // connection.send('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'); 
     
    // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
    var b = e.data.split(";");
    if(b[0] == "board"){
        if(b[3-2]=="move"){
              showFigure(''+b[2]);
    Move();
        }
  
    }
    console.log('Server: ' + e.data);
    
};
*/
function initBoard(){
    for(var coord=0;coord<64;coord++){
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
    if(get['board']>=0)
       connection.send("tabless;"+get['board']+";table;move;0;"+frcoord +";"+tocoord); 
   
}
function Move(){
    $('.figure').draggable();
    
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
             case 'U':return '&#9819;';
             case 'r':return '&#9820;';
             case 'b':return '&#9821;';
             case 'n':return '&#9822;';
             case 'p':return '&#9823;';        default:return '';
    }
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
