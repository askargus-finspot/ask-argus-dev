import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const path = 'C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v3.xlsx';
const outputDir = 'C:/Users/VediyappanMFinspot/Desktop/bulkmcp/.codex-xlsx-work/output';
const input = await FileBlob.load(path);
const wb = await SpreadsheetFile.importXlsx(input);
const summary = wb.worksheets.getItem('Summary');
summary.deleteAllDrawings();
summary.getRange('D13:H25').clear({ applyTo: 'all' });
summary.getRange('D13:H13').merge();
summary.getRange('D13').values = [['Next Implementation Focus']];
summary.getRange('D13').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center' };
const focus = [
  ['1', 'Install Docker + required repos on server, then run minimal compose only.'],
  ['2', 'Secure .env values for LLM, Mongo, MCP, ELK, Prometheus, and Loki.'],
  ['3', 'Validate bulk MCP ELK, Prometheus/Loki, DB MCP flows from the UI.'],
  ['4', 'Add UI polish: tool trace, error display, DB insights, and server management.'],
  ['5', 'Complete docs, runbook, rollback plan, and handover checklist.'],
  ['Delivery view', 'Remaining: 243 hrs / approx 31 workdays / 7 workweeks.'],
  ['Risk view', 'Docker/server prerequisites and secret hygiene are current critical path.'],
  ['Quality gate', 'No deployment until logs show MCP initialized and UI tool calls are smoke-tested.'],
  ['Security gate', 'Do not paste tokens in chat; keep secrets only in server .env or secret manager.'],
];
for (let i = 0; i < focus.length; i++) {
  const row = 14 + i;
  summary.getRange(`D${row}`).values = [[focus[i][0]]];
  summary.getRange(`E${row}:H${row}`).merge();
  summary.getRange(`E${row}`).values = [[focus[i][1]]];
}
summary.getRange('D14:D22').format = { fill: '#ECFDF5', font: { bold: true, color: '#064E3B' }, horizontalAlignment: 'center' };
summary.getRange('E14:H22').format = { fill: '#F8FAFC', font: { color: '#111827' }, wrapText: true, verticalAlignment: 'top' };
summary.getRange('D14:H22').format.rowHeightPx = 34;
summary.getRange('D:D').format.columnWidthPx = 115;
summary.getRange('E:H').format.columnWidthPx = 150;
try {
  const chart = summary.charts.add('bar', summary.getRange('A16:B20'));
  chart.title = 'Module Status Distribution';
  chart.setPosition('A22', 'E38');
  chart.hasLegend = false;
} catch {}
await fs.mkdir(outputDir, { recursive: true });
for (const sheetName of ['Summary','Tasks','Roadmap','Risks']) {
  const blob = await wb.render({ sheetName, autoCrop: 'all', scale: 1, format: 'png' });
  await fs.writeFile(`${outputDir}/${sheetName}.png`, new Uint8Array(await blob.arrayBuffer()));
}
const errors = await wb.inspect({ kind:'match', searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options:{useRegex:true,maxResults:100}, summary:'final formula error scan' });
console.log(errors.ndjson);
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(path);
console.log(`Saved ${path}`);
