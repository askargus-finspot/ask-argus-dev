import { memo, useMemo } from 'react';
import type { TMessage } from 'askargus-data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type MessageMetadataProps = {
  message: TMessage;
  isLast?: boolean;
};

const formatElapsedTime = (durationMs: number) => {
  if (durationMs < 1000) {
    return `${Math.round(durationMs)}ms`;
  }

  const seconds = durationMs / 1000;
  return `${seconds >= 10 ? seconds.toFixed(1) : seconds.toFixed(2)}s`;
};

const parseDate = (value?: string | Date | null) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const MessageMetadata = memo(({ message, isLast }: MessageMetadataProps) => {
  const localize = useLocalize();
  const tokenCount = typeof message.tokenCount === 'number' ? message.tokenCount : null;
  const promptTokens = typeof message.promptTokens === 'number' ? message.promptTokens : null;
  const totalTokens =
    typeof message.totalTokens === 'number'
      ? message.totalTokens
      : promptTokens != null && tokenCount != null
        ? promptTokens + tokenCount
        : null;
  const reasoningTokens =
    typeof message.reasoningTokens === 'number' ? message.reasoningTokens : null;

  const toolCount = useMemo(() => {
    if (!Array.isArray(message.content)) {
      return 0;
    }

    const toolIds = new Set<string>();
    let unnamedToolCount = 0;

    for (const part of message.content) {
      if (!part || typeof part !== 'object') {
        continue;
      }

      if ('tool_call_ids' in part && Array.isArray(part.tool_call_ids)) {
        for (const toolCallId of part.tool_call_ids) {
          if (toolCallId) {
            toolIds.add(toolCallId);
          }
        }
      }

      if ('tool_call' in part && part.tool_call) {
        const toolCallId =
          'id' in part.tool_call && typeof part.tool_call.id === 'string' ? part.tool_call.id : '';
        if (toolCallId) {
          toolIds.add(toolCallId);
        } else {
          unnamedToolCount += 1;
        }
      }
    }

    return toolIds.size + unnamedToolCount;
  }, [message.content]);

  const responseTime = useMemo(() => {
    if (message.isCreatedByUser) {
      return null;
    }

    const start = parseDate(message.createdAt);
    const end = parseDate(message.updatedAt);
    if (!start || !end) {
      return null;
    }

    const durationMs = end.getTime() - start.getTime();
    if (durationMs < 100) {
      return null;
    }

    return formatElapsedTime(durationMs);
  }, [message.createdAt, message.isCreatedByUser, message.updatedAt]);

  const messageTime = useMemo(() => {
    const timestamp = message.updatedAt || message.createdAt || message.clientTimestamp;
    const date = parseDate(timestamp);
    if (!date) {
      return null;
    }

    return {
      full: date.toLocaleString(),
      short: date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
    };
  }, [message.clientTimestamp, message.createdAt, message.updatedAt]);

  if (
    tokenCount == null &&
    promptTokens == null &&
    totalTokens == null &&
    toolCount === 0 &&
    !responseTime &&
    !messageTime
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-xs text-text-secondary',
        !isLast && 'opacity-90',
      )}
    >
      {message.isCreatedByUser ? (
        tokenCount != null && (
          <span className="whitespace-nowrap" title={localize('com_ui_tokens')}>
            {tokenCount.toLocaleString()} {localize(tokenCount === 1 ? 'com_ui_token' : 'com_ui_tokens')}
          </span>
        )
      ) : (
        <>
          {promptTokens != null && (
            <span className="whitespace-nowrap" title={localize('com_ui_input')}>
              {localize('com_ui_input')} {promptTokens.toLocaleString()}
            </span>
          )}
          {tokenCount != null && (
            <span
              className="whitespace-nowrap"
              title={
                reasoningTokens != null
                  ? `${localize('com_ui_output')} - ${localize('com_ui_reasoning')} ${reasoningTokens.toLocaleString()}`
                  : localize('com_ui_output')
              }
            >
              {localize('com_ui_output')} {tokenCount.toLocaleString()}
            </span>
          )}
          {totalTokens != null && (
            <span className="whitespace-nowrap" title={localize('com_ui_total')}>
              {localize('com_ui_total')} {totalTokens.toLocaleString()}
            </span>
          )}
          {toolCount > 0 && (
            <span className="whitespace-nowrap" title={localize('com_ui_tools')}>
              {localize('com_ui_tools')} {toolCount.toLocaleString()}
            </span>
          )}
        </>
      )}
      {responseTime && (
        <span className="whitespace-nowrap" title={localize('com_ui_response_time')}>
          {responseTime}
        </span>
      )}
      {messageTime && (
        <span className="whitespace-nowrap" title={`${localize('com_ui_created')}: ${messageTime.full}`}>
          {messageTime.short}
        </span>
      )}
    </div>
  );
});

MessageMetadata.displayName = 'MessageMetadata';

export default MessageMetadata;
