export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--paper)] print:hidden">
      <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-[var(--muted)]">
        <p>Riverside Ward — Sacrament Meeting Planner</p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} Riverside Ward. For planning use by ward leadership.
        </p>
      </div>
    </footer>
  );
}
