import fs from "fs/promises";

function calculateValidMul(input) {
    // ти **** на ** в ** регекса
    const validMulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let matches;
    let sum = 0;

    while ((matches = validMulPattern.exec(input)) !== null) {
        const firstNum = parseInt(matches[1], 10);
        const secNum = parseInt(matches[2], 10);
        sum += firstNum * secNum;
    }

    return sum;
}

async function Init() {
    try {
        const input = await fs.readFile("./day-3/input.txt", "utf-8");
        const answer = calculateValidMul(input);

        // ---- PartOne
        console.log("PartOne answer is:", answer);

        // ---- PartTwo
        console.log("PartTwo answer is:", undefined);
    } catch (err) {
        console.error(err);
    }
}

Init();
