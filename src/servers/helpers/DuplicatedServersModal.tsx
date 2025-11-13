import { CardModal } from '@shlinkio/shlink-frontend-kit';
import type { FC } from 'react';
import { Fragment } from 'react';
import type { ServerData } from '../data';

export type DuplicatedServersModalProps = {
  duplicatedServers: ServerData[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DuplicatedServersModal: FC<DuplicatedServersModalProps> = (
  { open, duplicatedServers, onClose, onConfirm },
) => {
  const hasMultipleServers = duplicatedServers.length > 1;

  return (
    <CardModal
      size="lg"
      title={`Yinelenen Sunucu${hasMultipleServers ? 'lar' : ''}`}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={`Yinelenen${hasMultipleServers ? 'leri' : 'yi'} Kaydet`}
      cancelText={hasMultipleServers ? 'Yinelenenleri Yoksay' : 'İptal Et'}
      className="rounded-xl"
    >
      <div className="flex flex-col gap-4 p-2">
        <p className="text-base font-medium">
          {hasMultipleServers ? 'Aşağıdaki sunucular zaten mevcut:' : 'Zaten şu bilgilere sahip bir sunucu var:'}
        </p>
        <ul className="list-disc ml-5 space-y-2 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
          {duplicatedServers.map(({ url, apiKey }, index) => (!hasMultipleServers ? (
            <Fragment key={index}>
              <li className="text-sm">URL: <b className="text-indigo-600 dark:text-indigo-400">{url}</b></li>
              <li className="text-sm">API Anahtarı: <b className="text-indigo-600 dark:text-indigo-400">{apiKey}</b></li>
            </Fragment>
          ) : <li key={index} className="text-sm"><b className="text-indigo-600 dark:text-indigo-400">{url}</b> - <b className="text-purple-600 dark:text-purple-400">{apiKey}</b></li>))}
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {hasMultipleServers ? 'Yinelenen sunucuları kaydetmek istiyor musunuz' : 'Bu sunucuyu kaydetmek istiyor musunuz'}?
        </p>
      </div>
    </CardModal>
  );
};
