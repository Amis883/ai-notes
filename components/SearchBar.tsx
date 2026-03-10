type Props = {
  search: string;
  setSearch: (v: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl mb-6 text-sm outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
