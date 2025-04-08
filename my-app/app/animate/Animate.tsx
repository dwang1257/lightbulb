import './Animate.scss';

interface AnimateProps {
  letterClass: string;
  strArray: string[];
  index: number;
}

const Animate: React.FC<AnimateProps> = ({ letterClass, strArray, index = 0 }) => {
  return (
    <span>
      {strArray.map((char, i) => (
        <span key={`${char}${i}`} className={`${letterClass} _${i + index}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default Animate;