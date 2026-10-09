/* eslint-disable @next/next/no-img-element */
type AvatarProps = {
  name: string;
  src: string | null;
  size?: number;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name, src, size = 36 }: AvatarProps) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) };
  if (src) {
    return <img className="avatar" style={style} src={src} alt="" draggable={false} />;
  }
  return (
    <span className="avatar avatar-fallback" style={style} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
