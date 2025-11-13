import { Button } from '@shlinkio/shlink-frontend-kit';
import type { FC, PropsWithChildren } from 'react';
import { ErrorLayout } from './ErrorLayout';

type NotFoundProps = PropsWithChildren<{ to?: string }>;

export const NotFound: FC<NotFoundProps> = ({ to = '/', children = 'Ana Sayfa' }) => (
  <ErrorLayout title="Üzgünüz! İstenen sayfa bulunamadı.">
    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      Tarayıcınızın geri butonunu kullanarak daha önce geldiğiniz sayfaya dönebilir
      veya bu butona basabilirsiniz.
    </p>
    <br />
    <Button inline to={to} size="lg" className="rounded-xl px-8 py-3 shadow-subtle-md hover:shadow-subtle-lg transition-all">
      {children}
    </Button>
  </ErrorLayout>
);
