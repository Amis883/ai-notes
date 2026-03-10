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
      className="w-full border p-2 rounded mb-4"
    />
  );
}
