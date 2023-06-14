import { BookingJournalType } from "./bj.ts";
import { ReservationType } from "./res.ts";
import { UserType } from "./user.ts";

export type UpsellType = {
  monthYear: string;
  user: UserType;
  date: string;
  type: "Upsell" | "Renting";
  checkIn: string;
  checkOut: string;
  nights: number;
  room: string;
  resNum: number;
  guest: string;
  agency: string;
  price: number;
  concept: string;
  qty: number;
  total: number;
};

function convertFormattedDate(f: string) {
  let [day, month, year] = f.split("-");
  switch (month) {
    case "jan":
      month = "01";
      break;
    case "fev":
      month = "02";
      break;
    case "mar":
      month = "03";
      break;
    case "abr":
      month = "04";
      break;
    case "mai":
      month = "05";
      break;
    case "jun":
      month = "06";
      break;
    case "jul":
      month = "07";
      break;
    case "ago":
      month = "08";
      break;
    case "set":
      month = "09";
      break;
    case "out":
      month = "10";
      break;
    case "nov":
      month = "11";
      break;
    case "dez":
      month = "12";
      break;
    default:
      break;
  }
  return `${year}-${month}-${day}`;
}

export function createUpsell(
  res: ReservationType[],
  bj: BookingJournalType[],
): UpsellType[] {
  return bj.map((reg) => {
    const reservationsRelated = res.filter((r) => reg.resNumber === r.resNum);
    const fecha0arr = reservationsRelated.map((r) => {
      return {
        str: convertFormattedDate(r.checkIn),
        value: +new Date(convertFormattedDate(r.checkIn)),
      };
    });
    const fecha1arr = reservationsRelated.map((r) => {
      return {
        str: convertFormattedDate(r.checkOut),
        value: +new Date(convertFormattedDate(r.checkOut)),
      };
    });
    let fechaI = {
      str: "",
      value: Infinity,
    };
    fecha0arr.forEach((e) => {
      if (e.value < fechaI.value) {
        fechaI = { ...e };
      }
    });

    let fechaF = {
      str: "",
      value: 0,
    };
    fecha1arr.forEach((e) => {
      if (e.value > fechaF.value) {
        fechaF = { ...e };
      }
    });
    const days = (fechaF.value - fechaI.value) / (1000 * 60 * 60 * 24);
    const [year, month] = convertFormattedDate(reg.formatedDate).split("-");
    return {
      monthYear: `${month}-${year}`,
      user: reg.user as UserType,
      date: convertFormattedDate(reg.formatedDate),
      type: reg.type === "Accomodation" ? "Renting" : "Upsell",
      checkIn: fechaI.str,
      checkOut: fechaF.str,
      nights: days,
      guest: reg.name,
      room: reg.room,
      resNum: reg.resNumber,
      agency: reservationsRelated[0]?.agency ?? "DIRECTO",
      price: reg.price,
      concept: reg.type,
      qty: reg.qty,
      total: reg.price * reg.qty,
    };
  });
}

export function createCsv(upsell: UpsellType[]) {
  const encoder = new TextEncoder();
  let data = "";
  upsell.forEach((rec,i) => {
    data +=
      `${i+1},"${rec.monthYear}","${rec.date}","${rec.user}","GPLZ","${rec.type}","${rec.checkIn}","${rec.checkOut}",${rec.nights},"${rec.room}",${rec.resNum},"${rec.guest}","${rec.agency}",${rec.price},"${rec.concept}",${rec.qty},${rec.total}\n`;
  });
  const encodedData = encoder.encode(data);
  const url = window.URL.createObjectURL(new Blob([encodedData.buffer]));
  const link = document.createElement("a");
  const link2 = document.createElement("a");
  link.href = url;
  link2.href = "/";
  link.setAttribute("download", `upsell.csv`);
  document.body.appendChild(link);
  link.click();
  link2.click();
}
