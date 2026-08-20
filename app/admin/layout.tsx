export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Add authentication before deploying to production
  // For now, this is accessible to anyone
  
  return <>{children}</>
}