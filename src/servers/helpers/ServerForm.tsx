import {
  Checkbox,
  Details,
  Label,
  LabelledInput,
  LabelledRevealablePasswordInput,
  SimpleCard,
  useToggle,
} from '@shlinkio/shlink-frontend-kit';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useState } from 'react';
import { usePreventDefault } from '../../utils/utils';
import type { ServerData } from '../data';

type ServerFormProps = PropsWithChildren<{
  onSubmit: (server: ServerData) => void;
  initialValues?: ServerData;
  title?: ReactNode;
}>;

export const ServerForm: FC<ServerFormProps> = ({ onSubmit, initialValues, children, title }) => {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [url, setUrl] = useState(initialValues?.url ?? '');
  const [apiKey, setApiKey] = useState(initialValues?.apiKey ?? '');
  const { flag: forwardCredentials, toggle: toggleForwardCredentials } = useToggle(
    initialValues?.forwardCredentials ?? false,
  );
  const handleSubmit = usePreventDefault(() => onSubmit({ name, url, apiKey, forwardCredentials }));

  return (
    <form name="serverForm" onSubmit={handleSubmit}>
      <SimpleCard className="mb-4 rounded-xl shadow-subtle-lg" bodyClassName="flex flex-col gap-y-4" title={title}>
        <LabelledInput
          label="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <LabelledInput
          label="URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <LabelledRevealablePasswordInput
          label="API Anahtarı"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <Details summary="Gelişmiş Seçenekler" className="mt-2">
          <div className="flex flex-col gap-2 pt-3">
            <Label className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
              <Checkbox onChange={toggleForwardCredentials} checked={forwardCredentials} />
              <span className="text-sm">Bu sunucuya her istekte kimlik bilgilerini ilet.</span>
            </Label>
            <small className="pl-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              {'"'}Kimlik bilgileri{'"'} terimi burada çerezler, TLS istemci sertifikaları veya kullanıcı adı
              ve şifre içeren kimlik doğrulama başlıklarını ifade eder.
            </small>
            <small className="pl-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              <b>Önemli!</b> Bunun ne anlama geldiğinden emin değilseniz, işaretlenmemiş bırakın. Bu seçeneği
              etkinleştirmek, sunucunun{' '}
              <code className="whitespace-nowrap bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">
                Access-Control-Allow-Origin
              </code>{' '}
              için <code className="bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">*</code> değerinden
              daha katı bir değer ayarlamasını gerektirdiğinden, v4.5.0&apos;dan eski ElleShoes sürümlerinde tüm
              isteklerin başarısız olmasına neden olacaktır.
            </small>
          </div>
        </Details>
      </SimpleCard>

      <div className="flex items-center justify-end gap-x-3">{children}</div>
    </form>
  );
};
