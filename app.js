
const dealer = document.querySelector("#dealers-card");
const imgElements = dealer.querySelectorAll("img");
const dealBtn = document.querySelector(".deal"); 
const hitBtn = document.querySelector(".hit"); 
const standBtn = document.querySelector(".stand"); 
const result = document.querySelector(".result"); 
let dealerScore = document.querySelector(".dealer-sum")
let playerResult = document.querySelector(".player-sum")
const values = ["ace", "2", "3","4","5","6","7","8","9","10","king","queen","jack"];
const suites = ["hearts", "diamonds", "spades", "clubs"];
const cards = [];
const resetBtn = document.querySelector(".reset");
let playersHand = []; 
let dealersHand = []; 
let dealerImages = []; 
let playerImages = []; 
const welcomeTitle = document.querySelector(".welcome")
const bustGame = document.querySelector(".bust-game"); 
const pushGame = document.querySelector(".push")
const dealerTitle = document.querySelector(".dealer-win");
const playerTitle = document.querySelector(".player-win");
let hitCount = 2; 
const playAgain = document.querySelector('.play-again'); 
const betValue = document.querySelector('.bet');
let bet = 0; 
let currentMoney = 2000; 
const invalidBet = document.querySelector('.invalid-bet');
const noCash = document.querySelector('.no-cash');
const enterBet = document.querySelector('.enter-bet');
const bankMoney = document.querySelector('.money');
const cancelBtn = document.querySelector('.cancel'); 

updateMoneyText();

function updateMoneyText() {
    
    bankMoney.innerHTML = `${currentMoney}`;
    
}
function image(container, card)
{
  
    const img = document.createElement("img");
    img.src = `cards/${card}.png`;
    container.appendChild(img); 
    return img;
   
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

    if(cards.length <=10){
        setCards();
    }
        

    push(playersHand); 
    let playerImg = image(document.querySelector(".playerCards"),playersHand[0]);
    playerImages.push(playerImg);
    push(dealersHand);
    let dealerImg = image(dealer, dealersHand[0]);
    dealerImages.push(dealerImg); 
    push(playersHand);
    playerImg = image(document.querySelector(".playerCards"),playersHand[1]);
    playerImages.push(playerImg);

    sum(playersHand);
    sum(dealersHand); 
    blackjack(playersHand);

    displayResult(playerResult, playersHand);
    displayResult(dealerScore, dealersHand);


}


//find sum of the hand

function check(sumOf){
    
    if(sumOf > 21)
    {
        
        bustGame.style.display = 'block';
        currentMoney -= bet;
        console.log(currentMoney);
        updateMoneyText();
        gameOver();
    }
}    


function sum(hand)
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


//the game is over

function gameOver()
{
    //if the current money is less than the bet
    if(currentMoney > bet)
    {
        hitBtn.style.display = "none"; 
        standBtn.style.display = "none"; 
        resetBtn.style.display= "block"; 
        cancelBtn.style.display = 'block';
        console.log(cards.length);
        return;  
    }
    else
    {
        hitBtn.style.display = "none"; 
        standBtn.style.display = "none"; 
        resetBtn.style.display= "none"; 
        cancelBtn.style.display = 'block';
        console.log(cards.length);
        return;  
    }
}


//check if its a bust


function resetGame()
{

    playersHand = [];
    dealersHand = []; 
    dealerImages.forEach(img =>{
        img.remove();
    });
    playerImages.forEach(img => {
        img.remove();
    });
    dealerImages = [];
    playerImages =[];
    hitCount = 2;
    
    
    console.log(playerImages.length)



}

//what happens when you press HIT 
function hit(i)
{
    
    if (sum(playersHand) <= 21)
    {
        push(playersHand); 
        check(sum(playersHand)); 
        displayResult(playerResult, playersHand);
        let playerImg = image(document.querySelector(".playerCards"), playersHand[i]);
        playerImages.push(playerImg);
        console.log(playerImages.length);
    }
}


//SHOWS THE SUM OF THE HAND
function displayResult(score, hand)
{   
    score.innerHTML = `${sum(hand)}`;
}


//DEAL BUTTON 
dealBtn.addEventListener('click',()=>
{
    bet = parseInt(betValue.value);
    welcomeTitle.style.display = 'none';
    if(bet > 0 && bet <= currentMoney)
    {
        dealBtn.style.display = 'none'; 
        standBtn.style.display = 'block'
        hitBtn.style.display = 'block'; 
        pushGame.style.display = 'none';
        dealerScore.style.display = 'block';
        playerResult.style.display = 'block';
        playAgain.style.display = 'none'; 
        betValue.style.display = 'none';
        enterBet.style.display = 'none'; 
        invalidBet.style.display = 'none';
        noCash.style.display = 'none';

        
        deal(); 
    }
    else if(bet > currentMoney){
        enterBet.style.display = 'none'; 
        invalidBet.style.display = 'none';
        noCash.style.display = 'block'; 
    }
    else if (bet < 0)
    {
        enterBet.style.display = 'none';
        noCash.style.display = 'none';
        invalidBet.style.display = 'block';

    }
    else 
    {
        invalidBet.style.display = 'none';
        noCash.style.display = 'none';
        enterBet.style.display = 'block';
    }

})



//HIT BUTTON
hitBtn.addEventListener('click',()=>
{
    hit(hitCount);
    hitCount++; 
})

//CHECK IF IT'S A BLACKJACK
function blackjack(hand)
{
    if (sum(hand) === 21)
    {
        result.innerHTML= "BlackJack";
        gameOver();
    }
    
}


//the DEALER'S TURN
function dealerSum()
{   
    
    let i =1;
    do
    {
        
        push(dealersHand); 
        let dealerImg = image(dealer, dealersHand[i++]);
        dealerImages.push(dealerImg); 
       
        
        displayResult( dealerScore, dealersHand);
       
      

        checkDealer(); 
        
    }
    while (sum(dealersHand) < 21 && sum(dealersHand) < sum(playersHand))
   

}
function checkDealer()
{   
    if (sum(dealersHand) > 21)
    {
        playerWins();
        gameOver();
    }    
    else if (sum(dealersHand) > sum(playersHand) && sum(dealersHand) <= 21 )
    {

  
        dealersWins();
        gameOver();
    }
    else if(sum(dealersHand) > sum(playersHand) && sum(dealersHand) > 21)
    {
        playerWins();
        gameOver(); 
    }
    else if(sum(dealersHand) === sum(playersHand))
    {
        pushGame.style.display = "block";
        gameOver();
    }
}

//THE DEALER HAS WON



function dealersWins()
{   
    currentMoney -= bet;
    updateMoneyText();
    dealerTitle.style.display = "block";
    
} 


//THE PLAYER HAS WON 

function playerWins()
{
    currentMoney += bet;
    updateMoneyText();
    playerTitle.style.display = "block";

}


// THE STAND DOES THIS 
function stand()
{
    
    hitBtn.style.display = "none"; 
    standBtn.style.display="none"; 
   
    
    dealerSum();
}


function cancel()
{
    resetGame();
    bet = 0; 
    resetBtn.style.display = 'none';  
    betValue.style.display = 'block';
    dealBtn.style.display = 'block';
    
}

standBtn.addEventListener("click", ()=>
{
    stand();
})


resetBtn.addEventListener("click", ()=>
{
    dealBtn.style.display= 'block';
    dealerTitle.style.display = 'none'; 
    playerTitle.style.display = 'none';
    bustGame.style.display = 'none';
    pushGame.style.display = 'none'; 
    resetBtn.style.display = "none";
    dealerScore.style.display = 'none';
    playerResult.style.display = 'none'; 
    cancelBtn.style.display = 'none'; 
    
    resetGame(); 
    

});

cancelBtn.addEventListener('click', ()=>{
    dealBtn.style.display= 'block';
    dealerTitle.style.display = 'none'; 
    playerTitle.style.display = 'none';
    bustGame.style.display = 'none';
    pushGame.style.display = 'none'; 
    resetBtn.style.display = "none";
    dealerScore.style.display = 'none';
    playerResult.style.display = 'none'; 
    cancelBtn.style.display= 'none';
    enterBet.style.display = 'block';
    
    cancel(); 
})
