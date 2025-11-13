import { faChevronRight as chevronIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC } from 'react';
import { Link } from 'react-router';
import type { ServerWithId } from './data';

type ServersListGroupProps = {
  servers: ServerWithId[];
  borderless?: boolean;
};

const ServerListItem = ({ id, name }: { id: string; name: string }) => (
  <Link
    to={`/server/${id}`}
    className={clsx(
      'servers-list__server-item',
      'flex items-center justify-between gap-x-3 px-5 py-4',
      'rounded-none hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50',
      'dark:hover:from-slate-800 dark:hover:to-slate-900',
      'border-b last:border-0 border-gray-200 dark:border-slate-700',
      'transition-all duration-200',
      'group',
    )}
  >
    <span className="truncate font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
      {name}
    </span>
    <FontAwesomeIcon icon={chevronIcon} className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
  </Link>
);

export const ServersListGroup: FC<ServersListGroupProps> = ({ servers, borderless }) => (
  <>
    {servers.length > 0 && (
      <div
        data-testid="list"
        className={clsx(
          'w-full border-lm-border dark:border-dm-border',
          'md:max-h-56 md:overflow-y-auto -mb-1 scroll-thin',
          { 'border-y': !borderless },
        )}
      >
        {servers.map(({ id, name }) => <ServerListItem key={id} id={id} name={name} />)}
      </div>
    )}
  </>
);
