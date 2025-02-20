import { ScannedHistoryDataToSave } from "@/types/types";
import { BarcodeScanningResult } from "expo-camera";

export const GetDataForSave = (
  ResultScanned: BarcodeScanningResult
): ScannedHistoryDataToSave => {
  const DataValuesScanned = ResultScanned.raw
    ? ResultScanned.raw
    : ResultScanned.data;

  const DataToSave: ScannedHistoryDataToSave = {
    name: "",
    timeStamp: Date.now(),
    value: DataValuesScanned,
    notes: "",
    type: "",
    barcodeType: ResultScanned.type,
  };

  if (ResultScanned.type !== "qr") {
    DataToSave.name = DataValuesScanned;
    DataToSave.type = "bar";
    return DataToSave;
  }

  DataToSave.type = returnType(DataValuesScanned);
  DataToSave.name = getName(DataToSave.type, DataValuesScanned);

  return DataToSave;
};

const getName = (type: string, value: string) => {
  if (type === "wifi") return getWifiData(value).name;
  if (type === "contact") return getContactData(value).fullName;
  if (type === "email") return getEmailData(value).to;
  if (type === "sms") return getSMSData(value).message;
  if (type === "number") return getNumberData(value);
  if (type === "web" || type === "url") return extractNameFromUrl(value);
  return value;
};

export function extractNameFromUrl(url: string): string {
  const regex = /:\/\/(?:www\.)?([^\.]+)\./;
  const match = url.match(regex);
  return match ? match[1] : url;
}

export function returnType(value: string) {
  if (value.startsWith("http")) return "web";
  if (value.startsWith("WIFI:")) return "wifi";
  if (value.includes("://") && !value.startsWith("http")) return "url";
  if (
    value.startsWith("TEL:") ||
    value.startsWith("tel:") ||
    value.startsWith("Tel:")
  )
    return "number";
  if (value.startsWith("BEGIN:VCARD")) return "contact";
  if (value.startsWith("MATMSG:") || value.startsWith("mailto:"))
    return "email";
  if (value.startsWith("SMSTO:") || value.startsWith("smsto:")) return "sms";
  return "text";
}

//WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;
export const getWifiData = (data: string) => {
  data = data.replace("WIFI:", "");
  const wifiData = data.split(";");
  const name = wifiData[0].replace("S:", "");
  const password = wifiData[2].replace("P:", "");
  const security = wifiData[1].replace("T:", "");
  const hidden = wifiData[3].replace("H:", "");
  return { name, password, security, hidden };
};

// "MATMSG:TO:example123@gmail.com;SUB:asunto;BODY:Holaaaa, como estas?;;"
export const getEmailData = (value: string) => {
  let to = "";
  let subject = "";
  let body = "";

  if (value.startsWith("MATMSG:")) {
    const toMatch = value.match(/TO:([^;]+)/);
    const subjectMatch = value.match(/SUB:([^;]+)/);
    const bodyMatch = value.match(/BODY:([^;]+)/);

    to = toMatch ? toMatch[1].trim() : "";
    subject = subjectMatch ? subjectMatch[1].trim() : "";
    body = bodyMatch ? bodyMatch[1].trim() : "";
  } else if (value.startsWith("mailto:")) {
    const mailtoMatch = value.match(/^mailto:([^?]+)/);
    const subjectMatch = value.match(/[?&]subject=([^&]+)/);
    const bodyMatch = value.match(/[?&]body=([^&]+)/);

    to = mailtoMatch ? decodeURIComponent(mailtoMatch[1]).trim() : "";
    subject = subjectMatch ? decodeURIComponent(subjectMatch[1]).trim() : "";
    body = bodyMatch ? decodeURIComponent(bodyMatch[1]).trim() : "";
  }

  return { to, subject, body };
};

//"tel:+51924165577"
export const getNumberData = (value: string): string => {
  const phoneMatch = value.match(/^(?:TEL|tel|Tel):([+\d*#]+)/);
  return phoneMatch ? phoneMatch[1].trim() : "";
};

//"SMSTO:+51123456789:Hola como estas?"
export const getSMSData = (value: string) => {
  const match = value.match(/^(?:SMSTO|smsto):(\+?\d+):(.+)/);
  return {
    phoneNumber: match ? match[1].trim() : "",
    message: match ? match[2].trim() : "",
  };
};

/* 
"BEGIN:VCARD
VERSION:2.1
N:chavez;juan
FN:juan chavez
ORG:google
TITLE:gerente
TEL:123456789
EMAIL:example123@gmail.com
ADR:;;av peru;ciudad lima;region lima;25;peru
URL:www.example.com
END:VCARD
"
*/ interface ContactData {
  lastName: string;
  firstName: string;
  fullName: string;
  organization: string;
  title: string;
  workPhone: string;
  homePhone: string;
  email: string;
  address?: string;
  birthday?: string;
  url?: string;
}

export function getContactData(rawText: string): ContactData {
  const data: ContactData = {
    lastName: "",
    firstName: "",
    fullName: "",
    organization: "",
    title: "",
    workPhone: "",
    homePhone: "",
    email: "",
  };

  try {
    const lines = rawText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .filter(
        (line) =>
          !line.startsWith("BEGIN:") &&
          !line.startsWith("END:") &&
          !line.startsWith("VERSION:")
      );

    for (const line of lines) {
      const [rawKey, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();
      const key = rawKey.split(";")[0];

      switch (key) {
        case "N":
          // Manejar diferentes formatos de separación de nombres
          if (value.includes(";")) {
            const [lastName, firstName] = value.split(";");
            data.lastName = lastName?.trim() || "";
            data.firstName = firstName?.trim() || "";
          } else if (value.includes(" ")) {
            const [first, ...last] = value.split(" ");
            data.firstName = first?.trim() || "";
            data.lastName = last.join(" ").trim() || "";
          }
          break;

        case "FN":
          data.fullName = value;
          break;

        case "ORG":
          data.organization = value;
          break;

        case "TITLE":
          data.title = value;
          break;

        case "TEL":
          // Manejar teléfono sin tipo específico (formato 2.1)
          if (!rawKey.includes(";") || rawKey === "TEL") {
            data.workPhone = formatPhoneNumber(value);
          } else if (rawKey.includes("WORK") || rawKey.includes("CELL")) {
            data.workPhone = formatPhoneNumber(value);
          } else if (rawKey.includes("HOME")) {
            data.homePhone = formatPhoneNumber(value);
          }
          break;

        case "EMAIL":
          data.email = value;
          break;

        case "ADR":
          // Manejar formato de dirección con múltiples componentes
          const addressParts = value.split(";");
          const relevantParts = addressParts
            .slice(2) // Ignorar los primeros dos campos (usualmente vacíos)
            .filter((part) => part.trim())
            .join(", ");
          data.address = relevantParts;
          break;

        case "URL":
          data.url = value;
          break;

        case "BDAY":
          data.birthday = formatDate(value);
          break;
      }
    }

    // Si no hay nombre y apellido pero hay nombre completo, intentar dividirlo
    if (!data.firstName && !data.lastName && data.fullName) {
      const nameParts = data.fullName.split(" ");
      if (nameParts.length >= 2) {
        data.firstName = nameParts[0];
        data.lastName = nameParts.slice(1).join(" ");
      }
    }

    return data;
  } catch (error) {
    console.error("Error parsing vCard:", error);
    return data;
  }
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return phone.startsWith("+") ? `+${cleaned}` : cleaned;
}

function formatDate(date: string): string {
  if (date.length === 8) {
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
      6,
      8
    )}`;
  }
  return date;
}
