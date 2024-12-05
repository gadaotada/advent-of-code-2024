import fs from "fs/promises";

function parseLevel(level) {
    let isLevelSafe = true;
    const numbArr = level.split(" ");
    const levelType = Number(numbArr[0]) > Number(numbArr[1]) ? "dec" : "inc"

    for (let i=0; i < numbArr.length; i++ ) {
        if (i === numbArr.length - 1) {
            break;
        } else {
            let currCheck = true;
            if (levelType === "dec") {
                currCheck = Number(numbArr[i]) > Number(numbArr[i+1])
            } else {
                currCheck = Number(numbArr[i]) < Number(numbArr[i+1])
            }
            const currCase = Math.abs(Number(numbArr[i]) - Number(numbArr[i+1]));
            if (currCase <= 0 || currCase >= 4 || !currCheck) {
                isLevelSafe = false;
                break;
            }
        }
    }

    return isLevelSafe
}

function parseLevelPtwo(level) {
    let isLevelSafe = true;
    const numbArr = level.split(" ");
    const levelType = Number(numbArr[0]) > Number(numbArr[1]) ? "dec" : "inc"
    let skipOneBad = false;

    for (let i=0; i < numbArr.length; i++ ) {
        if (i === numbArr.length - 1) {
            break;
        } else {
            let currCheck = true;
            if (levelType === "dec") {
                currCheck = Number(numbArr[i]) > Number(numbArr[i+1])
            } else {
                currCheck = Number(numbArr[i]) < Number(numbArr[i+1])
            }
            const currCase = Math.abs(Number(numbArr[i]) - Number(numbArr[i+1]));
            if ((currCase <= 0 || currCase >= 4 || !currCheck) && !skipOneBad) {
                skipOneBad = true;
                continue;
            } else if ((currCase <= 0 || currCase >= 4 || !currCheck) && skipOneBad) {
                isLevelSafe = false;
                skipOneBad = false;
                break;
            }
        }
    }

    return isLevelSafe
}

async function Init() {
    try {
        const input = await fs.readFile("./day-2/input.txt", "utf-8");
        const singleLineInp = input.split("\n").map(el => el.replaceAll("\r", ""));
        // ---- PartOne
        let safeCount = 0; 
        for (const level of singleLineInp) {
            if (parseLevel(level)) {
                safeCount ++;
            }
        }
        console.log("PartOne answer is:", safeCount);

        // ---- PartTwo
        let safeCountPtwo = 0; 
        for (const level of singleLineInp) {
            if (parseLevelPtwo(level)) {
                safeCountPtwo ++;
            }
        }
       
        console.log("PartTwo answer is:", safeCountPtwo);
    } catch(err) {
        console.error(err)
    }
};

Init();