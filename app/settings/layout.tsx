import WithSidebarLayout from '@/components/WithSidebarLayout';

export default function SettingsLayout({
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