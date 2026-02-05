import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function CustomersLayout({
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