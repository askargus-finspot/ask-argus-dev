import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const input = await FileBlob.load('C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v2.xlsx');
const wb = await SpreadsheetFile.importXlsx(input);
const ws = wb.worksheets.getItem('Tasks');
console.log('tables', ws.tables.items?.length, ws.tables.items?.map(t=>({name:t.name, address:t.getRange?.().address})));
const t = ws.tables.items?.[0];
console.log('table keys', Object.keys(t ?? {}));
console.log('tables keys', Object.keys(ws.tables));
console.log(wb.help('table.resize', {include:'index,examples,notes', maxChars:4000}).ndjson);
