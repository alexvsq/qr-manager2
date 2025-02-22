// Interfaces
interface VCardContact {
  firstName?: string;
  lastName?: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

interface CalendarEvent {
  summary: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
}

type WifiEncryption = "WPA" | "WEP" | "nopass";

//WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;
// Función para generar QR de WiFi
function generateWifiQR(
  ssid: string,
  password: string,
  encryption: WifiEncryption = "WPA"
): string {
  //const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  const wifiString = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
  return wifiString;
}

// Función para generar QR de SMS
function generateSmsQR(phoneNumber: string, message: string = ""): string {
  const smsString = `SMSTO:${phoneNumber}:${message}`;
  return smsString;
}

// Función para generar QR de Email
function generateEmailQR(
  email: string,
  subject: string = "",
  body: string = ""
): string {
  const emailString = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  return emailString;
}

// Función para generar QR de vCard
function generateVCardQR(contact: VCardContact): string {
  const {
    firstName = "",
    lastName = "",
    organization = "",
    title = "",
    email = "",
    phone = "",
    address = "",
    website = "",
  } = contact;

  return `BEGIN:VCARD
VERSION:2.1
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${title}
TEL:${phone}
EMAIL:${email}
ADR:;;${address};;;;
URL:${website}
END:VCARD`;
}

// Función para generar QR de URL
function generateUrlQR(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

// Función para generar QR de texto plano
function generateTextQR(text: string): string {
  return text;
}

function generateTelQR(phoneNumber: string): string {
  if (!phoneNumber.startsWith("+") && !/^\d+$/.test(phoneNumber)) {
    throw new Error(
      "El número de teléfono debe estar en formato internacional con '+' o ser solo dígitos."
    );
  }

  return `TEL:${phoneNumber}`;
}

// Clase para centralizar todas las funciones de generación de QR
class QRCodeGenerator {
  generateWifi = generateWifiQR;
  generateSms = generateSmsQR;
  generateEmail = generateEmailQR;
  generateVCard = generateVCardQR;
  generateUrl = generateUrlQR;
  generateText = generateTextQR;
  generateTel = generateTelQR;
}

export default QRCodeGenerator;
