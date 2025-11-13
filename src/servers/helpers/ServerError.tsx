import { Card, Message } from '@shlinkio/shlink-frontend-kit';
import type { FC } from 'react';
import { Link } from 'react-router';
import { NoMenuLayout } from '../../common/NoMenuLayout';
import type { FCWithDeps } from '../../container/utils';
import { componentFactory, useDependencies } from '../../container/utils';
import type { SelectedServer, ServersMap } from '../data';
import { isServerWithId } from '../data';
import type { DeleteServerButtonProps } from '../DeleteServerButton';
import { ServersListGroup } from '../ServersListGroup';

type ServerErrorProps = {
  servers: ServersMap;
  selectedServer: SelectedServer;
};

type ServerErrorDeps = {
  DeleteServerButton: FC<DeleteServerButtonProps>;
};

const ServerError: FCWithDeps<ServerErrorProps, ServerErrorDeps> = ({ servers, selectedServer }) => {
  const { DeleteServerButton } = useDependencies(ServerError);

  return (
    <NoMenuLayout>
      <div className="flex flex-col items-center gap-y-4 md:gap-y-8">
        <Message className="w-full lg:w-[80%]" variant="error">
          {!isServerWithId(selectedServer) && 'Bu ElleShoes sunucusu bulunamadı.'}
          {isServerWithId(selectedServer) && (
            <>
              <p>Hay aksi! Bu ElleShoes sunucusuna bağlanılamadı.</p>
              İnternet bağlantınızın olduğundan ve sunucunun düzgün yapılandırılmış ve çevrimiçi olduğundan emin
              olun.
            </>
          )}
        </Message>

        <p className="text-xl">
          Bunlar şu anda yapılandırılmış ElleShoes sunucularıdır. Bunlardan birini seçin
          veya <Link to="/server/create">yeni bir tane ekleyin</Link>.
        </p>
        <Card className="w-full max-w-100 overflow-hidden">
          <ServersListGroup borderless servers={Object.values(servers)} />
        </Card>

        {isServerWithId(selectedServer) && (
          <p className="text-xl">
            Alternatif olarak, bu sunucuyu yanlış yapılandırdığınızı düşünüyorsanız,{' '}
            <DeleteServerButton server={selectedServer}>
              kaldırabilir
            </DeleteServerButton>{' '}
            veya <Link to={`/server/${selectedServer.id}/edit?reconnect=true`}>düzenleyebilirsiniz</Link>.
          </p>
        )}
      </div>
    </NoMenuLayout>
  );
};

export const ServerErrorFactory = componentFactory(ServerError, ['DeleteServerButton']);
