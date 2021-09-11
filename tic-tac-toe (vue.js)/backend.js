
var validation = new Vue({
    data: {
        bsize: 3,
        wsize: 3,
        turn: 1
    },
    methods: {
        validate(id){
            //check L/R
            list[id] =  items[id].innerHTML;
            var rows = [];

            for(i=0; i <= list.length-boardsize; i=parseInt(i)+parseInt(boardsize)){ //i=parseInt(i+boardsize) makes i move down to the next row
                rows.push(list.slice(i, parseInt(i)+parseInt(boardsize))); //this takes the next two in front of i and puts it into the appropraite set
            }
            
            for(i=0; i < rows.length; i++){
                if(parseInt(rows[i].filter(x => x == "X").length) == parseInt(winsize)){
                    alert("Congradulations, Player " + items[id].innerHTML);
                    break;
                }
                
                if(parseInt(rows[i].filter(x => x == "O").length) == parseInt(winsize)){
                    alert("Congradulations, Player " + items[id].innerHTML);
                    break;
                }
            }
                    
            //check U/D
            var cols = new Array(boardsize).fill([]);
            var x = 0;
            var temp = [];
            
            for(i=0; i < boardsize; i++){
                for(x=i; x < boardsize*boardsize; x=x+parseInt(boardsize)){
                    temp.push(items[x].innerHTML);
                }

                cols[i] = temp;
                //console.log(i + ": " + cols[i]) //use to diagnose where it's pushing the letter
                temp = []
            }

            for(i=0; i < cols.length; i++){
                if(parseInt(cols[i].filter(x => x == "X").length) == parseInt(winsize)){
                    alert("Congradulations, Player " + items[id].innerHTML);
                    break;
                }

                if(parseInt(cols[i].filter(x => x == "O").length) == parseInt(winsize)){
                    alert("Congradulations, Player " + items[id].innerHTML);
                    break;
                }
            }

            //check diag
            var ddiags = new Array(2).fill([]);
            var udiags = new Array(2).fill([]);
            var x = 0;
            
                //check down
                for(i=0; i < boardsize; i++){
                    var temp = [];

                    for(x=i; x < boardsize*boardsize; x=x+parseInt(boardsize)+1){
                        temp.push(items[x].innerHTML);
                    }

                    ddiags[i] = temp;

                    if(parseInt(ddiags[i].filter(x => x == "X").length) == parseInt(winsize)){
                        alert("Congradulations, player " + items[id].innerHTML);
                        break;
                    }
                    
                    if(parseInt(ddiags[i].filter(x => x == "O").length) == parseInt(winsize)){
                        alert("Congradulations, player " + items[id].innerHTML);
                        break;
                    }

                    //console.log(i + ": " + ddiags[i]) //use to diagnose where it's pushing the letter
                }

                //check up
                for(i=0; i < boardsize; i++){
                    var temp = [];

                    for(x=boardsize*boardsize-1; x > boardsize; x=x-parseInt(boardsize)-1){
                        temp.push(items[x].innerHTML);
                        console.log("ID: " + id)
                    }

                    udiags[i] = temp;

                    if(parseInt(udiags[i].filter(x => x == "X").length) == parseInt(winsize)){
                        alert("Congradulations, player " + items[id].innerHTML);
                        break;
                    }
                    
                    if(parseInt(udiags[i].filter(x => x == "O").length) == parseInt(winsize)){
                        alert("Congradulations, player " + items[id].innerHTML);
                        break;
                    }

                    console.log("Row " + i + ": " + udiags[i]) //use to diagnose where it's pushing the letter
                }
                console.log("-----------------")


            //validate winner
            /*for(i=0; i < diags.length; i++){
                if(parseInt(diags[i].filter(x => x == "X").length) == parseInt(winsize)){
                    alert("Congradulations, player " + items[id].innerHTML);
                    break;
                }
                
                if(parseInt(diags[i].filter(x => x == "O").length) == parseInt(winsize)){
                    alert("Congradulations, player " + items[id].innerHTML);
                    break;
                }
            }*/
        }
    }
})

var generation = new Vue({
    el: "#app",
    data: {
        bsize: 3,
        wsize: 3,
        turn: 1
    },

    methods: {
        reset(){
            document.getElementById('submit').disabled = false;
            document.getElementById('reset').disabled = true;
            document.getElementById('bsize').value = "3";
            document.getElementById('wsize').value = "3";
            document.getElementsByClassName('grid-container')[0].remove();
            turn = 1;
        },

        generate(bsize, wsize){
            turn = this.turn
            if(document.getElementById('bsize').value != ""){
                bsize = document.getElementById('bsize').value
                wsize = document.getElementById('wsize').value
            } else {
                bsize = this.bsize
                wsize = this.wsize
            }

            document.getElementById('submit').disabled = true;
            document.getElementById('reset').disabled = false;
            list = Array(bsize*bsize).map(x => 0); //fills list with 0's
            
            var container = document.createElement('div');
            container.className = 'grid-container';
        
            boardsize = bsize;
            winsize = wsize;

            if((bsize >= 3 & wsize >= 3) & (bsize >= wsize)){
                container.style.gridTemplateColumns = "repeat(" + bsize + ", 1fr)"
                document.body.appendChild(container);
            
                for(var i=0; i<bsize*bsize; i++){
                    var div = document.createElement('div');
                    div.className = 'grid-item';
                    div.id = i;
                    container.appendChild(div);
                }
                items = document.querySelectorAll(".grid-item")
            
                for(let i=0; i < items.length; i++) { 
                    items[i].addEventListener("click", function() {
                        if(turn == 1) {
                            document.getElementById(i).innerHTML = "X";
                            turn = 2;
                            validation.validate(i)
                        } else if (turn == 2) {
                            document.getElementById(i).innerHTML = "O";
                            turn = 1;
                            validation.validate(i)
                        }
                    })
                }
            } else {
                bsize = 3;
                wsize = 3;
                generate(bsize, wsize)
                document.getElementById('bsize').value = "3";
                document.getElementById('wsize').value = "3";
            }
        }
    }
})
