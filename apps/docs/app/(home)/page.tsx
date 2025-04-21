export const metadata = {
  title: 'DeDevs | Docs',
};

export default function HomePage() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center text-center"
    >
      <p className="text-sm">Read the <a href="/docs" className="underline">/docs</a></p>
    </main>
  );
}
