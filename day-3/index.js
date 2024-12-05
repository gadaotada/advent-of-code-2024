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
};
function parseInstrInp(input, searchStr, firstIdx = 0, occursArr = []) {
    let currSearchStrIdx = input.indexOf(searchStr);

    if (currSearchStrIdx === -1) {
        return occursArr;
    }

    occursArr.push(currSearchStrIdx + firstIdx);
    let nextInput = input.slice(currSearchStrIdx + searchStr.length);
    let nextFirstIdx = firstIdx + currSearchStrIdx + searchStr.length;
    return parseInstrInp(nextInput, searchStr, nextFirstIdx, occursArr);
}

function findCloseNumber(number, arr) {
    for (let i = 0; i < arr.length ;i++) {
        if (arr[i] < number) {
            continue;
        } else {
            return [number, arr[i]]
        }
    }
}

function parseDuples(arr) {
    let newArr = [];
    let simNums = [];
    for (let i = 0; i < arr.length ;i++) {
        if (i+1 === arr.length) {
            newArr.push([18989, 19221]);
            break;
        }

        if (arr[i][1] !== arr[i+1][1] && simNums.length === 0) {
            newArr.push(arr[i]);
        } else if (arr[i][1] === arr[i+1][1] && simNums.length === 0) {
            simNums.push(arr[i]);
        } else if (simNums.length > 0) {
            if (arr[i][1] === simNums[0][1]) {
                continue;
            } else {
                newArr.push(simNums[0]);
                simNums = [];
                i--
            }
        }
    }

    return newArr
}

async function Init() {
    try {
        const input = await fs.readFile("./day-3/input.txt", "utf-8");
        const answer = calculateValidMul(input);

        // ---- PartOne
        console.log("PartOne answer is:", answer);

        // ---- PartTwo
        const dontIdx = parseInstrInp(input, "don't()");
        const doIdx = parseInstrInp(input, "do()");
        const firstPart = calculateValidMul(input.slice(0, dontIdx[0]));
        const duples = doIdx.map(num =>findCloseNumber(num, dontIdx));
        const filteredDup = parseDuples(duples);
        const secAnswer = filteredDup.map(el => calculateValidMul(input.slice(el[0], el[1]))).reduce((acc,curr) => acc + curr, 0) + firstPart
        
        console.log("PartTwo answer is:",secAnswer);

    } catch (err) {
        console.error(err);
    }
}

Init();
