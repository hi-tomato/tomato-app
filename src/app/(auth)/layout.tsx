// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
