export function returnType(value: string) {
  if (value.startsWith("http")) return "web";
  if (value.startsWith("WIFI:")) return "wifi";
  if (value.includes("://") && !value.startsWith("http")) return "url";
  if (value.startsWith("TEL:")) return "number";
  if (value.startsWith("BEGIN:VCARD")) return "contact";
  if (value.startsWith("MATMSG:")) return "email";
  if (value.startsWith("SMSTO:")) return "sms";
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
*/
export function getContactData(rawText: string) {
  const lines = rawText.split("\n");
  const data = {
    lastName: "",
    firstName: "",
    fullName: "",
    organization: "",
    title: "",
    workPhone: "",
    homePhone: "",
    email: "",
  };

  for (const line of lines) {
    const [key, value] = line.split(":");
    switch (key) {
      case "N":
        const [lastName, firstName] = value.split(";");
        data.lastName = lastName || "";
        data.firstName = firstName || "";
        break;
      case "FN":
        data.fullName = value || "";
        break;
      case "ORG":
        data.organization = value || "";
        break;
      case "TITLE":
        data.title = value || "";
        break;
      case "TEL;type=WORK":
        data.workPhone = value || "";
        break;
      case "TEL;type=HOME":
        data.homePhone = value || "";
        break;
      case "EMAIL":
        data.email = value || "";
        break;
    }
  }

  return data;
}
// "MATMSG:TO:example123@gmail.com;SUB:asunto;BODY:Holaaaa, como estas?;;"
export const getEmailData = (value: string) => {
  const toMatch = value.match(/TO:([^;]+)/);
  const subjectMatch = value.match(/SUB:([^;]+)/);
  const bodyMatch = value.match(/BODY:([^;]+)/);

  return {
    to: toMatch ? toMatch[1].trim() : "",
    subject: subjectMatch ? subjectMatch[1].trim() : "",
    body: bodyMatch ? bodyMatch[1].trim() : "",
  };
};

//"tel:+51924165577"
export const getNumberData = (value: string): string => {
  const phoneMatch = value.match(/TEL:([+\d*#]+)/);
  return phoneMatch ? phoneMatch[1].trim() : "";
};

//"SMSTO:123456789:Hola como estas?"
export const getSMSData = (value: string) => {
  const match = value.match(/SMSTO:(\+?\d+):(.+)/);
  return {
    phoneNumber: match ? match[1].trim() : "",
    message: match ? match[2].trim() : "",
  };
};
