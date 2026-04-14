// 1. GLOBAL SYSTEM STATE
let score = 0;
let topScore = localStorage.getItem('topScore') || 0;
let gameInterval;
const stage = document.getElementById('game-stage');

// Initialize top score display from HTML [7, Conversation]
window.onload = function() {
    const topScoreElement = document.getElementById('topScore');
    if (topScoreElement) topScoreElement.innerText = topScore;
};

// 2. PROTOCOL NAVIGATION
function nav(type) {
    clearInterval(gameInterval); // Stop active loops [1]
    stage.innerHTML = ""; // Clear stage [1]
    document.onkeydown = null; // Reset keys [1]
    beginGame(type);
}

function beginGame(type) {
    if (type === 'ttt') initTTT();
    if (type === 'cards') initCards();
    if (type === 'meteor') startMeteor();
    if (type === 'blade') startBlade();
}

// 3. GAME 1: TIC-TAC-TOE (Fixed Win Patterns)
let tttState = ["","","","","","","","",""];
let turn = "X";

// FIXED: Corrected indices for a 3x3 grid (0-8) [2, 3]
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function initTTT() {
    tttState = ["","","","","","","","",""];
    turn = "X";
    stage.innerHTML = `<div class="ttt-grid">
        ${tttState.map((_, i) => `<div class="cell" id="c${i}" onclick="tttMove(${i})"></div>`).join('')}
    </div>`;
}

function tttMove(i) {
    if (!tttState[i]) {
        tttState[i] = turn;
        document.getElementById(`c${i}`).innerHTML = turn;
        if (checkTTTWin()) {
            alert("SYSTEM BYPASSED: Player " + turn + " wins!");
            updateScore(500); // [3]
            initTTT();
        } else {
            turn = (turn === "X") ? "O" : "X";
        }
    }
}

function checkTTTWin() {
    for (let p of winPatterns) {
        const [a, b, c] = p;
        if (tttState[a] !== "" && tttState[a] === tttState[b] && tttState[a] === tttState[c]) return true;
    }
    return false;
}

// 4. GAME 2: MEMORY MATCH (Fixed State & Penalty)
let flipped = [];
let lockBoard = false;
let matchedPairs = 0;

function initCards() {
    flipped = [];
    lockBoard = false;
    matchedPairs = 0;
    let symbols = ["⚡", "⚡", "🔥", "🔥", "💎", "💎", "👾", "👾"];
    symbols.sort(() => 0.5 - Math.random()); // [5]
    stage.innerHTML = symbols.map((s, i) => 
        `<div class="card" id="card${i}" data-val="${s}" onclick="cardClick(${i})">?</div>`
    ).join('');
}

function cardClick(i) {
    let el = document.getElementById(`card${i}`);
    if (lockBoard || el.innerHTML !== "?" || flipped.length >= 2) return;

    el.innerHTML = el.getAttribute("data-val");
    flipped.push(el);

    if (flipped.length === 2) {
        lockBoard = true;
        checkCardMatch();
    }
}

function checkCardMatch() {
    const [c1, c2] = flipped;
    if (c1.getAttribute("data-val") === c2.getAttribute("data-val")) {
        updateScore(200); // Reward for match [5]
        flipped = [];
        lockBoard = false; // Pairs remain open as innerHTML is not reset
        matchedPairs++;
        if (matchedPairs === 4) {
            setTimeout(() => {
                alert("SYSTEM BYPASSED: Memory Match Complete!");
                initCards();
            }, 800);
        }
    } else {
        updateScore(-50); // Penalty for mismatch [Conversation]
        setTimeout(() => {
            c1.innerHTML = "?";
            c2.innerHTML = "?";
            flipped = [];
            lockBoard = false;
        }, 800); // [5]
    }
}

// 5. GAME 3: METEOR BLASTER (Collision Added)
function startMeteor() {
    let shipPos = 50;
    stage.innerHTML = "";
    let ship = document.createElement("div");
    ship.className = "ship";
    ship.innerHTML = "🚀";
    ship.style.position = "absolute";
    ship.style.bottom = "10px";
    ship.style.left = "50%";
    ship.style.transform = "translateX(-50%)";
    stage.appendChild(ship);

    let lastFire = 0;
    document.onkeydown = (e) => {
        if (e.key === "ArrowLeft" && shipPos > 5) shipPos -= 5;
        if (e.key === "ArrowRight" && shipPos < 95) shipPos += 5;
        if (e.key === " ") {
            e.preventDefault();
            let now = Date.now();
            if (now - lastFire > 300) {
                fireBeam(shipPos);
                lastFire = now;
            }
        }
        ship.style.left = shipPos + "%";
    };
    gameInterval = setInterval(spawnMeteor, 1000);
}

function fireBeam(pos) {
    let beam = document.createElement("div");
    beam.className = "missile";
    beam.style.left = pos + "%";
    beam.style.bottom = "60px";
    stage.appendChild(beam);

    let moveBeam = setInterval(() => {
        if (!beam.parentElement) {
            clearInterval(moveBeam);
            return;
        }

        let b = parseInt(beam.style.bottom);
        beam.style.bottom = (b + 7) + "px";

        // Collision logic [6, Conversation]
        let hit = false;
        let rocks = document.querySelectorAll('.rock');
        for (let i = 0; i < rocks.length; i++) {
            let rock = rocks[i];
            let rRect = rock.getBoundingClientRect();
            let bRect = beam.getBoundingClientRect();
            if (!(bRect.right < rRect.left || bRect.left > rRect.right || bRect.bottom < rRect.top || bRect.top > rRect.bottom)) {
                rock.remove();
                beam.remove();
                clearInterval(moveBeam);
                updateScore(100);
                hit = true;
                break;
            }
        }

        if (!hit && b > 450) { beam.remove(); clearInterval(moveBeam); }
    }, 20);
}

function spawnMeteor() {
    let r = document.createElement("div");
    r.className = "rock";
    r.innerHTML = "☄️";
    r.style.left = Math.random() * 90 + "%";
    r.style.top = "0px";
    stage.appendChild(r);

    let fall = setInterval(() => {
        if (!r.parentElement) { clearInterval(fall); return; }
        let t = parseInt(r.style.top);
        r.style.top = (t + 3) + "px";
        if (t > 440) { r.remove(); clearInterval(fall); }
    }, 30);
}

// 6. GAME 4: BLADE MASTER (Slicing Added)
function startBlade() {
    gameInterval = setInterval(() => {
        let f = document.createElement("div");
        f.className = "fruit";
        f.innerHTML = "🍎";
        f.style.left = Math.random() * 90 + "%";
        f.style.top = "0px";

        // Slicing interaction [7, Conversation]
        f.onmouseover = () => {
            updateScore(50);
            f.innerHTML = "💥";
            setTimeout(() => f.remove(), 100);
        };

        stage.appendChild(f);
        let fall = setInterval(() => {
            if (!f.parentElement) { clearInterval(fall); return; }
            let t = parseInt(f.style.top);
            f.style.top = (t + 4) + "px";
            if (t > 440) { f.remove(); clearInterval(fall); }
        }, 30);
    }, 800);
}

// 7. DATA MANAGEMENT (Score Persistence)
function updateScore(pts) {
    score += pts;
    // Note: To see current score, add <b id="scoreDisplay">0</b> to your HTML
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) scoreDisplay.innerText = score;

    if (score > topScore) {
        topScore = score;
        localStorage.setItem('topScore', topScore);
        const topScoreElement = document.getElementById('topScore');
        if (topScoreElement) topScoreElement.innerText = topScore;
    }
}