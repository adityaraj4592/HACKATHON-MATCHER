let participants = [];
const TEAM_MAX_SIZE = 3; // Maximum members per team

function addParticipant() {
    const name = document.getElementById('nameInput').value.trim();
    const role = document.getElementById('roleInput').value;

    if (name === '') {
        alert('Please enter a participant name!');
        return;
    }

    participants.push({ name, role });
    document.getElementById('nameInput').value = ''; 
    updateList();
}

function updateList() {
    const list = document.getElementById('participants');
    list.innerHTML = '';
    
    participants.forEach(p => {
        list.innerHTML += `<li><span>${p.name}</span> <span style="color:#94a3b8; font-size:0.9rem;">${p.role}</span></li>`;
    });
    
    document.getElementById('count').innerText = participants.length;
}

function generateTeams() {
    if (participants.length < 2) {
        alert('Add at least 2 participants to form a team!');
        return;
    }

    // 1. Calculate how many teams we need
    const numTeams = Math.ceil(participants.length / TEAM_MAX_SIZE);
    let teams = Array.from({ length: numTeams }, () => []);

    // 2. Group participants by their skills for balancing
    const roleGroups = { 'Frontend': [], 'Backend': [], 'UI/UX': [], 'ML/AI': [] };
    
    // Shuffle logic taaki har baar same teams na bane
    let shuffled = [...participants].sort(() => 0.5 - Math.random());
    shuffled.forEach(p => roleGroups[p.role].push(p));

    // 3. Round-Robin Distribution Algorithm
    let teamIndex = 0;
    for (const role in roleGroups) {
        roleGroups[role].forEach(person => {
            // Find next available team
            while (teams[teamIndex].length >= TEAM_MAX_SIZE) {
                teamIndex = (teamIndex + 1) % numTeams;
            }
            teams[teamIndex].push(person);
            teamIndex = (teamIndex + 1) % numTeams;
        });
    }

    displayTeams(teams);
}

function displayTeams(teams) {
    const container = document.getElementById('teamsContainer');
    container.innerHTML = ''; // Clear old teams
    
    teams.forEach((team, index) => {
        let html = `<div class="team-card"><h3>Team ${index + 1}</h3><ul>`; team.forEach(member => { html += `<li><span>${member.name}</span> <span style="font-size:0.8rem; color:#a855f7;">${member.role}</span></li>`;
        });
        html += `</ul></div>`;
        container.innerHTML += html;
    });
}