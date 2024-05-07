
const dealer = document.querySelector("#dealers-card");
const dealBtn = document.querySelector(".deal"); 
const hitBtn = document.querySelector(".hit"); 
const standBtn = document.querySelector(".stand"); 
const result = document.querySelector(".result"); 
let dealerScore = document.querySelector(".dealer-sum")
let playerResult = document.querySelector(".player-sum")
const values = ["ace", "2", "3","4","5","6","7","8","9","10","king","queen","jack"];
const suites = ["hearts", "diamonds", "spades", "clubs"];
const cards = [];
let playersHand = []; 
let dealersHand = []; 

function image(container, card)
{
    console.log(`this is the card: ${card}`);
    const img = document.createElement("img");
    img.src = `cards/${card}.png`;
    container.appendChild(img); 
   
}

function setCards() //loads card deck
{
    for(let i=0; i<suites.length; i++)
    {
        for(j=0; j<values.length; j++)
        {
            cards.push(`${values[j]}_of_${suites[i]}`); 
        }
    } 
}

function push(hand)
{
    let random = Math.floor(Math.random() * cards.length);
    hand.push(cards[random]);
    cards.splice(random, 1);
}
function deal() //inital deal
{

    setCards();

    push(playersHand); 
    image(document.querySelector(".playerCards"),playersHand[0]);
    push(dealersHand);
    image(dealer, dealersHand[0]); 
    push(playersHand);
    image(document.querySelector(".playerCards"),playersHand[1]);

    sum(playersHand);
    sum(dealersHand); 
    blackjack(playersHand);

    displayResult(playerResult, playersHand);
    displayResult(dealerScore, dealersHand);
    
}

function sum(hand) //find sum 
{

    let sum = 0;

    for(i=0; i< hand.length; i++)
    {   
      
        let value = hand[i].slice(0,1);
        let ten = hand[i].substring(0,2);
        
        
        if(value === "k" || value === "q" || value==="j")
        {
            sum += 10; 
        }
        else if(value === "a")
        {
            sum +=1;
        }
        else if (ten==="10")
        {
            sum+=10; 
        }
        else
        {
            sum+=parseInt(value); 
        }

    }



    return sum;
}

function gameOver()
{
    hitBtn.style.display = "none"; 
    standBtn.style.display = "none"; 
}

function check(sumOf){
    
    if(sumOf> 21)
    {
        result.innerHTML = "BUST";
        gameOver();
    }
    else if(sum(dealersHand) > sum(playersHand) && sum(dealersHand) <= 21)
    {
        dealersWins();
    }
    else{

    }
}

function hit()
{
    let i=2;

    random = Math.floor(Math.random() * cards.length);
    playersHand.push(cards[random]);
    cards.splice(random,1);
    image(document.querySelector(".playerCards"),playersHand[i++]);
    sum(playersHand);
    check(sum(playersHand)); 
    displayResult(playerResult, playersHand);
    
    
}

function displayResult(score, hand)
{   
    score.innerHTML = `${sum(hand)}`;
}
dealBtn.addEventListener('click',()=>
{
    dealBtn.style.display = 'none'; 
    deal(); 
    
})

hitBtn.addEventListener('click',()=>
{
    hit();

})

function blackjack(hand)
{
    if (sum(dealersHand) === 21)
    {
        result.innerHTML= "BlackJack";
        gameOver();
    }
    
}

function dealerSum()
{
    let i =1;
    random = Math.floor(Math.random() * cards.length);
    dealersHand.push(cards[random]);
    image(dealer, dealersHand[i++]);
    cards.splice(random,1);
    blackjack(dealersHand);
    sum(dealersHand);
    check(sum(dealersHand)); 
    
    
    
    while(sum(dealersHand) < 21)
    {
       
        random = Math.floor(Math.random() * cards.length);
        dealersHand.push(cards[random]);
        image(dealer, dealersHand[i++]);
        cards.splice(random,1);
        sum(dealersHand);
        check(sum(dealersHand)); 
        

        displayResult( dealerScore, dealersHand);
        winDecision();
        
    }    
    
}

function dealersWins(){

    result.innerHTML = "DEALER WINS"; 
    gameOver();

    return;

} 

function playerWins()
{
    result.innerHTML = "PLAYER WINS"
}


function stand()
{
    
    hitBtn.style.display = "none"; 
    standBtn.style.display="none"; 
    dealerSum(); 
}

function winDecision()
{
    if(sum(dealersHand) > sum(playersHand) && sum(dealersHand) <= 21)
    {
        dealersWins(); 
    }
    else if(sum(dealersHand) === sum(playersHand))
    {
        result.innerHTML = "PUSH"
        gameOver(); 
    }
    else if(sum(dealersHand) > 21 && sum(playersHand) <= 21)
    {
        playerWins();
        gameOver();
    }
    else
    {
        playerWins(); 
    }

    gameOver(); 
}


standBtn.addEventListener("click", ()=>
{
    stand();
})
