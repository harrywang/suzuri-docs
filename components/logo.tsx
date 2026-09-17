/**
 * The Suzuri mark: an inkstone pebble with its well cut out as negative space.
 * `currentColor` lets it follow the surrounding text color in both themes.
 */
export function SuzuriLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Suzuri"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M30 7.5C41.5 7.5 50.5 16.5 53.5 27.5C56 36 55.5 45.5 48.5 51C42.5 55.8 32 57 22.5 55.2C13.5 53.4 7.5 46.5 7.5 36.5C7.5 25.5 11.5 15 19.5 10.3C23 8.2 26.5 7.5 30 7.5ZM35 19.8C40.8 19.8 45.3 24.2 45.3 29.8C45.3 35.6 40.6 40.4 34.8 40.2C29.3 40 24.9 35.5 25 30C25.1 24.4 29.2 19.8 35 19.8Z"
      />
    </svg>
  );
}
