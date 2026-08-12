import Link from 'next/link';

const THUMBTACK_URL =
  'https://www.thumbtack.com/nc/burlington/garage-doors/top-notch-garage-doors/service/517176114416656385';

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#FF8C00"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ThumbtackWordmark() {
  return (
    <svg
      width="120"
      height="24"
      viewBox="0 0 120 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Thumbtack"
      role="img"
    >
      <g fill="#009FD9">
        <circle cx="8" cy="5" r="5" />
        <rect x="5.5" y="11" width="5" height="13" rx="2.5" />
      </g>
      <text
        x="18"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="currentColor"
        className="text-foreground/80"
      >
        Thumbtack
      </text>
    </svg>
  );
}

export default function ThumbtackBadge() {
  return (
    <Link
      href={THUMBTACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 bg-white dark:bg-white/10 border border-brand-silver/30 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow group"
      aria-label="Top-Notch Garage Doors on Thumbtack — 5.0 stars, 7 reviews"
    >
      <ThumbtackWordmark />
      <div className="flex flex-col items-start gap-1">
        <span className="font-display text-sm text-brand-blue uppercase tracking-wide group-hover:text-brand-red transition-colors">
          Top-Notch Garage Doors
        </span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-hidden="true">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <span className="text-sm font-semibold text-foreground/70">5.0</span>
          <span className="text-sm text-foreground/50">&middot;</span>
          <span className="text-sm text-foreground/50">7 reviews</span>
        </div>
      </div>
    </Link>
  );
}
