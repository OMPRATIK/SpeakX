export default function Error({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center h-full text-lg gap-2 opacity-75">
      <p className="text-xl">{error}</p>
    </div>
  );
}
