import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = 'C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v2.xlsx';
const outputPath = 'C:/Users/VediyappanMFinspot/Downloads/askargus-work-status-tracker-v3.xlsx';
const outputDir = 'C:/Users/VediyappanMFinspot/Desktop/bulkmcp/.codex-xlsx-work/output';

const excelDate = (serial) => new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
const d = (iso) => new Date(`${iso}T00:00:00Z`);

const headers = [
  'ID','Task Name','Description','Component','Assignee','Status','Actual Start','Actual End',
  'Planned Start','Planned End','Est Hrs','Actual Hrs','Remaining Hrs','Progress %','Remarks','Next'
];

const rows = [
  [1,'InfraRAG Architecture Setup','Design overall InfraRAG pipeline','InfraRAG','vedi','Completed',excelDate(46108),excelDate(46108),excelDate(46108),excelDate(46108),10,12,0,1,'Initial setup done','Closed'],
  [2,'Data Ingestion Module','Build ingestion for documents','InfraRAG','vedi','Completed',excelDate(46109),excelDate(46109),excelDate(46109),excelDate(46109),12,14,0,1,'Working stable','Closed'],
  [3,'ELK Stack Setup','Setup Elasticsearch, Logstash, Kibana','DB RAG','vedi','Completed',excelDate(46110),excelDate(46110),excelDate(46110),excelDate(46110),15,16,0,1,'Cluster configured','Closed'],
  [4,'Prometheus orchestration','Prometheus orchestration pipeline and integration','InfraRAG','vedi','Completed',excelDate(46111),excelDate(46121),excelDate(46111),excelDate(46121),9,12,0,1,'Created','Closed'],
  [5,'MCP Tool Calling Integration','Integrate MCP for tool calling end to end','MCP','vedi','Completed',excelDate(46112),excelDate(46120),excelDate(46112),excelDate(46120),8,20,0,1,'Working end-to-end','Closed'],
  [6,'API Layer for RAG','Build backend APIs','InfraRAG','vedi','Completed',excelDate(46113),excelDate(46113),excelDate(46113),excelDate(46113),10,11,0,1,'Stable APIs','Closed'],
  [7,'UI Dashboard','Frontend for query and results','UI','vedi','In Progress',excelDate(46114),null,excelDate(46114),excelDate(46127),16,8,8,0.5,'Basic UI ready','Finish dashboard UX: filters, history, loading/error states, tool trace view'],
  [8,'Tool Calling UI Integration','Connect UI with MCP tools','UI','vedi','In Progress',excelDate(46118),null,excelDate(46118),excelDate(46128),12,6,6,0.5,'Integration ongoing','Expose tool steps, results, tool errors, and check-all mode in UI'],
  [9,'Incident Management','End-to-end incident detection and alerting','AlertOps','vedi','Completed',excelDate(46117),excelDate(46118),excelDate(46117),excelDate(46118),14,14,0,1,'Fully implemented','Closed'],
  [10,'Testing & Debugging','End-to-end validation across UI, backend, and MCPs','Full System','vedi','Not Started',null,null,excelDate(46129),excelDate(46130),15,0,15,0,'Pending','Define scenarios, run e2e checks, fix timeouts/failures, verify check-all aggregation'],
  [11,'Performance Optimization','Improve latency, reliability, and accuracy','Full System','vedi','Not Started',null,null,excelDate(46139),excelDate(46142),20,0,20,0,'Pending','Parallelize safe tool calls, cache common lookups, tune prompts/tool args, add timeouts'],
  [12,'Documentation & Runbook','Runbook and onboarding docs for MCP servers and check-all flows','Docs','vedi','Not Started',null,null,excelDate(46143),excelDate(46143),8,0,8,0,'To be created','Troubleshooting checklist plus common incident playbooks'],
  [13,'Deployment Hardening','Pin versions, validate environment, release checklist','DevOps','vedi','Not Started',null,null,excelDate(46144),excelDate(46144),10,0,10,0,'Pending','Compose/K8s manifests, health checks, rollback plan'],
  [14,'Security & Secrets Hygiene','Remove/avoid secrets in repos and logs; tighten access','Security','vedi','Not Started',null,null,excelDate(46145),excelDate(46145),6,0,6,0,'Pending','Rotate leaked creds if any, secret scanning, env-only tokens, redact sensitive logs'],
  [15,'UX Polish + Monitoring Views','Improve dashboards, tool trace UI, and incident summaries','UI','vedi','Not Started',null,null,excelDate(46146),excelDate(46146),8,0,8,0,'Optional if time permits','Make tool outputs easier to read; export/share incident reports'],
  [16,'DB MCP Setup (MySQL + Postgres)','Configure DB MCP sources/tools and validate read-only queries','MCP','vedi','Not Started',null,null,excelDate(46131),excelDate(46132),12,0,12,0,'Planned','Add sources, permissions/limits, smoke test tools/list and tools/call'],
  [17,'Neo4j MCP Setup','Enable Neo4j MCP Cypher tools and validate connectivity','MCP','vedi','Not Started',null,null,excelDate(46133),excelDate(46133),10,0,10,0,'Planned','Configure source and auth; test schema discovery and basic Cypher execution'],
  [18,'RabbitMQ MCP Setup','Expose RabbitMQ health plus queue/consumer insights via MCP','MCP','vedi','Not Started',null,null,excelDate(46134),excelDate(46134),8,0,8,0,'Planned','Define safe read-only tools; validate against non-prod broker'],
  [19,'ELK Bulk MCP Setup','Expose Elasticsearch/ELK ES|QL via MCP Toolbox with result limits','MCP','vedi','In Progress',d('2026-04-22'),null,excelDate(46135),excelDate(46135),10,4,6,0.4,'Bulk MCP selected; official Elastic MCP reverted','Verify sample log prompts, index discovery query, timeout behavior, and UI rendering'],
  [20,'UI: MCP Server Management','UI screen to add/edit/enable MCP servers and status','UI','vedi','Not Started',null,null,excelDate(46136),excelDate(46137),12,0,12,0,'Planned','Show server list, health, auth placeholders, validation and error messages'],
  [21,'LangGraph: DB Tool Routing','Add/validate graph nodes for DB queries and cross-source correlation','InfraRAG','vedi','Not Started',null,null,excelDate(46138),excelDate(46138),10,0,10,0,'Planned','Policy allowlist, schema-aware prompts, fallback when DB MCP unavailable'],
  [22,'UI: DB Insights Panel','Add UI for DB tool outputs: queries, results, evidence','UI','vedi','Not Started',null,null,excelDate(46147),excelDate(46149),16,0,16,0,'Planned','Result tables, pagination/limits, export/share, tool error display'],
  [23,'Testing: DB MCP + Correlation','Validate DB MCP flows, error scenarios, and cross-source checks','Full System','vedi','Not Started',null,null,excelDate(46150),excelDate(46150),10,0,10,0,'Planned','Regression tests for check-all; verify partial failure reporting'],
  [24,'Server Docker Prerequisites','Install Docker Engine and Compose plugin on deployment server','DevOps','vedi','Not Started',null,null,d('2026-05-11'),d('2026-05-11'),6,0,6,0,'New','Install Docker, enable service, add user to docker group, verify docker compose version'],
  [25,'Server Repo Layout Setup','Clone/copy AskArgus-UI, mcp-toolbox, and promloki-mcp-go into server layout','DevOps','vedi','Not Started',null,null,d('2026-05-12'),d('2026-05-12'),6,0,6,0,'New','Ensure sibling paths match compose: ~/Askargus/AskArgus-UI, mcp-toolbox, promloki-mcp-go'],
  [26,'Production Env & Secret Setup','Create secure .env values for LLM, Mongo, MCP, ELK, Prometheus, Loki','Security','vedi','Not Started',null,null,d('2026-05-13'),d('2026-05-14'),12,0,12,0,'New','Fill env on server only; avoid chat/log exposure; rotate risky tokens; validate required vars'],
  [27,'LLM Provider Configuration','Configure NVIDIA/OpenAI/OpenRouter/Groq endpoints and model routing','LLM','vedi','Not Started',null,null,d('2026-05-15'),d('2026-05-15'),8,0,8,0,'New','Set provider keys, choose default model, verify tool-calling capable model behavior'],
  [28,'MCP Guardrails & Read-only Policy','Define safe MCP usage rules, query limits, and redaction behavior','Security','vedi','Not Started',null,null,d('2026-05-18'),d('2026-05-19'),14,0,14,0,'New','Limit destructive tools, cap rows/timeouts, redact sensitive values, define allowed domains'],
  [29,'Minimal Docker Deployment Validation','Run docker-compose.minimal.yml and verify UI, LLM, MCP, Mongo, ELK, Prometheus/Loki','DevOps','vedi','Not Started',null,null,d('2026-05-20'),d('2026-05-22'),18,0,18,0,'New','Build/start stack, verify logs, smoke test ELK/Prometheus/MySQL prompts, capture issues'],
  [30,'Release Handover & Rollback Plan','Prepare final handover, backup/restore notes, rollback commands, and ops checklist','Docs','vedi','Not Started',null,null,d('2026-05-25'),d('2026-05-26'),14,0,14,0,'New','Document startup, deploy, rollback, troubleshooting, monitoring, and ownership handoff'],
];

const statusCounts = rows.reduce((acc, r) => (acc[r[5]] = (acc[r[5]] || 0) + 1, acc), {});
const totalEst = rows.reduce((a, r) => a + r[10], 0);
const totalActual = rows.reduce((a, r) => a + r[11], 0);
const totalRemaining = rows.reduce((a, r) => a + r[12], 0);
const avgProgress = rows.reduce((a, r) => a + r[13], 0) / rows.length;
const workDays = Math.ceil(totalRemaining / 8);
const workWeeks = Math.ceil(workDays / 5);

const input = await FileBlob.load(inputPath);
const wb = await SpreadsheetFile.importXlsx(input);
const tasks = wb.worksheets.getItem('Tasks');
const summary = wb.worksheets.getItem('Summary');
const roadmap = wb.worksheets.getOrAdd('Roadmap', { renameFirstIfOnlyNewSpreadsheet: false });
const risks = wb.worksheets.getOrAdd('Risks', { renameFirstIfOnlyNewSpreadsheet: false });

for (const ws of [tasks, summary, roadmap, risks]) {
  ws.showGridLines = false;
  try { ws.deleteAllDrawings(); } catch {}
}

// Tasks sheet
const fullTasks = [headers, ...rows];
tasks.getRange('A1:P80').clear({ applyTo: 'all' });
tasks.getRange(`A1:P${fullTasks.length}`).values = fullTasks;
tasks.freezePanes.freezeRows(1);
tasks.getRange('A1:P1').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', verticalAlignment: 'center' };
tasks.getRange('A1:P1').format.rowHeightPx = 30;
tasks.getRange(`A2:P${fullTasks.length}`).format.wrapText = true;
tasks.getRange(`G2:J${fullTasks.length}`).format.numberFormat = 'yyyy-mm-dd';
tasks.getRange(`N2:N${fullTasks.length}`).format.numberFormat = '0%';
tasks.getRange(`K2:M${fullTasks.length}`).format.numberFormat = '0';
tasks.getRange('A:A').format.columnWidthPx = 48;
tasks.getRange('B:B').format.columnWidthPx = 210;
tasks.getRange('C:C').format.columnWidthPx = 280;
tasks.getRange('D:D').format.columnWidthPx = 110;
tasks.getRange('E:E').format.columnWidthPx = 85;
tasks.getRange('F:F').format.columnWidthPx = 105;
tasks.getRange('G:J').format.columnWidthPx = 96;
tasks.getRange('K:N').format.columnWidthPx = 82;
tasks.getRange('O:O').format.columnWidthPx = 180;
tasks.getRange('P:P').format.columnWidthPx = 360;
tasks.getRange(`F2:F${fullTasks.length}`).dataValidation = { rule: { type: 'list', values: ['Completed','In Progress','Not Started','Blocked'] } };
tasks.getRange(`D2:D${fullTasks.length}`).dataValidation = { rule: { type: 'list', values: ['InfraRAG','DB RAG','MCP','UI','AlertOps','Full System','Docs','DevOps','Security','LLM'] } };
tasks.getRange(`F2:F${fullTasks.length}`).conditionalFormats.deleteAll();
tasks.getRange(`F2:F${fullTasks.length}`).conditionalFormats.addCustom('=F2="Completed"', { fill: '#DCFCE7', font: { color: '#166534', bold: true } });
tasks.getRange(`F2:F${fullTasks.length}`).conditionalFormats.addCustom('=F2="In Progress"', { fill: '#FEF3C7', font: { color: '#92400E', bold: true } });
tasks.getRange(`F2:F${fullTasks.length}`).conditionalFormats.addCustom('=F2="Not Started"', { fill: '#E5E7EB', font: { color: '#374151' } });
tasks.getRange(`F2:F${fullTasks.length}`).conditionalFormats.addCustom('=F2="Blocked"', { fill: '#FEE2E2', font: { color: '#991B1B', bold: true } });
tasks.getRange(`N2:N${fullTasks.length}`).conditionalFormats.addDataBar({ color: '#0F766E', gradient: true });
try {
  tasks.tables.add(`A1:P${fullTasks.length}`, true, 'AskArgusTasks');
} catch {}

// Summary sheet
summary.getRange('A1:H60').clear({ applyTo: 'all' });
summary.getRange('A1:H1').merge();
summary.getRange('A1').values = [['AskArgus Project Status Summary']];
summary.getRange('A2:H2').merge();
summary.getRange('A2').values = [['Updated tracker with 30 modules: UI, LLM, MCP, ELK, Prometheus/Loki, deployment, security, and handover work.']];
summary.getRange('A3:H3').merge();
summary.getRange('A3').values = [[`Planning assumption: one primary engineer, about 8 focused hours/day. Remaining effort is about ${workDays} workdays (${workWeeks} workweeks).`]];
summary.getRange('A1:H3').format.wrapText = true;
summary.getRange('A1').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF', size: 16 }, horizontalAlignment: 'center' };
summary.getRange('A2:H3').format = { fill: '#ECFDF5', font: { color: '#064E3B' } };

summary.getRange('A5:B14').values = [
  ['Metric','Value'],
  ['Total modules','=COUNTA(Tasks!A2:A31)'],
  ['Completed','=COUNTIF(Tasks!F2:F31,"Completed")'],
  ['In Progress','=COUNTIF(Tasks!F2:F31,"In Progress")'],
  ['Not Started','=COUNTIF(Tasks!F2:F31,"Not Started")'],
  ['Blocked','=COUNTIF(Tasks!F2:F31,"Blocked")'],
  ['Estimated hours','=SUM(Tasks!K2:K31)'],
  ['Actual hours','=SUM(Tasks!L2:L31)'],
  ['Remaining hours','=SUM(Tasks!M2:M31)'],
  ['Average progress','=AVERAGE(Tasks!N2:N31)'],
];
summary.getRange('D5:E10').values = [
  ['Timeline Estimate','Value'],
  ['Remaining workdays (8h/day)',`=ROUNDUP(B13/8,0)`],
  ['Remaining workweeks (5d/week)',`=ROUNDUP(E6/5,0)`],
  ['Earliest planned start','=MIN(Tasks!I2:I31)'],
  ['Latest planned end','=MAX(Tasks!J2:J31)'],
  ['Forecast comment','Finish core deployment + validation in late May if no infra blockers'],
];
summary.getRange('A5:B5').format = { fill: '#111827', font: { bold: true, color: '#FFFFFF' } };
summary.getRange('D5:E5').format = { fill: '#111827', font: { bold: true, color: '#FFFFFF' } };
summary.getRange('B14').format.numberFormat = '0%';
summary.getRange('E8:E9').format.numberFormat = 'yyyy-mm-dd';
summary.getRange('A16:B20').values = [
  ['Status','Count'],
  ['Completed','=B7'],
  ['In Progress','=B8'],
  ['Not Started','=B9'],
  ['Blocked','=B10'],
];
summary.getRange('A16:B16').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF' } };
summary.getRange('D13:H22').values = [
  ['Next Implementation Focus','','','',''],
  ['1','Install Docker + required repos on server, then run minimal compose only.','','',''],
  ['2','Secure .env values for LLM, Mongo, MCP, ELK, Prometheus, Loki.','','',''],
  ['3','Validate bulk MCP ELK, Prometheus/Loki, DB MCP flows from UI.','','',''],
  ['4','Add UI polish: tool trace, error display, DB insights, server management.','','',''],
  ['5','Complete docs, runbook, rollback plan, and handover checklist.','','',''],
  ['Delivery view',`Remaining: ${totalRemaining} hrs / approx ${workDays} days / ${workWeeks} weeks.`,'','',''],
  ['Risk view','Docker/server prerequisites and secret hygiene are current critical path.','','',''],
  ['Quality gate','No deployment until logs show MCP initialized and UI tool calls are smoke-tested.','','',''],
  ['Security gate','Do not paste tokens in chat; keep secrets only in server .env or secret manager.','','',''],
];
summary.getRange('D13:H13').merge();
summary.getRange('D13').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center' };
summary.getRange('D14:H22').format.wrapText = true;
summary.getRange('A:H').format.columnWidthPx = 135;
summary.getRange('D:D').format.columnWidthPx = 120;
summary.getRange('E:H').format.columnWidthPx = 150;

try {
  const chart = summary.charts.add('bar', summary.getRange('A16:B20'));
  chart.title = 'Module Status Distribution';
  chart.setPosition('A22', 'E38');
  chart.hasLegend = false;
} catch {}

// Roadmap sheet
roadmap.getRange('A1:H80').clear({ applyTo: 'all' });
roadmap.getRange('A1:H1').merge();
roadmap.getRange('A1').values = [['30-Module Roadmap']];
roadmap.getRange('A1').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF', size: 15 }, horizontalAlignment: 'center' };
const roadmapRows = [
  ['Phase','Modules','Planned Window','Goal','Key Exit Criteria','Dependency','Risk','Owner'],
  ['Foundation','1-6','Mar 27 - Apr 08','Core RAG/API/ELK/Prometheus/MCP base completed','Stable APIs and MCP tool calls exist','Local dev stack','Config drift','vedi'],
  ['UI + Incident Core','7-10','Apr 02 - Apr 18','Dashboard, tool UI, incident flow, first e2e checks','UI can run prompts and show tool output/errors','Foundation','UI blank/error states','vedi'],
  ['MCP Expansion','16-21','Apr 19 - May 06','MySQL/Postgres, Neo4j, RabbitMQ, ELK, routing nodes','Read-only tools smoke-tested and routed','Remote service access','Network/auth failures','vedi'],
  ['Deployment Prep','24-29','May 11 - May 22','Server Docker, repos, env, LLM, guardrails, minimal compose validation','Docker stack up; MCP logs verified; UI smoke tests pass','Docker + repos + .env','Secrets and host prerequisites','vedi'],
  ['Hardening + Handover','11-15, 22-23, 30','May 23 - Jun 05','Performance, UX, docs, test coverage, rollback/handover','Runbook and rollback tested; security checks passed','Deployment validation','Residual bugs and missing docs','vedi'],
];
roadmap.getRange(`A3:H${2 + roadmapRows.length}`).values = roadmapRows;
roadmap.getRange('A3:H3').format = { fill: '#111827', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center' };
roadmap.getRange('A4:H8').format.wrapText = true;
roadmap.getRange('A:A').format.columnWidthPx = 130;
roadmap.getRange('B:B').format.columnWidthPx = 95;
roadmap.getRange('C:C').format.columnWidthPx = 135;
roadmap.getRange('D:E').format.columnWidthPx = 250;
roadmap.getRange('F:G').format.columnWidthPx = 170;
roadmap.getRange('H:H').format.columnWidthPx = 85;
roadmap.freezePanes.freezeRows(3);
try { roadmap.tables.add(`A3:H${2 + roadmapRows.length}`, true, 'RoadmapTable'); } catch {}

// Risks sheet
risks.getRange('A1:H80').clear({ applyTo: 'all' });
risks.getRange('A1:H1').merge();
risks.getRange('A1').values = [['Risks, Decisions, and Deployment Checklist']];
risks.getRange('A1').format = { fill: '#0F766E', font: { bold: true, color: '#FFFFFF', size: 15 }, horizontalAlignment: 'center' };
const riskRows = [
  ['Type','Item','Impact','Likelihood','Owner','Due','Mitigation / Action','Status'],
  ['Blocker','Docker missing on server','Cannot run minimal compose','High','Ops/vedi',d('2026-05-11'),'Install Docker Engine and Compose plugin; verify docker ps and docker compose version','Open'],
  ['Blocker','mcp-toolbox repo missing on server','mcp-es cannot build','High','vedi',d('2026-05-12'),'Clone googleapis/mcp-toolbox beside AskArgus-UI','Open'],
  ['Blocker','promloki-mcp-go repo missing on server','observability MCP cannot build','High','vedi',d('2026-05-12'),'Clone/copy promloki-mcp-go beside AskArgus-UI','Open'],
  ['Security','Secrets pasted into chat or committed','Credential leak','Medium','vedi',d('2026-05-13'),'Keep secrets in server .env/secret manager only; rotate exposed values','Open'],
  ['Technical','ELK MCP broad queries timeout','Blank or failed UI tool output','Medium','vedi',d('2026-05-15'),'Use result limits, aggregate first, add timeout handling and concise UI rendering','Open'],
  ['Technical','Remote MySQL/RabbitMQ/Neo4j inaccessible','MCP tools fail at runtime','Medium','vedi',d('2026-05-16'),'Validate network routes/firewalls/auth from server before enabling UI flows','Open'],
  ['Quality','No deployment smoke test checklist','Hidden regressions','Medium','vedi',d('2026-05-22'),'Document smoke tests for UI, LLM, ELK, Prometheus/Loki, DB MCP, Mongo','Open'],
  ['Ops','No rollback path','Long recovery time','Medium','vedi',d('2026-05-26'),'Document image tags, compose rollback, env backup, data volume backup','Open'],
];
risks.getRange(`A3:H${2 + riskRows.length}`).values = riskRows;
risks.getRange('A3:H3').format = { fill: '#111827', font: { bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center' };
risks.getRange(`F4:F${2 + riskRows.length}`).format.numberFormat = 'yyyy-mm-dd';
risks.getRange(`A4:H${2 + riskRows.length}`).format.wrapText = true;
risks.getRange('A:A').format.columnWidthPx = 95;
risks.getRange('B:B').format.columnWidthPx = 230;
risks.getRange('C:C').format.columnWidthPx = 185;
risks.getRange('D:D').format.columnWidthPx = 100;
risks.getRange('E:E').format.columnWidthPx = 100;
risks.getRange('F:F').format.columnWidthPx = 105;
risks.getRange('G:G').format.columnWidthPx = 330;
risks.getRange('H:H').format.columnWidthPx = 90;
risks.freezePanes.freezeRows(3);
risks.getRange(`H4:H${2 + riskRows.length}`).dataValidation = { rule: { type: 'list', values: ['Open','In Progress','Closed','Accepted'] } };
try { risks.tables.add(`A3:H${2 + riskRows.length}`, true, 'RiskTable'); } catch {}

// Render visual checks
await fs.mkdir(outputDir, { recursive: true });
for (const sheetName of ['Summary', 'Tasks', 'Roadmap', 'Risks']) {
  const blob = await wb.render({ sheetName, autoCrop: 'all', scale: 1, format: 'png' });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(`${outputDir}/${sheetName}.png`, bytes);
}

const summaryInspect = await wb.inspect({ kind: 'table,region', range: 'Summary!A1:H25', maxChars: 5000, tableMaxRows: 25, tableMaxCols: 8 });
console.log(summaryInspect.ndjson);
const errScan = await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 100 }, summary: 'final formula error scan' });
console.log(errScan.ndjson);

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);
console.log(`Saved ${outputPath}`);
