const parrotImages = [
  'imagens/bobrossparrot.gif',
  'imagens/explodyparrot.gif', 
  'imagens/fiestaparrot.gif', 
  'imagens/metalparrot.gif', 
  'imagens/revertitparrot.gif', 
  'imagens/tripletsparrot.gif', 
  'imagens/unicornparrot.gif',
];

function startGame() {
  const numCards = Number(prompt("Digite com quantas cartas você quer jogar:"));

  if (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
    alert("Escolha um número par de cartas entre 4 e 14!");
    startGame();
  } else {
    const cards = createCardPairs(numCards);
    addCards(cards);
  }
}

function createCardPairs(numCards) {
  const onePairCards = [];

  for (let i = 0; i < numCards / 2; i++) {
    onePairCards.push(parrotImages[i]);
    console.log(onePairCards);

  }

  let doubledCards = [];

  onePairCards.forEach(cards => {
    doubledCards.push(cards);
    doubledCards.push(cards);
  });

  doubledCards.sort(() => Math.random() - 0.5);

  return doubledCards;
} 

function addCards(cards) {
  const gameBoard = document.querySelector(".game-board");

  cards.forEach(parrotImage => {
    gameBoard.innerHTML += `
      <div class="card" onclick="flipCard(this)" data-image="${parrotImage}">
        <div class="front-face face">
          <img src="./imagens/back.png" />
        </div>
        <div class="back-face face">
          <img src="${parrotImage}" />
        </div>
      </div>
    `
  });
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let clickCount = 0;

function flipCard(card) {
  if (lockBoard === true) return;
  if (card === firstCard) return;

  clickCount++;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  checkForVictory();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(function() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkForVictory() {
  const flippedCards = document.querySelectorAll('.flipped');
  const totalCards = document.querySelectorAll('.card');

  if (flippedCards.length === totalCards.length) {
    alert(`Você ganhou em ${clickCount} rodadas!`);
  }
}

startGame();