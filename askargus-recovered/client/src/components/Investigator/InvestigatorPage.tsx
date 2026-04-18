import { useState, useCallback } from 'react';
import axios from 'axios';
import { Search, ChevronDown, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

interface TimeRange {
  from: string;
  to: string;
}

interface QueryPlan {
  id: string;
  domain: string;
  language: string;
  tool: string;
  rationale: string;
}

interface ToolActivity {
  id: string;
  domain: string;
  serverName?: string;
  tool: string;
  name?: string;
  ok: boolean;
  sample?: string;
  output?: string;
  error?: string;
  durationMs?: number;
}

interface Finding {
  claim: string;
  evidencePlanIds: string[];
  confidence: 'high' | 'medium' | 'low';
}

interface InvestigatorResult {
  runId: string;
  summary: string;
  displaySummary: string;
  toolActivityMarkdown: string;
  toolActivity: ToolActivity[];
  plans: QueryPlan[];
  findings: Finding[];
  durationMs: number;
}

interface InvestigatorRequest {
  symptom: string;
  timeRange?: TimeRange;
  maxIterations?: number;
  mcpEndpoints?: Record<string, string>;
}

const CONFIDENCE_COLORS: Record<string, string> = {
  high: 'bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30',
  medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
  low: 'bg-surface-tertiary text-text-secondary border border-border-light',
};

async function runInvestigation(payload: InvestigatorRequest): Promise<InvestigatorResult> {
  const authHeader = axios.defaults.headers.common['Authorization'] as string | undefined;
  const res = await fetch('/api/investigator/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader != null ? { Authorization: authHeader } : {}),
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: `Investigator request failed with HTTP ${res.status}` }));
    throw new Error(
      (err as { error?: string; message?: string }).error ??
        (err as { message?: string }).message ??
        `Investigator request failed with HTTP ${res.status}`,
    );
  }
  return res.json() as Promise<InvestigatorResult>;
}

function ToolActivityCard({ activity }: { activity: ToolActivity }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border-light bg-surface-secondary overflow-hidden">
      <button
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-hover transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {activity.ok ? (
          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
        )}
        <span className="flex-1 font-medium text-sm text-text-primary truncate">
          {activity.serverName ?? activity.domain} - {activity.name ?? activity.tool}
        </span>
        {activity.durationMs != null && (
          <span className="flex items-center gap-1 text-xs text-text-tertiary shrink-0">
            <Clock className="h-3 w-3" />
            {activity.durationMs}ms
          </span>
        )}
        {open ? (
          <ChevronDown className="h-4 w-4 text-text-tertiary shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-text-tertiary shrink-0" />
        )}
      </button>
      {open && (
        <div className="border-t border-border-light px-4 py-3">
          {activity.ok && (activity.output ?? activity.sample) ? (
            <pre className="text-xs text-text-primary whitespace-pre-wrap font-mono bg-surface-primary rounded p-2 overflow-x-auto max-h-48">
              {activity.output ?? activity.sample}
            </pre>
          ) : (
            <p className="text-xs text-red-500">{activity.error ?? 'No output'}</p>
          )}
        </div>
      )}
    </div>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className="rounded-lg border border-border-light bg-surface-secondary px-4 py-3 flex gap-3 items-start">
      <span
        className={cn(
          'mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold shrink-0',
          CONFIDENCE_COLORS[finding.confidence] ?? CONFIDENCE_COLORS.low,
        )}
      >
        {finding.confidence}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">{finding.claim}</p>
        {finding.evidencePlanIds.length > 0 && (
          <p className="mt-1 text-xs text-text-tertiary">
            Evidence: {finding.evidencePlanIds.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}

export default function InvestigatorPage() {
  const localize = useLocalize();
  const [symptom, setSymptom] = useState('');
  const [useTimeRange, setUseTimeRange] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState<InvestigatorResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!symptom.trim()) return;

      setIsPending(true);
      setErrorMessage(null);
      setData(null);

      try {
        const result = await runInvestigation({
          symptom: symptom.trim(),
          timeRange: useTimeRange && from && to ? { from, to } : undefined,
          maxIterations: 3,
          mcpEndpoints: {
            mysql: 'http://host.docker.internal:5001/mcp/sse',
          },
        });
        setData(result);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Investigator request failed');
      } finally {
        setIsPending(false);
      }
    },
    [symptom, useTimeRange, from, to],
  );

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-surface-primary">
      {/* Header */}
      <div className="sticky top-0 z-10 flex h-[52px] items-center gap-3 border-b border-border-light/40 bg-presentation/60 px-6 backdrop-blur-md">
        <Search className="h-4 w-4 text-text-secondary" />
        <h1 className="text-base font-semibold text-text-primary">
          {localize('com_investigator_title')}
        </h1>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-8 flex flex-col gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary" htmlFor="symptom">
              {localize('com_investigator_symptom_label')}
            </label>
            <textarea
              id="symptom"
              rows={3}
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder={localize('com_investigator_symptom_placeholder')}
              className="w-full resize-none rounded-xl border border-border-medium bg-surface-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-green-500/60 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors"
            />
          </div>

          {/* Time range toggle */}
          <label className="flex cursor-pointer items-center gap-2 w-fit select-none">
            <input
              type="checkbox"
              checked={useTimeRange}
              onChange={(e) => setUseTimeRange(e.target.checked)}
              className="rounded border-border-medium accent-green-500"
            />
            <span className="text-sm text-text-secondary">
              {localize('com_investigator_time_range')}
            </span>
          </label>

          {useTimeRange && (
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-xs text-text-tertiary" htmlFor="from">From</label>
                <input
                  id="from"
                  type="datetime-local"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="rounded-lg border border-border-medium bg-surface-secondary px-3 py-2 text-sm text-text-primary focus:border-green-500/60 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-xs text-text-tertiary" htmlFor="to">To</label>
                <input
                  id="to"
                  type="datetime-local"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="rounded-lg border border-border-medium bg-surface-secondary px-3 py-2 text-sm text-text-primary focus:border-green-500/60 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || !symptom.trim()}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all',
              isPending || !symptom.trim()
                ? 'cursor-not-allowed bg-surface-tertiary text-text-tertiary'
                : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm',
            )}
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {localize('com_investigator_running')}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {localize('com_investigator_run')}
              </>
            )}
          </button>
        </form>

        {isPending && (
          <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-600/30 border-t-green-600" />
            <p className="text-sm text-green-700 dark:text-green-300">
              Running investigator with MySQL MCP...
            </p>
          </div>
        )}

        {/* Error */}
        {errorMessage != null && (
          <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        )}

        {/* Results */}
        {data != null && (
          <div className="flex flex-col gap-6">
            {/* Summary */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-text-primary">
                  {localize('com_investigator_summary')}
                </h2>
                {data.durationMs > 0 && (
                  <span className="flex items-center gap-1 text-xs text-text-tertiary">
                    <Clock className="h-3 w-3" />
                    {(data.durationMs / 1000).toFixed(1)}s
                  </span>
                )}
              </div>
              <div className="rounded-xl border border-border-light bg-surface-secondary px-5 py-4 text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {data.summary}
              </div>
            </section>

            {/* Findings */}
            {data.findings.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  {localize('com_investigator_findings')} ({data.findings.length})
                </h2>
                <div className="flex flex-col gap-2">
                  {data.findings.map((f, i) => (
                    <FindingCard key={i} finding={f} />
                  ))}
                </div>
              </section>
            )}

            {/* Tool Activity */}
            {data.toolActivity.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  {localize('com_investigator_tool_activity')} ({data.toolActivity.length})
                </h2>
                <div className="flex flex-col gap-2">
                  {data.toolActivity.map((a, i) => (
                    <ToolActivityCard key={i} activity={a} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
