import { ThemeSelector } from '@askargus/client';
import { TStartupConfig } from 'askargus-data-provider';
import { ErrorMessage } from '~/components/Auth/ErrorMessage';
import { TranslationKeys, useLocalize } from '~/hooks';
import SocialLoginRender from './SocialLoginRender';
import { BlinkAnimation } from './BlinkAnimation';
import { Banner } from '../Banners';
import Footer from './Footer';

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: TranslationKeys | null;
}) {
  const localize = useLocalize();

  const hasStartupConfigError = startupConfigError !== null && startupConfigError !== undefined;
  const DisplayError = () => {
    if (hasStartupConfigError) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize('com_auth_error_login_server')}</ErrorMessage>
        </div>
      );
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>
            {localize('com_auth_error_invalid_reset_token')}{' '}
            <a className="font-semibold text-green-600 hover:underline" href="/forgot-password">
              {localize('com_auth_click_here')}
            </a>{' '}
            {localize('com_auth_to_try_again')}
          </ErrorMessage>
        </div>
      );
    } else if (error != null && error) {
      return (
        <div className="mx-auto sm:max-w-sm">
          <ErrorMessage>{localize(error)}</ErrorMessage>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Banner />
      <div className="flex min-h-screen flex-1">
        {/* Left Brand Panel - 40% */}
        <div className="brand-panel-gradient hidden w-[40%] flex-col items-center justify-center md:flex">
          <div className="flex flex-col items-center gap-6 text-white">
            <img
              src="assets/logo.svg"
              className="h-24 w-auto object-contain"
              alt={localize('com_ui_logo', { 0: startupConfig?.appTitle ?? 'AskArgus' })}
            />
            <h2 className="text-2xl font-bold tracking-tight">
              {startupConfig?.appTitle ?? 'AskArgus'}
            </h2>
            <p className="text-center text-white/80">
              {localize('com_auth_welcome')}
            </p>
          </div>
        </div>

        {/* Right Form Panel - 60% */}
        <div className="flex w-full flex-1 flex-col items-center justify-center bg-gray-50 px-6 py-4 dark:bg-gray-950 md:w-[60%]">
          <BlinkAnimation active={isFetching}>
            <div className="mb-6 h-10 w-full md:hidden bg-cover">
              <img
                src="assets/logo.svg"
                className="h-full w-full object-contain"
                alt={localize('com_ui_logo', { 0: startupConfig?.appTitle ?? 'AskArgus' })}
              />
            </div>
          </BlinkAnimation>

          <DisplayError />

          <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-8 shadow-lg dark:bg-gray-900/50">
            {!hasStartupConfigError && !isFetching && header && (
              <h1
                className="mb-4 text-center text-2xl font-bold tracking-tight text-black dark:text-white"
                style={{ userSelect: 'none' }}
              >
                {header}
              </h1>
            )}
            {children}
            {!pathname.includes('2fa') &&
              (pathname.includes('login') || pathname.includes('register')) && (
                <SocialLoginRender startupConfig={startupConfig} />
              )}
          </div>

          <div className="absolute bottom-0 left-0 md:m-4">
            <ThemeSelector />
          </div>

          <Footer startupConfig={startupConfig} />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
