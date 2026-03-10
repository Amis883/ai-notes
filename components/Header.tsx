type Props = {
  dark: boolean;
  toggleDark: () => void;
};

export default function Header({ dark, toggleDark }: Props) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">🧠 AI Notes</h1>

      <button onClick={toggleDark} className="mb-4 px-3 py-1 border rounded">
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
}
