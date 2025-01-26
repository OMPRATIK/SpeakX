export default function Header() {
  return (
    <header className="space-y-1 mb-4 sm:mb-7">
      <div className="flex justify-center items-center gap-3 animate-pulse">
        <h1 className="text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-4xl sm:text-5xl font-semibold">
          Search Questions
        </h1>
      </div>
      <p className="text-neutral-400 text-center text-sm sm:text-base">
        Search questions easily and filter by type for quick and precise
        results.
      </p>
    </header>
  );
}
