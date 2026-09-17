import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SuzuriLogo } from '@/components/logo';
import { appName, gitConfig, homeUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <SuzuriLogo className="size-5" />
          <span className="font-medium">{appName}</span>
        </>
      ),
      url: homeUrl,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
