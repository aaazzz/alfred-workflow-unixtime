const query = process.argv[2];

if (!query) return;

const timestamp = parseInt(query, 10);

if (isNaN(timestamp)) {
  return JSON.stringify({
    items: [
      {
        title: "Invalid Unix timestamp",
        subtitle: `Could not parse: "${query}"`,
        valid: false
      }
    ]
  });
}

const date = new Date(timestamp * 1000);

// various formats
const iso = date.toISOString(); // 2025-07-17T07:12:31.000Z
const isoNoT = iso.substring(0, 19).replace('T', ' '); // 2025-07-17 07:12:31
const locale = date.toLocaleString(); // locale dependent, e.g. "7/17/2025, 2:12:31 PM" in en-US
const timeOnly = date.toTimeString().split(' ')[0]; // HH:MM:SS
const dateOnly = date.toDateString(); // e.g. Thu Jul 17 2025
const utcString = date.toUTCString(); // e.g. Thu, 17 Jul 2025 07:12:31 GMT
const custom = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`; // 2025-07-17 14:12:31

function pad(n) {
  return n.toString().padStart(2, '0');
}

const formats = [
  { label: "Custom (YYYY-MM-DD HH:MM:SS)", value: custom },
  { label: "ISO", value: iso },
  { label: "ISO (no T)", value: isoNoT },
  { label: "Locale (環境依存)", value: locale },
  { label: "Time Only", value: timeOnly },
  { label: "Date Only", value: dateOnly },
  { label: "UTC String", value: utcString },
];

const items = formats.map(f => ({
  title: f.value,
  subtitle: `${f.label} — from Unix timestamp: ${timestamp}`,
  arg: f.value
}));

console.log(JSON.stringify({ items }));
