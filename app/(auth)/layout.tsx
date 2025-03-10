export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <main className="flex-grow mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
