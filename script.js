const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 13)
        card.style.order = randomPos
    })
})()

function flipCard() {
    if (lockBoard) return
    this.classList.add('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    if (this === firstCard) return

    secondCard = this
    hasFlippedCard = false
    lockBoard = true

    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

cards.forEach(card => card.addEventListener('click', flipCard))