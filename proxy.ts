import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute } from '@/lib/shared';

// Docs live at the site root, so the rewrite patterns are rooted too. A
// leading '/' would not match (path-to-regexp treats it as a literal segment),
// hence the empty prefix.
const { rewrite: rewriteDocs } = rewritePath(
  '{/*path}',
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  '{/*path}.md',
  `${docsContentRoute}{/*path}/content.md`,
);

// Because the patterns above are rooted, they would otherwise swallow every
// non-docs route. Anything served by its own route handler is off limits.
const RESERVED = ['/api', '/og', '/llms.txt', '/llms-full.txt', docsContentRoute];

function isReserved(pathname: string) {
  return RESERVED.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isReserved(pathname)) return NextResponse.next();

  const result = rewriteSuffix(pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}
