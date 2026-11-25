import { useEffect, useState } from "react";

const WORDS = ["mascota", "perro", "gato", "mejor amigo"];
const WORD_MS = 2600;

// The italic word in the headline changes, so the banner has movement without a moving picture.
// With reduced motion the word still changes, only the slide-in effect is dropped (see home.css).
const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), WORD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <em key={WORDS[index]} className="hero-word inline-block font-normal italic">
      {WORDS[index]}
    </em>
  );
};

export default RotatingWord;
