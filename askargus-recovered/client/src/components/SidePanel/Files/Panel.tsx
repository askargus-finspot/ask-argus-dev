import type { TFile } from 'askargus-data-provider';
import { useGetFiles } from '~/data-provider';
import { columns } from './PanelColumns';
import DataTable from './PanelTable';

export default function FilesPanel() {
  const { data: files = [] } = useGetFiles<TFile[]>();

  return (
    <div className="h-auto w-full px-3 pb-3">
      <DataTable columns={columns} data={files} />
    </div>
  );
}
