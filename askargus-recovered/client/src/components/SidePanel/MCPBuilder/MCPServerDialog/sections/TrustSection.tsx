import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, Label } from '@askargus/client';
import { useLocalize, useLocalizedConfig } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { sanitizeHtml } from '~/utils';
import type { MCPServerFormData } from '../hooks/useMCPServerForm';

export default function TrustSection() {
  const localize = useLocalize();
  const { data: startupConfig } = useGetStartupConfig();
  const getLocalizedValue = useLocalizedConfig();
  const {
    control,
    formState: { errors },
  } = useFormContext<MCPServerFormData>();
  const trustLabel = useMemo(() => {
    const label = startupConfig?.interface?.mcpServers?.trustCheckbox?.label;
    return sanitizeHtml(label ? getLocalizedValue(label, localize('com_ui_trust_app')) : '');
  }, [getLocalizedValue, localize, startupConfig?.interface?.mcpServers?.trustCheckbox?.label]);
  const trustSubLabel = useMemo(() => {
    const subLabel = startupConfig?.interface?.mcpServers?.trustCheckbox?.subLabel;
    return sanitizeHtml(
      subLabel ? getLocalizedValue(subLabel, localize('com_agents_mcp_trust_subtext')) : '',
    );
  }, [
    getLocalizedValue,
    localize,
    startupConfig?.interface?.mcpServers?.trustCheckbox?.subLabel,
  ]);

  return (
    <div className="rounded-lg border border-border-light bg-surface-secondary p-2">
      <div className="flex items-start gap-3">
        <Controller
          name="trust"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox
              id="trust"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-labelledby="trust-label"
              aria-describedby={
                errors.trust ? 'trust-description trust-error' : 'trust-description'
              }
              aria-invalid={errors.trust ? 'true' : 'false'}
              aria-required="true"
              className="mt-0.5"
            />
          )}
        />
        <Label htmlFor="trust" className="flex cursor-pointer flex-col gap-0.5 text-sm">
          <span id="trust-label" className="font-medium text-text-primary">
            {trustLabel ? (
              <span dangerouslySetInnerHTML={{ __html: trustLabel }} />
            ) : (
              localize('com_ui_trust_app')
            )}{' '}
            <span aria-hidden="true" className="text-text-secondary">
              *
            </span>
          </span>
          <span id="trust-description" className="text-xs font-normal text-text-secondary">
            {trustSubLabel ? (
              <span dangerouslySetInnerHTML={{ __html: trustSubLabel }} />
            ) : (
              localize('com_agents_mcp_trust_subtext')
            )}
          </span>
        </Label>
      </div>
      {errors.trust && (
        <p id="trust-error" role="alert" className="mt-2 text-xs text-text-destructive">
          {localize('com_ui_field_required')}
        </p>
      )}
    </div>
  );
}
