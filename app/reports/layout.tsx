import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithSidebarLayout>
      {children}
    </WithSidebarLayout>
  );
}