import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function PaymentsLayout({
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