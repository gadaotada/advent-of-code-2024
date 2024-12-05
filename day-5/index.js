import fs from "fs/promises";
/* 
75,47,61,53,29
97,61,53,29,13
75,29,13

*/
async function Init() {
    try {
        const input = await fs.readFile("./day-5/input.txt", "utf-8");

        // ---- PartOne
        console.log("PartOne answer is:", undefined);

        // ---- PartTwo
        
        console.log("PartTwo answer is:",undefined);

    } catch (err) {
        console.error(err);
    }
}

Init();
