const units = {
    temperature: {
        celsius: { name: "Celsius", convert: (value) => value },
        fahrenheit: { name: "Fahrenheit", convert: (value) => (value * 9/5) + 32 },
        kelvin: { name: "Kelvin", convert: (value) => value + 273.15 }
    },
    distance: {
        millimeters: { name: "Millimeters", convert: (value) => value },
        centimeters: { name: "Centimeters", convert: (value) => value / 10 },
        meters: { name: "Meters", convert: (value) => value / 1000 },
        kilometers: { name: "Kilometers", convert: (value) => value / 1000000 }
    }
};

function changeUnitType() {
    const unitTypeSelect = document.getElementById("unitType");
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    const selectedUnitType = unitTypeSelect.value;
    const unitOptions = units[selectedUnitType];

    // Clear previous options
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";

    // Populate from and to unit options
    for (const unit in unitOptions) {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unitOptions[unit].name;
        fromUnitSelect.appendChild(option.cloneNode(true));
        toUnitSelect.appendChild(option);
    }
}

function convert() {
    const valueInput = document.getElementById("value");
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
    const resultOutput = document.getElementById("result");

    const inputValue = parseFloat(valueInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const unitType = document.getElementById("unitType").value;

    const fromUnitInfo = units[unitType][fromUnit];
    const toUnitInfo = units[unitType][toUnit];

    if (!isNaN(inputValue)) {
        const convertedValue = toUnitInfo.convert(fromUnitInfo.convert(inputValue));
        resultOutput.textContent = `Result: ${inputValue} ${fromUnitInfo.name} is ${convertedValue.toFixed(2)} ${toUnitInfo.name}`;
    } else {
        resultOutput.textContent = "Please enter a valid number.";
    }
}

changeUnitType();
