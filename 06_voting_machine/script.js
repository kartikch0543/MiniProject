let votes = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

function vote(candidateId) {
    votes[candidateId]++;
    document.getElementById(`count${candidateId}`).innerText = votes[candidateId];

    // Simulate "beep"
    const btn = document.querySelector(`#c${candidateId} button`);
    const originalText = btn.innerText;
    btn.innerText = "Voted!";
    setTimeout(() => {
        btn.innerText = originalText;
    }, 1000);
}

function showWinner() {
    let maxVotes = -1;
    let winners = [];
    const names = {
        1: "Team Alpha",
        2: "Team Beta",
        3: "Team Gamma",
        4: "NOTA"
    };

    for (let id in votes) {
        if (votes[id] > maxVotes) {
            maxVotes = votes[id];
            winners = [names[id]];
        } else if (votes[id] === maxVotes) {
            winners.push(names[id]);
        }
    }

    const modal = document.getElementById('winnerModal');
    const text = document.getElementById('winnerText');

    if (maxVotes === 0) {
        text.innerText = "No votes yet!";
    } else {
        if (winners.length > 1) {
            text.innerText = "Tie: " + winners.join(" & ");
        } else {
            text.innerText = "Winner: " + winners[0];
        }
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('winnerModal').style.display = 'none';
}

function resetVotes() {
    votes = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`count${i}`).innerText = 0;
    }
    alert("System Reset Successfully");
}
