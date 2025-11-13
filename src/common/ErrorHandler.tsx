import { Button } from '@shlinkio/shlink-frontend-kit';
import type { PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';
import { ErrorLayout } from './ErrorLayout';

type ErrorHandlerProps = PropsWithChildren<{
  location?: typeof window.location;
  console?: typeof window.console;
}>;

type ErrorHandlerState = {
  hasError: boolean;
};

export class ErrorHandler extends Component<ErrorHandlerProps, ErrorHandlerState> {
  public constructor(props: ErrorHandlerProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorHandlerState {
    return { hasError: true };
  }

  public componentDidCatch(e: Error): void {
    const { console = globalThis.console } = this.props;
    console.error(e);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { location = globalThis.location } = this.props;

    if (hasError) {
      return (
        <ErrorLayout title="Hay aksi! Bir şeyler ters gitti :(">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Bir sorun oluştu. Sayfayı yenilemeyi deneyin veya bu butona tıklayın.
          </p>
          <br />
          <Button size="lg" onClick={() => location.reload()} className="rounded-xl px-8 py-3 shadow-subtle-md hover:shadow-subtle-lg transition-all">
            Geri Dön
          </Button>
        </ErrorLayout>
      );
    }

    const { children } = this.props;
    return children;
  }
}
