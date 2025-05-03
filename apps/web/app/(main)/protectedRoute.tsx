import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const ProtectedRoute: React.FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/auth/login'); // Redirect if not authenticated
  }, [session, status, router]);

  if (!session) return null; // Render nothing if not authenticated

  return <>{children}</>;
};

export default ProtectedRoute;
