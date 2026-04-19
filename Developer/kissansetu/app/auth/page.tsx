import AuthClient from "./page-client";

type AuthPageProps = {
  searchParams?: Promise<{
    role?: string | string[];
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const roleParam = Array.isArray(resolvedSearchParams.role)
    ? resolvedSearchParams.role[0]
    : resolvedSearchParams.role;

  return <AuthClient initialRole={roleParam === "buyer" ? "buyer" : "farmer"} />;
}

