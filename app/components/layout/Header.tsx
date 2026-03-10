type Props = {
  dark: boolean;
  toggleDark: () => void;
};

export default function Header({ dark, toggleDark }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          🧠 AI Notes
        </h1>
        <p className="text-sm text-gray-500">
          Capture ideas and summarize them with AI
        </p>
      </div>

      <button
        onClick={toggleDark}
        className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}
