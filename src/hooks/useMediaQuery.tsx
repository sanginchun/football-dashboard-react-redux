import { useState, useEffect } from "react";

type Props = {
  query: string;
};

export function useMediaQuery({ query }: Props) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleWindowResize = () => {
      if (matches !== media.matches) setMatches(media.matches);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [matches, query]);

  return matches;
}
