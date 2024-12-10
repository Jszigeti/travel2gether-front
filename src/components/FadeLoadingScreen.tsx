import { useEffect, useState } from "react";

interface FadeLoadingScreenProps {
  isLoading: boolean;
}

const FadeLoadingScreen: React.FC<FadeLoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [lauchAnimation, setLaunchAnimation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLaunchAnimation(true);
      const timeout = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timeout);
    }
    setShouldRender(true);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000 ${
        !lauchAnimation ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img src="/src/assets/logo/logo.svg" />
    </div>
  );
};

export default FadeLoadingScreen;
