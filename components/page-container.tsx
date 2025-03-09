export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="[grid-area:body] p-2 overflow-y-auto">{children}</div>;
}
