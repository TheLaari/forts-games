// Terraformer's Dilemma   2024    Joni Laari


function gameLoop() {
    updateEnvironment();
    updatePopulation();
    updateEconomy();
    renderUI();
    checkGameConditions();
    
    if (!isGameOver) {
        setTimeout(gameLoop, gameSpeed);  // Repeat the loop based on game speed
    }
}


const gameState = {
    population: {
        total: 1000,
        growthRate: 0.01,   // Example: 1% growth per tick
        qualityOfLife: 0.5, // Scale of 0-1
    },
    environment: {
        oxygenLevel: 21,   // Percentage
        temperature: -50,  // Celsius
        pollutionLevel: 5, // Arbitrary scale
    },
    resources: {
        water: 10000,
        food: 5000,
        energy: 1000,
    },
    economy: {
        budget: 1000000,   // Currency units
        consumptionRate: 1.2, // Multiplier based on living standards
    },
    gameStatus: "playing",
};


function updateEnvironment() {
    // Adjust oxygen based on pollution level
    gameState.environment.oxygenLevel -= gameState.environment.pollutionLevel * 0.01;
    
    // Simulate temperature change due to terraforming actions
    gameState.environment.temperature += 0.1;  // Small incremental increase
    
    // Adjust pollution based on resource usage
    gameState.environment.pollutionLevel += gameState.resources.energy * 0.01;

    // Check for thresholds that might affect population
    if (gameState.environment.oxygenLevel < 19) {
        applyHealthImpact("lowOxygen");
    }
    if (gameState.environment.temperature > 0) {
        applyHealthImpact("highTemperature");
    }
}


function updatePopulation() {
    const growthFactor = gameState.population.growthRate * gameState.population.qualityOfLife;
    gameState.population.total += gameState.population.total * growthFactor;
    
    // Calculate quality of life impact based on environment and economy
    gameState.population.qualityOfLife = calculateQualityOfLife();
}

function calculateQualityOfLife() {
    const { oxygenLevel, pollutionLevel, temperature } = gameState.environment;
    const environmentalImpact = (oxygenLevel > 20 ? 1 : oxygenLevel / 20) * 
                                (pollutionLevel < 5 ? 1 : 1 - pollutionLevel / 10);
    
    const economicImpact = gameState.economy.budget / 1000000;  // Scale budget impact
    
    return Math.min(1, Math.max(0, environmentalImpact * economicImpact));
}


function updateEconomy() {
    const { total: populationSize, qualityOfLife } = gameState.population;
    const consumption = populationSize * gameState.economy.consumptionRate * qualityOfLife;
    
    gameState.resources.water -= consumption * 0.1;
    gameState.resources.food -= consumption * 0.05;
    gameState.resources.energy -= consumption * 0.1;
    
    // Budget is reduced based on resource expenditure
    gameState.economy.budget -= consumption * 10;
}


function triggerEvent() {
    const eventRoll = Math.random();
    
    if (eventRoll < 0.1) {
        // Trigger a drought event
        handleEvent("drought");
    } else if (eventRoll < 0.2) {
        // Trigger a population boom
        handleEvent("populationBoom");
    }
}

function handleEvent(eventType) {
    switch (eventType) {
        case "drought":
            gameState.resources.water -= 500;
            break;
        case "populationBoom":
            gameState.population.total += 200;
            break;
        // Additional cases for different events
    }
}