import { TetrominoType } from "./tetrominoes";
import I from "@/assets/images/I.png";
import O from "@/assets/images/O.png";
import T from "@/assets/images/T.png";
import S from "@/assets/images/S.png";
import Z from "@/assets/images/Z.png";
import J from "@/assets/images/J.png";
import L from "@/assets/images/L.png";

export const getBlockImages = (type: TetrominoType) => {
  switch (type) {
    case "I":
      return <img src={I} alt="I" />;
    case "O":
      return <img src={O} alt="O" />;
    case "T":
      return <img src={T} alt="T" />;
    case "S":
      return <img src={S} alt="S" />;
    case "Z":
      return <img src={Z} alt="Z" />;
    case "J":
      return <img src={J} alt="J" />;
    case "L":
      return <img src={L} alt="L" />;
  }
};
