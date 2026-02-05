import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function CalendarLayout({
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