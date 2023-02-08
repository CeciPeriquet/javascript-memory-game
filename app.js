document.addEventListener('DOMContentLoaded', () => {
  //card info
  const cardArray = [
    {
      name: 'kitty1',
      img: 'images/kitty1.png',
    },
    {
      name: 'kitty1',
      img: 'images/kitty1.png',
    },
    {
      name: 'kitty2',
      img: 'images/kitty2.png',
    },
    {
      name: 'kitty2',
      img: 'images/kitty2.png',
    },
    {
      name: 'kitty3',
      img: 'images/kitty3.png',
    },
    {
      name: 'kitty3',
      img: 'images/kitty3.png',
    },
    {
      name: 'kitty4',
      img: 'images/kitty4.png',
    },
    {
      name: 'kitty4',
      img: 'images/kitty4.png',
    },
    {
      name: 'kitty5',
      img: 'images/kitty5.png',
    },
    {
      name: 'kitty5',
      img: 'images/kitty5.png',
    },
    {
      name: 'kitty6',
      img: 'images/kitty6.png',
    },
    {
      name: 'kitty6',
      img: 'images/kitty6.png',
    },
  ];
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#info-result');
  const gameText = document.querySelector('.info-text');
  const restartBtn = document.querySelector('.restart');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/kittyfinder.png');
      card.setAttribute('data-id', i);
      card.setAttribute('class', 'card');
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
    gameText.textContent = 'Start playing!';
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/kittyfinder.png');
      cards[optionTwoId].setAttribute('src', 'images/kittyfinder.png');
      gameText.textContent = 'You have clicked the same image!';
    } else if (cardsChosen[0] === cardsChosen[1]) {
      gameText.textContent = 'You found a match!';
      cards[optionOneId].setAttribute('src', 'images/background.png');
      cards[optionTwoId].setAttribute('src', 'images/background.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'images/kittyfinder.png');
      cards[optionTwoId].setAttribute('src', 'images/kittyfinder.png');
      gameText.textContent = 'Sorry, try again.';
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      gameText.textContent = 'Congratulations! You found them all!';
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  //restart game
  function handleRestart() {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.querySelector('.card');
      grid.removeChild(card);
    }
    cardsWon = [];
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    createBoard();
    gameText.textContent = 'Start playing!';
  }

  createBoard();
  restartBtn.addEventListener('click', handleRestart);
});
