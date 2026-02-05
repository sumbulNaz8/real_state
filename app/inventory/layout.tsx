import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function InventoryLayout({
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