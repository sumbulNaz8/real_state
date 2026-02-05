import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function BookingsLayout({
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