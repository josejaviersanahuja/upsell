import { StateUpdater } from "preact/hooks";

export function test1res(
  lines: string[],
  cb: StateUpdater<string>,
): boolean {
  const last = lines.pop();
  if (last !== "") {
    cb("La última línea debe estar vacía");
    return false;
  }

  return lines.every((line, i) => {
    const lineTabs = line.split("\t")
    if (lineTabs.length !== 13) {
      cb(`la fila ${i+1} no tiene 13 campos`)
    }
    return lineTabs.length === 13
  })
}

export type ReservationType = {
  resNum: number,
  checkIn: string,
  checkOut: string,
  room: string,
  guest: string,
  agency: string,
  segment: string,
  subSegment: string,
  channel: string,
  price: number,
  priceTotal: number,
  user: string
}

export function finalRes(lines: string[]){
  const result : ReservationType[] = []

  lines.forEach(line => {
    const lineTabs = line.split("\t");
    const resNum = Number(lineTabs[0])
    const checkIn = lineTabs[1].substring(4)
    const checkOut = lineTabs[2].substring(4)
    const room = lineTabs[3]
    const guest = lineTabs[4]
    const agency = chooseAgency(lineTabs[5], lineTabs[6])
    const segment = lineTabs[7]
    const subSegment = lineTabs[8]
    const channel = lineTabs[9]
    const price = Number(lineTabs[10].replace(',','.'))
    const priceTotal = Number(lineTabs[11].replace(',','.'))
    const user = lineTabs[12]
    result.push({
      resNum, checkIn, checkOut, room, guest, agency, segment, subSegment, channel, price, priceTotal, user
    })
  })
  return result
}

function chooseAgency(opt1: string, opt2: string) {
  if (!opt1) {
    return opt2 === "" ? "DIRECTO" : opt2
  }
  return opt1
}