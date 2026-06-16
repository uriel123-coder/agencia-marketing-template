import "./index.css";
import { Composition } from "remotion";
import { KineticReel } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Kinetic Typography Reel: 1080x1920, 30fps, 30 segundos */}
      <Composition
        id="KineticReel"
        component={KineticReel}
        durationInFrames={630}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
