let selectedCrop = null;
const grid = document.getElementById('grid');
let money = 100;

// Create grid cells
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', onCellClick);
    grid.appendChild(cell);
}


function updateMoney(amount) {
    money += amount;
    document.getElementById('money').textContent = money;
}

let gridState = Array(100).fill(null); // Initial grid state with all null values

function updateGrowth() {
    gridState = gridState.map(cell => {
        if (cell && cell.growthStage < cell.maxGrowthStage) {
            cell.growthStage++;
        }
        return cell;
    });
    renderGrid();
}

setInterval(updateGrowth, 1000); // Update growth every second

function renderGrid() {
    const cells = document.querySelectorAll('#grid div');
    cells.forEach((cell, index) => {
        const crop = gridState[index];
        if (crop) {
            cell.style.backgroundImage = `url('assets/${crop.type}.png')`;
        } else {
            cell.style.backgroundImage = '';
        }
    });
}

function onCellClick(event) {
    const index = [...event.target.parentNode.children].indexOf(event.target);
    const crop = gridState[index];
    if (selectedCrop && !crop) {
        const cost = selectedCrop === 'wheat' ? 5 : 10; // Assume wheat seeds cost 5 and corn seeds cost 10
        if (money >= cost) {
            updateMoney(-cost);
            gridState[index] = {
                type: selectedCrop,
                growthStage: 0,
                maxGrowthStage: 3
            };
        } else {
            alert('Not enough money to buy seeds!');
        }
    } else if (crop && crop.growthStage === crop.maxGrowthStage) {
        const earnings = crop.type === 'wheat' ? 10 : 20; // Assume wheat earns 10 and corn earns 20
        updateMoney(earnings);
        alert(`You harvested ${crop.type} and earned ${earnings}!`);
        gridState[index] = null;
    }
    renderGrid();
}

// Create grid cells
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', onCellClick);
    grid.appendChild(cell);
}

function selectCrop(crop) {
    selectedCrop = crop;
}

  