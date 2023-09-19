import { useEffect } from 'react';

const SafaryClubScript = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script');
      script.src = 'https://tag.safary.club/stag.js?id=prd_3F8QxipEOt';
      script.async = true;
      document.head.appendChild(script);

      // Cleanup on component unmount
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return null;
};

export default SafaryClubScript;
