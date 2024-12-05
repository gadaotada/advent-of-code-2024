import fs from "fs/promises";

function mapParser(curr2DMap) {
    let totalCount = 0;
    for (let i = 0; i < curr2DMap.length; i++) {
        for (let c = 0; c < curr2DMap[i].length; c++) {
            if (curr2DMap[i][c] === "X") {
                const currPosibilities = getPosibilities(c, i, curr2DMap);
                Object.values(currPosibilities).forEach(el => {
                    if (el.includes("MAS")) {
                        totalCount++;
                    }
                });
            }
        }
    }
    return totalCount;
}

function getPosibilities(currPosition, currRow, arr) {
    let posibilities = {};

    // jorizontal left/right case
    if (currPosition + 3 < arr[currRow].length) {
        posibilities.right = arr[currRow].slice(currPosition, currPosition + 4).join("");
    }
    if (currPosition - 3 >= 0) {
        posibilities.reverseRight = arr[currRow].slice(currPosition - 3, currPosition + 1).reverse().join("");
    }

    // vertical down/up case
    if (currRow + 3 < arr.length) {
        posibilities.down = arr[currRow][currPosition] + arr[currRow + 1][currPosition] + arr[currRow + 2][currPosition] + arr[currRow + 3][currPosition];
    }
    if (currRow - 3 >= 0) {
        posibilities.reverseUp = arr[currRow][currPosition] + arr[currRow - 1][currPosition] + arr[currRow - 2][currPosition] + arr[currRow - 3][currPosition];
    }

    // diagonal dr dl case
    if (currRow + 3 < arr.length && currPosition + 3 < arr[currRow].length) {
        posibilities.downRight = arr[currRow][currPosition] + arr[currRow + 1][currPosition + 1] + arr[currRow + 2][currPosition + 2] + arr[currRow + 3][currPosition + 3];
    }
    if (currRow + 3 < arr.length && currPosition - 3 >= 0) {
        posibilities.downLeft = arr[currRow][currPosition] + arr[currRow + 1][currPosition - 1] + arr[currRow + 2][currPosition - 2] + arr[currRow + 3][currPosition - 3];
    }

    // diagonal ur ul case
    if (currRow - 3 >= 0 && currPosition + 3 < arr[currRow].length) {
        posibilities.reverseUpRight = arr[currRow][currPosition] + arr[currRow - 1][currPosition + 1] + arr[currRow - 2][currPosition + 2] + arr[currRow - 3][currPosition + 3];
    }
    if (currRow - 3 >= 0 && currPosition - 3 >= 0) {
        posibilities.reverseUpLeft = arr[currRow][currPosition] + arr[currRow - 1][currPosition - 1] + arr[currRow - 2][currPosition - 2] + arr[currRow - 3][currPosition - 3];
    }

    return posibilities;
}

function mapParserTwo(curr2DMap) {
    let totalCount = 0;
    for (let i = 1; i < curr2DMap.length-1; i++) {
        // reminder BRO i cant be 0 ! :D 
        for (let c = 0; c < curr2DMap[i].length; c++) {
            if (curr2DMap[i][c] === "A") {
                const res = checkXtypeMas(curr2DMap[i-1], curr2DMap[i+1], c);
                if (res === null) {
                    continue;
                }
                if (answerChecker(res)) {
                    totalCount ++
                }
            }
        }
    }
    return totalCount;
};

function checkXtypeMas(prevRow, nextRow, currPosition) {
    if (currPosition !== 0 && currPosition + 1 < prevRow.length) {
        let currObj = {};
        currObj.above = prevRow[currPosition-1] + prevRow[currPosition + 1];
        currObj.below = nextRow[currPosition-1] + nextRow[currPosition + 1];

        return currObj;
    } else {
        return null;
    }
}

function answerChecker(currObj) {
    switch(currObj.above) {
        case "SS": 
            return currObj.below === "MM";
        case "SM": 
            return currObj.below === "SM";
        case "MM": 
            return currObj.below === "SS";
        case "MS": 
            return currObj.below === "MS";
        default: 
            return false;
    }
}

async function Init() {
    try {
        const input = (await fs.readFile("./day-4/input.txt", "utf-8")).replaceAll("\r", "").split("\n");
        const testInput = (await fs.readFile("./day-4/test-input.txt", "utf-8")).replaceAll("\r", "").split("\n");
        const charMap = input.map(el => el.split(""));
        const charMapTest = testInput.map(el => el.split(""));
        // ---- PartOne
        const answerOne = mapParser(charMap)
        console.log("PartOne answer is:", answerOne);

        // ---- PartTwo
        const answerTwo = mapParserTwo(charMap);
        console.log("PartTwo answer is:", answerTwo);

    } catch (err) {
        console.error(err);
    }
}

Init();
