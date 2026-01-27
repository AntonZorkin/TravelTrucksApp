type IconProps = {
    name: string;
    size?: number;
}

export default function Icon({name, size=32}:IconProps) {
    return (
    <svg width={size} height={size}>
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
)
}