import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Suzuri';
export const siteUrl = 'https://docs.suzuri.ai';
export const homeUrl = 'https://suzuri.ai';
export const docsRoute = '/';
export const docsImageRoute = '/og';
export const docsContentRoute = '/llms.mdx';

export const gitConfig = {
  user: 'harrywang',
  repo: 'suzuri',
  branch: 'main',
};

/** Where this docs site itself lives, for "edit this page" links. */
export const docsGitConfig = {
  user: 'harrywang',
  repo: 'suzuri-docs',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
