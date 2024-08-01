// src/pages/404.tsx
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => router.push('/')}>Go to Home</button>
    </div>
  );
};

export default Custom404;
