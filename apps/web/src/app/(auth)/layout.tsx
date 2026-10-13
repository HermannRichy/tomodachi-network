// Onboarding et connexion : une colonne centrée, comme sur mobile.
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">{children}</div>;
}
