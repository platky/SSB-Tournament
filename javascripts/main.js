console.log('This would be the main JS file.');

var chars = ["Mario",
    "Luigi",
    "Peach",
    "Bowser",
    "Mario",
    "Luigi",
    "Peach",
    "Bowser",
    "Dr. Mario",
    "Yoshi",
    "Donkey Kong",
    "Diddy Kong",
    "Link",
    "Zelda",
    "Sheik",
    "Ganondorf",
    "Toon Link",
    "Samus",
    "Zero Suit Samus",
    "Kirby",
    "Meta Knight",
    "King Dedede",
    "Fox",
    "Falco",
    "Pikachu",
    "Jigglypuff",
    "Charizard",
    "Lucario",
    "Captain Falcon",
    "Ness",
    "Marth",
    "Ike",
    "Mr. Game & Watch",
    "Pit",
    "Wario",
    "Olimar",
    "R.O.B",
    "Sonic",
    "Rosalina & Luma",
    "Bowser Jr.",
    "Greninja",
    "Robin",
    "Lucina",
    "Palutena",
    "Dark Pit",
    "Villager",
    "Little Mac",
    "Wii Fit Trainer",
    "Shulk",
    "Duck Hunt",
    "Mega Man",
    "Pac-Man",
    "Mii"
];

var DLCchars = [
    "Mewtwo",
    "Lucas",
    "Roy",
    "Ryu"
];

var players =[];

window.addEventListener('load', function() {
    var go = document.getElementById('go');
    go.addEventListener('click', function(){
        generateBracket();
    });

    var addPlayer= document.getElementById('addPlayer');
    addPlayer.addEventListener('click', function(){
        var player = document.getElementById('player');
        console.log("name is "+player);
        if(player != ""){
            players.push(player.value);
            var playerList = document.getElementById('players-list');
            var newItem = document.createElement('li');
            newItem.className="list-group-item";
            newItem.textContent=player.value;
            playerList.appendChild(newItem);
            player.value="";

        }
    });
});

function generateBracket () {
    //gather settings stuff
    var contestants = parseInt(document.getElementById('contestants').value);
    var duplicates = document.getElementById('duplicates').checked;
    var minLevel = parseInt(document.getElementById('minLevel').value);
    var maxLevel = parseInt(document.getElementById('maxLevel').value);
    console.log("min of "+minLevel+" max of "+ maxLevel);
    var err = document.getElementById("error");
    if(minLevel > maxLevel){
        err.textContent="Min Level must be less than or equal to Max Level";
        return;
    }
    err.textContent="";
    var teams=[];
    var spotsFilled=[];
    for(var i=0;i<players.length;i++){
        var spot = Math.floor((Math.random()*contestants)+1);
        console.log("Spot is "+ spot);
        if(spotsFilled.indexOf(spot)>-1){
            i--;
        } else {
            teams[spot-1]={name:players[i], seed:"Player"};
        }
    }

    for(var j=0; j<contestants;j++){
        if(teams[j]==null){
            //console.log("Empty at "+j);
            var fighter = chars[Math.floor(Math.random()*chars.length)];
            var level = Math.floor((Math.random()*(maxLevel-minLevel))+minLevel);
            //console.log("fighter of "+ fighter+" at level "+ level);
            if(duplicates==true){
                if(spotsFilled.indexOf(fighter)>-1){
                    j--;
                } else {
                    spotsFilled.push(fighter);
                    teams[j]={name:fighter, seed:level};
                }
            } else {
                spotsFilled.push(fighter);
                teams[j]={name:fighter, seed:level};
            }
        }
    }

    var bracket = document.getElementById('bracket1');
    bracket.textContent="";
    var divHead1 = document.createElement('h1');
    divHead1.textContent="Round 1";
    bracket.appendChild(divHead1);
    var winners=[];
    var total=contestants/2;
    for(var k=0; k<teams.length;k+=2){
        var divHead = document.createElement('h2');
        var num =Math.ceil(k/2);
        divHead.textContent="Match "+(num+1);
        var player1=document.createElement('p');
        player1.textContent=(k+1)+". "+teams[k].name+" Lvl. "+teams[k].seed;
        player1.id=""+k;
        var player2=document.createElement('p');
        player2.textContent=(k+2)+". "+teams[k+1].name+" Lvl. "+teams[k+1].seed;
        player2.id=""+(k+1);
        bracket.appendChild(divHead);
        bracket.appendChild(player1);
        bracket.appendChild(player2);

        player1.addEventListener('click',function(e){
            e.target.style.color="#1CFF3C";
            e.target.style.fontWeight="bold";
            var num= parseInt(e.target.id);
            num=Math.ceil(num/2);
            winners[num]= e.target.textContent;

            if(checkFull(winners,total)==true){
                //start next round
                startRound(winners, 2);
            }

        });
        player2.addEventListener('click',function(e){
            e.target.style.color="#1CFF3C";
            e.target.style.fontWeight="bold";
            var num= parseInt(e.target.id);
            num=Math.ceil(num/2);
            winners[num-1]= e.target.textContent;
            console.log("win at "+num+" by "+ e.target.textContent);
            if(checkFull(winners,total)==true){
                //start next round
                startRound(winners, 2);
            }

        });

    }

}

function checkFull(winners, total){
    console.log("check... with total of "+total);
    console.log("winners "+winners.length);
    if(winners.length<total){
        return false;
    }
    for(var i=0; i<total;i++){
        console.log(winners[i]);
        if(winners[i]==null){
            return false;
        }
    }
    return true;
}

function startRound(winners, round){
    var len=winners.length;
    var teams=winners;
    var bracket = document.getElementById('bracket1');
    bracket.textContent="";
    var divHead1 = document.createElement('h1');
    if(len==1){
        divHead1.textContent="Winner!";
        var player1=document.createElement('p');
        player1.textContent=teams[0];
        bracket.appendChild(divHead1);
        bracket.appendChild(player1);
        return;
    }
    divHead1.textContent="Round "+round;
    bracket.appendChild(divHead1);
    var winners=[];
    var total=len/2;
    for(var k=0; k<teams.length;k+=2){
        var divHead = document.createElement('h2');
        var num =Math.ceil(k/2);
        divHead.textContent="Match "+(num+1);
        var player1=document.createElement('p');
        player1.textContent=teams[k];
        player1.id=""+k;
        var player2=document.createElement('p');
        player2.textContent=teams[k+1];
        player2.id=""+(k+1);
        bracket.appendChild(divHead);
        bracket.appendChild(player1);
        bracket.appendChild(player2);

        player1.addEventListener('click',function(e){
            e.target.style.color="#1CFF3C";
            e.target.style.fontWeight="bold";
            var num= parseInt(e.target.id);
            num=Math.ceil(num/2);
            winners[num]= e.target.textContent;

            if(checkFull(winners,total)==true){
                //start next round
                startRound(winners, round+1);
            }

        });
        player2.addEventListener('click',function(e){
            e.target.style.color="#1CFF3C";
            e.target.style.fontWeight="bold";
            var num= parseInt(e.target.id);
            num=Math.ceil(num/2);
            winners[num-1]= e.target.textContent;

            if(checkFull(winners,total)==true){
                //start next round
                startRound(winners, 2);
            }

        });

    }
}