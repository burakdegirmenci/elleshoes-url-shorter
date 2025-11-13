import type { ExitAction } from '@shlinkio/shlink-frontend-kit';
import { CardModal } from '@shlinkio/shlink-frontend-kit';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { ServerWithId } from './data';

export type DeleteServerModalProps = {
  server: ServerWithId;
  onClose: (confirmed: boolean) => void;
  open: boolean;
};

type DeleteServerModalConnectProps = DeleteServerModalProps & {
  deleteServer: (server: ServerWithId) => void;
};

export const DeleteServerModal: FC<DeleteServerModalConnectProps> = ({ server, onClose, open, deleteServer }) => {
  const onClosed = useCallback((exitAction: ExitAction) => {
    if (exitAction === 'confirm') {
      deleteServer(server);
    }
  }, [deleteServer, server]);

  return (
    <CardModal
      open={open}
      title="Sunucuyu Kaldır"
      variant="danger"
      onClose={() => onClose(false)}
      onConfirm={() => onClose(true)}
      onClosed={onClosed}
      confirmText="Sil"
      className="rounded-xl"
    >
      <div className="flex flex-col gap-y-5 p-2">
        <p className="text-base">
          <b>{server ? server.name : ''}</b> sunucusunu kaldırmak istediğinizden emin misiniz?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-indigo-500">
          <i>
            Hiçbir veri silinmeyecek, yalnızca bu cihazdan bu sunucuya erişim kaldırılacaktır.
            İstediğiniz zaman yeniden oluşturabilirsiniz.
          </i>
        </p>
      </div>
    </CardModal>
  );
};
