import { IM } from "../data/images.js";

export default function ProductThumb({ p }) {
  const src = IM.p[p.cat];
  return src ? <img className="ti" src={src} alt="" /> : <div className="ti">{p.w}</div>;
}
