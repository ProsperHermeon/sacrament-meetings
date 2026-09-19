// Admin (leader-facing) layout. Authentication is scaffolded in Week 05.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="mb-6 text-xs uppercase tracking-widest text-[var(--muted)]">
        Leader Administration
      </p>
      {children}
    </div>
  );
}
