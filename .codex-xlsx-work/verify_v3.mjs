import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const input = await FileBlob.load('C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v3.xlsx');
const wb = await SpreadsheetFile.importXlsx(input);
const summary = await wb.inspect({ kind:'workbook,sheet,region,match', range:'Tasks!A1:P35', maxChars:10000, tableMaxRows:35, tableMaxCols:16, tableMaxCellChars:90 });
console.log(summary.ndjson);
const errors = await wb.inspect({ kind:'match', searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options:{useRegex:true,maxResults:100}, summary:'verify errors' });
console.log(errors.ndjson);
