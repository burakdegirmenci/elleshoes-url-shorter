import { faExternalLinkAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from '@shlinkio/shlink-frontend-kit';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { ExternalLink } from 'react-external-link';
import { useNavigate } from 'react-router';
import type { ServersMap } from '../servers/data';
import { ServersListGroup } from '../servers/ServersListGroup';
import { ShlinkLogo } from './img/ShlinkLogo';

export type HomeProps = {
  servers: ServersMap;
};

export const Home = ({ servers }: HomeProps) => {
  const navigate = useNavigate();
  const serversList = Object.values(servers);
  const hasServers = serversList.length > 0;

  useEffect(() => {
    // Try to redirect to the first server marked as auto-connect
    const autoConnectServer = serversList.find(({ autoConnect }) => autoConnect);
    if (autoConnectServer) {
      navigate(`/server/${autoConnectServer.id}`);
    }
  }, [serversList, navigate]);

  return (
    <div className="px-3 w-full py-8">
      <Card className="mx-auto max-w-[820px] overflow-hidden shadow-subtle-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="flex flex-col md:flex-row">
          <div className="p-8 hidden md:flex items-center w-[40%] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
            <div className="w-full">
              <ShlinkLogo />
            </div>
          </div>

          <div className="md:border-l border-lm-border dark:border-dm-border flex-grow">
            <h1
              className={clsx(
                'p-6 text-center border-lm-border dark:border-dm-border text-3xl font-semibold',
                { 'border-b': !hasServers },
              )}
            >
              Hoş Geldiniz!
            </h1>
            {hasServers ? <ServersListGroup servers={serversList} /> : (
              <div className="p-8 text-center flex flex-col gap-10">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bu uygulama ElleShoes sunucularınızı yönetmenize yardımcı olacaktır.
                </p>
                <p>
                  <Button
                    to="/server/create"
                    size="lg"
                    inline
                    className="rounded-xl px-8 py-3 shadow-subtle-md hover:shadow-subtle-lg transition-all"
                  >
                    <FontAwesomeIcon icon={faPlus} widthAuto /> Sunucu Ekle
                  </Button>
                </p>
                <p>
                  <ExternalLink
                    href="https://elleshoes.com"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <small className="text-sm">
                      <span className="mr-2">ElleShoes hakkında daha fazla bilgi</span>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </small>
                  </ExternalLink>
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
