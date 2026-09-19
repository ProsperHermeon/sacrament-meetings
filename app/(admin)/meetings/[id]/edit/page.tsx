export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">
        Edit Meeting — Coming in Week 04
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        The form for editing meeting #{id} will be implemented next week.
      </p>
    </div>
  );
}
