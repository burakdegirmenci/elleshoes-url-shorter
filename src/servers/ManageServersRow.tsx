import { faCheck as checkIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Tooltip, useTooltip } from '@shlinkio/shlink-frontend-kit';
import type { FC } from 'react';
import { Link } from 'react-router';
import type { FCWithDeps } from '../container/utils';
import { componentFactory, useDependencies } from '../container/utils';
import type { ServerWithId } from './data';
import type { ManageServersRowDropdownProps } from './ManageServersRowDropdown';

export type ManageServersRowProps = {
  server: ServerWithId;
  hasAutoConnect: boolean;
};

type ManageServersRowDeps = {
  ManageServersRowDropdown: FC<ManageServersRowDropdownProps>;
};

const ManageServersRow: FCWithDeps<ManageServersRowProps, ManageServersRowDeps> = ({ server, hasAutoConnect }) => {
  const { ManageServersRowDropdown } = useDependencies(ManageServersRow);
  const { anchor, tooltip } = useTooltip();

  return (
    <Table.Row className="relative hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
      {hasAutoConnect && (
        <Table.Cell columnName="Otomatik Bağlan">
          {server.autoConnect && (
            <>
              <FontAwesomeIcon
                icon={checkIcon}
                className="text-green-600 dark:text-green-400"
                {...anchor}
              />
              <Tooltip {...tooltip}>Bu sunucuya otomatik bağlan</Tooltip>
            </>
          )}
        </Table.Cell>
      )}
      <Table.Cell className="font-semibold text-indigo-700 dark:text-indigo-300" columnName="İsim">
        <Link to={`/server/${server.id}`} className="hover:underline">{server.name}</Link>
      </Table.Cell>
      <Table.Cell columnName="Temel URL" className="max-lg:border-b-0 text-gray-600 dark:text-gray-400">{server.url}</Table.Cell>
      <Table.Cell className="text-right max-lg:absolute right-0 -top-1 mx-lg:pt-0">
        <ManageServersRowDropdown server={server} />
      </Table.Cell>
    </Table.Row>
  );
};

export const ManageServersRowFactory = componentFactory(ManageServersRow, ['ManageServersRowDropdown']);
