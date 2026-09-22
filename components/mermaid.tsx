'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

// The site palette from app/global.css, handed to Mermaid's `base` theme so
// diagrams read as part of the docs rather than Mermaid's stock purple.
const themeVariables = {
  light: {
    background: '#faf9f7',
    primaryColor: '#f6e9e4',
    primaryTextColor: '#1a1a1a',
    primaryBorderColor: '#c0472b',
    secondaryColor: '#e9efec',
    secondaryBorderColor: '#2d6a5a',
    tertiaryColor: '#eceef6',
    tertiaryBorderColor: '#4a5fa5',
    lineColor: '#5c5652',
    textColor: '#1a1a1a',
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  },
  dark: {
    background: '#131211',
    primaryColor: '#3a2620',
    primaryTextColor: '#ece8e1',
    primaryBorderColor: '#e07a5f',
    secondaryColor: '#1f3029',
    secondaryBorderColor: '#5fa88f',
    tertiaryColor: '#232838',
    tertiaryBorderColor: '#8a9bd8',
    lineColor: '#a39c93',
    textColor: '#ece8e1',
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  },
};

export function Mermaid({ chart }: { chart: string }) {
  // Mermaid uses the id as an SVG element id and inside CSS selectors, and
  // React's `useId` output contains characters that are invalid there.
  const id = `mermaid-${useId().replace(/\W/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    async function render() {
      const { default: mermaid } = await import('mermaid');
      const dark = resolvedTheme === 'dark';
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: dark ? themeVariables.dark : themeVariables.light,
        });
        const { svg, bindFunctions } = await mermaid.render(id, chart);
        if (cancelled || !container) return;
        container.innerHTML = svg;
        bindFunctions?.(container);
        setError(null);
      } catch (cause) {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="my-6 rounded-lg border border-fd-border bg-fd-secondary p-4 text-sm text-fd-muted-foreground">
        Mermaid could not render this diagram: {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      aria-label="Mermaid diagram"
    />
  );
}
