import { AuthForm } from "@/components/AuthForm";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <section className="page">
      <div className="content-shell">
        <div className="section-heading">
          <span className="eyebrow">Quick access</span>
          <h1>Login or signup in one step</h1>
          <p>No password required for this MVP. Just share your details and pick your role.</p>
        </div>
        <AuthForm presetRole={resolvedSearchParams.role} />
      </div>
    </section>
  );
}
