'use client';

export default function PrintButton() {
  return (
    <div className="text-center print:hidden">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded font-display text-sm uppercase hover:bg-brand-blue/90 transition-colors"
      >
        Print All Coupons
      </button>
      <p className="text-xs text-foreground/40 mt-2">Standard 8.5&quot; &times; 3.5&quot; cut-out size &mdash; 3 per page</p>
    </div>
  );
}
