import { faSyncAlt as reloadIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CloseButton,useToggle  } from '@shlinkio/shlink-frontend-kit';
import { clsx } from 'clsx';
import type { FC } from 'react';
import { useCallback } from 'react';

interface AppUpdateBannerProps {
  isOpen: boolean;
  onClose: () => void;
  forceUpdate: () => void;
}

export const AppUpdateBanner: FC<AppUpdateBannerProps> = ({ isOpen, onClose, forceUpdate }) => {
  const { flag: isUpdating, setToTrue: setUpdating } = useToggle();
  const update = useCallback(() => {
    setUpdating();
    forceUpdate();
  }, [forceUpdate, setUpdating]);

  if (!isOpen) {
    return null;
  }

  return (
    <Card
      role="alert"
      className={clsx(
        'w-[700px] max-w-[calc(100%-30px)]',
        'fixed top-[35px] left-[50%] translate-x-[-50%] z-[1040]',
        'rounded-xl shadow-subtle-lg border-2 border-indigo-200 dark:border-indigo-800',
      )}
    >
      <Card.Header className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <h5 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Uygulama Güncellendi! 🎉</h5>
        <CloseButton onClick={onClose} />
      </Card.Header>
      <Card.Body className="flex gap-4 items-center justify-between max-md:flex-col p-5">
        <span className="text-gray-700 dark:text-gray-300">Yeni özellikleri kullanmak için yeniden başlatın.</span>
        <Button
          disabled={isUpdating}
          variant="secondary"
          solid
          onClick={update}
          className="rounded-lg px-6 shadow-subtle-md hover:shadow-subtle-lg transition-all whitespace-nowrap"
        >
          {!isUpdating && <>Şimdi Yeniden Başlat <FontAwesomeIcon icon={reloadIcon} /></>}
          {isUpdating && <>Yeniden Başlatılıyor...</>}
        </Button>
      </Card.Body>
    </Card>
  );
};
