import { StateUpdater } from "preact/hooks";

type Tupla = [string, string[][], string[][], string[][], number];

export function test1LinesWith18Sections(
  lines: string[],
  cb: StateUpdater<string>,
): boolean {
  const last = lines.pop();
  if (last !== "") {
    cb("La última línea debe estar vacía");
    return false;
  }

  let result = true;
  lines.forEach((line, i) => {
    if (line.split("\t").length !== 18) {
      cb(`La línea ${i + 1} no tiene los 18 campos requeridos`);
      result = false;
    }
  });

  return result;
}

export function separateLines(lines: string[]): Tupla[] {
  const resultado: Tupla[] = [];
  let header = "";
  let posRecords: string[][] = [];
  let negRecords: string[][] = [];
  let motives: string[][] = [];
  let total = 0;
  console.log("INFO lines ", lines.length);

  lines.forEach((line, i) => {
    const lineTabs = line.split("\t");
    const lineType = typeOfLine(lineTabs);
    switch (lineType) {
      case "ERROR":
        console.log(`La línea ${i + 1} No cumple con lo esperado`);
        console.log(lineTabs);
        break;
      case "header":
        header = lineTabs[0];
        break;
      case "posRecord":
        posRecords.push(lineTabs);
        break;
      case "negRecord":
        negRecords.push(lineTabs);
        break;
      case "Motive":
        motives.push(lineTabs);
        break;
      case "Total":
        total = Number(lineTabs[7].split(" ").join("").replace(",", "."));
        resultado.push([header, posRecords, negRecords, motives, total]);
        header = "";
        posRecords = [];
        negRecords = [];
        motives = [];
        total = 0;
        break;
      default:
        break;
    }
  });
  return resultado;
}

function typeOfLine(
  lineTabs: string[],
): "header" | "posRecord" | "negRecord" | "Motive" | "Total" | "ERROR" {
  if (lineTabs[0] !== "" && lineTabs.slice(1).every((e) => e === "")) {
    return "header";
  }
  if (
    lineTabs[5].includes("Motivo") &&
    lineTabs.slice(0, 5).every((e) => e === "")
  ) {
    return "Motive";
  }
  if (
    lineTabs[2].includes("Total") && lineTabs.slice(0, 2).every((e) => e === "")
  ) {
    return "Total";
  }
  const numStr = lineTabs[8].split(" ").join("").replace(",", ".");
  const num = Number(numStr);
  // console.log("DEBBUGG", num, lineTabs[8], numStr);
  if (lineTabs[8].substring(0, 1) === "-" && !isNaN(num)) {
    lineTabs[8] = numStr;
    return "negRecord";
  }

  if (lineTabs[8].substring(0, 1) === " " && !isNaN(num)) {
    lineTabs[8] = numStr;
    return "posRecord";
  }
  return "ERROR";
}

export function test2(
  separatedLines: Tupla[],
  cb1: StateUpdater<number>,
  cb2: StateUpdater<string>,
) {
  console.log("INFO TUPLAS ", separatedLines.length);

  const result = separatedLines.every((tupla, i) => {
    const [header, posRecords, negRecords, motives, total] = tupla;
    const sumaPos = posRecords.reduce((acc, currentValue) => {
      const num = Number(currentValue[8].split(" ").join("").replace(",", "."));
      if (isNaN(num)) {
        console.log("ERROR test2 con la tupla ", i + 1, tupla, header);
        cb2(`ERROR test2 con la tupla ${i + 1}`);
      }
      return acc + num;
    }, 0);
    const sumaNeg = negRecords.reduce((acc, currentValue) => {
      const num = Number(currentValue[8].split(" ").join("").replace(",", "."));
      if (isNaN(num)) {
        console.log("ERROR test2 con la tupla ", i + 1, tupla, header);
        cb2(`ERROR test2 con la tupla ${i + 1}`);
      }
      return acc + num;
    }, 0);
    const isGood = total - (sumaNeg + sumaPos) < 1 &&
      total - (sumaNeg + sumaPos) > -1;
    if (!isGood) {
      console.log(
        "No todos son buenos",
        i + 1,
        motives.length,
        negRecords.length,
        total,
        sumaPos + sumaNeg,
      );
    }
    return isGood;
  });
  if (result) cb1((prev) => prev + 1);
  return result;
}

export function cleanTuplasFromNegativeCharges(tuplas: Tupla[]) {
  const result: [string, string[][], string[][]][] = tuplas.map((tupla) => {
    let [header, posRecords, negRecords] = tupla;
    const finalPosRecords: string[][] = [];
    posRecords.forEach((rec) => {
      // const room = rec[2];
      const resNum = rec[17];
      const chargeStr = rec[8];
      const ind = negRecords.findIndex((negRec) => {
        const foundToDelete = negRec[17] === resNum &&
          negRec[8] === '-'+chargeStr;
        return foundToDelete
      });
      if (ind === -1) {
        finalPosRecords.push(rec)
      } else {
        negRecords = negRecords.slice(0, ind).concat(negRecords.slice(ind+1))
      }
    });
    return [header, finalPosRecords, negRecords];
  });
  console.log("INFO tuplas limpias", result.length);

  return result;
}

export type BookingJournalType = {
  formatedDate: string,
  room: string,
  name: string,
  qty: number,
  price: number,
  user: string,
  resNumber: number,
  type: string
}

export function finalBookingJournal(cleanTuplas: [string, string[][], string[][]][]) {
  const result : BookingJournalType[] = []

  cleanTuplas.forEach(tupla => {
    const [header, posRecords] = tupla

    posRecords.forEach(rec => {
      const obj: BookingJournalType = {
        formatedDate: rec[0],
        room: rec[2],
        name: rec[5],
        qty: Number(rec[6].replace(',','.')),
        price: Number(rec[7].trim().replace(',','.')),
        user: rec[12],
        resNumber: Number(rec[17]),
        type: header
      }
      result.push(obj)
    })
  })
  return result
}

export function test3(cleanTuplas: [string, string[][], string[][]][]){
  return cleanTuplas.every(tupla => tupla[2].length === 0) 
}