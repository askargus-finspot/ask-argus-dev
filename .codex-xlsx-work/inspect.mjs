import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const inputPath = 'C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v2.xlsx';
const input = await FileBlob.load(inputPath);
const wb = await SpreadsheetFile.importXlsx(input);
const summary = await wb.inspect({ kind: 'workbook,sheet,table,region', maxChars: 12000, tableMaxRows: 12, tableMaxCols: 12, tableMaxCellChars: 120 });
console.log(summary.ndjson);
