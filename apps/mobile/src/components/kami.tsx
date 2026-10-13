// Kami-sama en calques animés : ombre fixe, corps qui rebondit, yeux qui clignent, auréole qui flotte.
import {
  kamiArt,
  kamiEyesOrigin,
  kamiHaloStrokes,
  kamiViewBox,
  motion,
  type KamiShape,
} from '@tomodachi/design-tokens';
import { View } from 'react-native';
import Animated, { useReducedMotion } from 'react-native-reanimated';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

const vb = `${kamiViewBox.x} ${kamiViewBox.y} ${kamiViewBox.width} ${kamiViewBox.height}`;

function Shapes({ shapes }: { shapes: KamiShape[] }) {
  return (
    <>
      {shapes.map((s, i) => {
        const opacity = 'opacity' in s ? s.opacity : undefined;
        if (s.kind === 'path') return <Path key={i} d={s.d} fill={s.fill} opacity={opacity} />;
        if (s.kind === 'circle')
          return <Circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} />;
        return (
          <Ellipse
            key={i}
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill={s.fill}
            opacity={opacity}
            rotation={s.rotate}
            origin={s.rotate ? `${s.cx}, ${s.cy}` : undefined}
          />
        );
      })}
    </>
  );
}

function Layer({ children }: { children: React.ReactNode }) {
  return (
    <Svg viewBox={vb} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      <G>{children}</G>
    </Svg>
  );
}

export function KamiArt({ size, animated = true }: { size: number; animated?: boolean }) {
  const reduced = useReducedMotion();
  const live = animated && !reduced;
  const height = Math.round((size * kamiViewBox.height) / kamiViewBox.width);
  const fill = { position: 'absolute' as const, top: 0, left: 0, width: size, height };
  const loop = (duration: number) => ({
    animationDuration: duration,
    animationIterationCount: 'infinite' as const,
    animationTimingFunction: 'ease-in-out' as const,
  });
  return (
    <View style={{ width: size, height }}>
      <Layer>
        <Shapes shapes={kamiArt.shadow} />
      </Layer>
      <Animated.View
        style={[
          fill,
          { transformOrigin: 'bottom' },
          live && {
            animationName: {
              '0%': { transform: [{ translateY: 0 }, { scaleX: 1 }, { scaleY: 1 }] },
              '40%': {
                transform: [{ translateY: -height * 0.03 }, { scaleX: 0.98 }, { scaleY: 1.03 }],
              },
              '60%': { transform: [{ translateY: 0 }, { scaleX: 1.03 }, { scaleY: 0.97 }] },
              '100%': { transform: [{ translateY: 0 }, { scaleX: 1 }, { scaleY: 1 }] },
            },
            ...loop(motion.kamiBounce),
          },
        ]}
      >
        <Layer>
          <Shapes shapes={kamiArt.body} />
        </Layer>
        <Animated.View
          style={[
            fill,
            { transformOrigin: `${kamiEyesOrigin.x} ${kamiEyesOrigin.y}` },
            live && {
              animationName: {
                '0%': { transform: [{ scaleY: 1 }] },
                '92%': { transform: [{ scaleY: 1 }] },
                '95%': { transform: [{ scaleY: 0.1 }] },
                '100%': { transform: [{ scaleY: 1 }] },
              },
              ...loop(motion.kamiBlink),
            },
          ]}
        >
          <Layer>
            <Shapes shapes={kamiArt.eyes} />
          </Layer>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          fill,
          live && {
            animationName: {
              '0%': { transform: [{ translateY: 0 }] },
              '50%': { transform: [{ translateY: -height * 0.04 }] },
              '100%': { transform: [{ translateY: 0 }] },
            },
            ...loop(motion.kamiFloat),
          },
        ]}
      >
        <Layer>
          {kamiArt.halo.map((s, i) =>
            s.kind === 'ellipse' ? (
              <Ellipse
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
        </Layer>
      </Animated.View>
    </View>
  );
}
