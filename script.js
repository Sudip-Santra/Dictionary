const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const input = document.getElementById("inp-word");

btn.addEventListener("click", searchWord);
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchWord();
    }
});

function searchWord() {
    let inpWord = input.value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            
            const audioUrl = data[0].phonetics[0] && data[0].phonetics[0].audio;
            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
                sound.load();  // Reload the audio
            } else {
                sound.setAttribute("src", "");
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}

function playSound() {
    if (sound.src) {
        sound.play().catch(error => {
            console.error("Error playing sound:", error);
            alert("Unable to play the audio.");
        });
    } else {
        alert("No audio available for this word");
    }
}
