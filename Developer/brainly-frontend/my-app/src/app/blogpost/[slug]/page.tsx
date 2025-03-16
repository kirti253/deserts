export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <input
        type="text"
        defaultValue={slug}
        className="bg-amber-200 text-black "
      />
    </div>
  );
}
