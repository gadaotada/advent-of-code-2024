import fs from "fs/promises";

async function Init() {
    try {
        const input = await fs.readFile("./day-1/input.txt", "utf-8");
        const singleLineInp = input.split("\n");
        // ---- PartOne

        const leftCol = [];
        const rightCol = [];
        singleLineInp.forEach((el) => {
            const formattedEl = el.replace("   ", ",").replace("\r", "");
            for (let i=0; i < formattedEl.length; i++) {
                if (formattedEl[i] === ",") {
                    leftCol.push(formattedEl.slice(0, i));
                    rightCol.push(formattedEl.slice(i+1, formattedEl.length));
                    
                    break;
                }
            } 
        });

        leftCol.sort();
        rightCol.sort();

        const firstAnswer = [];
 
        leftCol.forEach((el, i) => {
            firstAnswer.push(Math.abs(Number(el) - Number(rightCol[i])))
        });

        console.log("PartOne answer is:",firstAnswer.reduce((acc, curr) => acc + curr, 0));

        // ---- PartTwo
        const dublicates = [];
        for (const item of leftCol) {
            for (const element of rightCol) {
                if (item === element) {
                    dublicates.push(Number(item));
                }
            }
        };
        console.log("PartTwo answer is:",dublicates.reduce((acc, curr) => acc + curr, 0));
    } catch(err) {
        console.error(err)
    }
};

Init();