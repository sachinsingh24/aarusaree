/** Decorative zari-style divider: a thin gold rule with a woven diamond knot. */
export default function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} width="132" height="14" viewBox="0 0 132 14" aria-hidden="true" focusable="false">
      <path d="M0 7h50M82 7h50" stroke="currentColor" strokeWidth="1" />
      <path d="M66 1l6 6-6 6-6-6 6-6Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M66 4.5 68.5 7 66 9.5 63.5 7 66 4.5Z" fill="currentColor" />
      <circle cx="55" cy="7" r="1.6" fill="currentColor" />
      <circle cx="77" cy="7" r="1.6" fill="currentColor" />
    </svg>
  );
}
