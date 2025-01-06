const cards = ['🎅', '🎄', '🎁', '⛄', '🔔', '🦌', '🎅', '🎄', '🎁', '⛄', '🔔', '🦌'];
let flippedCards = [];
let moves = 0;

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffleCards();

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardIndex = index;
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${card}</div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').textContent = moves;
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.querySelector('.card-back').textContent === card2.querySelector('.card-back').textContent;

    if (isMatch) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function resetGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    flippedCards = [];
    moves = 0;
    
    document.getElementById('moves').textContent = moves;
    
    createBoard();
}

document.getElementById('reset-btn').addEventListener('click', resetGame);

createBoard();