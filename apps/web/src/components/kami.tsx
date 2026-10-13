// Kami-sama en SVG, découpé en calques animés (rebond, clignement, auréole qui flotte).
import { kamiArt, kamiHaloStrokes, kamiViewBox, type KamiShape } from '@tomodachi/design-tokens';

function Shape({ s, i }: { s: KamiShape; i: number }) {
  const opacity = 'opacity' in s ? s.opacity : undefined;
  if (s.kind === 'path') return <path key={i} d={s.d} fill={s.fill} opacity={opacity} />;
  if (s.kind === 'circle') return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} />;
  return (
    <ellipse
      key={i}
      cx={s.cx}
      cy={s.cy}
      rx={s.rx}
      ry={s.ry}
      fill={s.fill}
      opacity={opacity}
      transform={s.rotate ? `rotate(${s.rotate} ${s.cx} ${s.cy})` : undefined}
    />
  );
}

export function KamiSvg({
  size,
  alt = '',
  animated = true,
  className,
}: {
  size: number;
  alt?: string;
  animated?: boolean;
  className?: string;
}) {
  const v = kamiViewBox;
  return (
    <svg
      viewBox={`${v.x} ${v.y} ${v.width} ${v.height}`}
      width={size}
      height={Math.round((size * v.height) / v.width)}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={[animated ? '' : 'kami-still', 'shrink-0 overflow-visible', className]
        .filter(Boolean)
        .join(' ')}
    >
      {kamiArt.shadow.map((s, i) => (
        <Shape key={i} s={s} i={i} />
      ))}
      <g className="kami-body">
        {kamiArt.body.map((s, i) => (
          <Shape key={i} s={s} i={i} />
        ))}
        <g className="kami-eyes">
          {kamiArt.eyes.map((s, i) => (
            <Shape key={i} s={s} i={i} />
          ))}
        </g>
      </g>
      <g className="kami-halo">
        {kamiArt.halo.map((s, i) =>
          s.kind === 'ellipse' ? (
            <ellipse
              key={i}
              cx={s.cx}
              cy={s.cy}
              rx={s.rx}
              ry={s.ry}
              fill="none"
              stroke={kamiHaloStrokes[i]!.stroke}
              strokeWidth={kamiHaloStrokes[i]!.width}
            />
          ) : null,
        )}
      </g>
    </svg>
  );
}
