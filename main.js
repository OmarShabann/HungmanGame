// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Array Of Letters
let LettersArr = Array.from(letters);

// Letters Container
let lettersContainer = document.querySelector(".letters");

// Adding Letters to The Page
for (i = 0; i < LettersArr.length; i++) {
	let span = document.createElement("span");

	span.append(`${LettersArr[i].toUpperCase()}`);

	span.className = "letter-box";

	lettersContainer.appendChild(span);
}

// Object Of Words + Categories
const words = {
	programming: [
		"php",
		"javascript",
		"go",
		"scala",
		"fortran",
		"r",
		"mysql",
		"python",
	],
	movies: [
		"Prestige",
		"Inception",
		"Parasite",
		"Interstellar",
		"Whiplash",
		"Memento",
		"Coco",
		"Up",
	],
	people: [
		"Albert Einstein",
		"Hitchcock",
		"Alexander",
		"Cleopatra",
		"Mahatma Ghandi",
	],
	countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Getting random property
let wordsKeys = Object.keys(words);

let randomNumKeys = Math.floor(Math.random() * wordsKeys.length);

let randomCategory = wordsKeys[randomNumKeys];

// Setting catecory word in the header
document.querySelector(".category span").innerHTML = randomCategory;

// Getting random word from the random category
let randomValues = words[randomCategory];

let randomNumValues = Math.floor(Math.random() * randomValues.length);

let randomValue = randomValues[randomNumValues];

// Adding Empty Spans
let arrOfValue = Array.from(randomValue.toLowerCase());

arrOfValue.forEach((e) => {
	let span = document.createElement("span");

	if (e === " ") {
		span.classList.add("space-span");
		span.classList.add("correct");
		span.innerHTML = " ";
	}

	document.querySelector(".letters-guess").appendChild(span);
});

let wrongAttempts = 0;

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
	let status = false;

	if (e.target.className == "letter-box") {
		e.target.classList.add("clicked");

		let clickedChar = e.target.innerHTML.toLowerCase();

		// Comparing the clicked letter with the word letters
		for (let i = 0; i < arrOfValue.length; i++) {
			if (clickedChar == arrOfValue[i]) {
				status = true;

				let correctSpan = document.querySelector(
					`.letters-guess span:nth-child(${i + 1})`
				);

				correctSpan.classList.add("correct");

				correctSpan.innerHTML = clickedChar;
			}
		}
		if (status == false) {
			wrongAttempts++;

			document
				.querySelector(".hangman-draw")
				.classList.add(`wrong-${wrongAttempts}`);

			document.getElementById("fail").play();

			if (wrongAttempts == 6) {
				failGame();
				lettersContainer.classList.add("fineshed");
			}
		} else {
			document.getElementById("success").play();
			let correctSpans = document.querySelectorAll(".correct");
			if (correctSpans.length == arrOfValue.length) {
				successGame();
			}
		}
	}
});

// Ending the game
let popup = document.querySelector(".popup");
let popupContent = document.querySelector(".popup .content");

function failGame() {
	let h2 = document.createElement("h2");
	h2.innerHTML = `Game Over`;

	let p = document.createElement("p");
	p.innerHTML = `The word is "${randomValue.toUpperCase()}"`;

	popupContent.appendChild(h2);
	popupContent.appendChild(p);

	popup.classList.toggle("active");
}

function successGame() {
	let h2 = document.createElement("h2");
	h2.innerHTML = `Winner !`;

	let p = document.createElement("p");
	p.innerHTML = `You made ${wrongAttempts} mistakes`;

	popupContent.appendChild(h2);
	popupContent.appendChild(p);

	popup.classList.toggle("active");
}

let closeBtn = document.querySelector(".popup .content .close");

closeBtn.addEventListener("click", () => {
	window.location.reload();
});

// Funny
console.log(`Are you programmer? Don't cheat :)`);
