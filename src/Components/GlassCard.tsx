// import React, { PropsWithChildren } from 'react';
// import { View, StyleSheet, Platform } from 'react-native';
// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';

// export default function GlassCard({ children, style }: PropsWithChildren<{style?: any}>) {
//   return (
//     <View style={[styles.wrapper, style]}>
//       {/* Blur layer: card-only */}
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType={Platform.OS === 'ios' ? 'light' : 'light'}
//         blurAmount={6}              // iOS strength
//         blurRadius={6}              // Android strength
//         reducedTransparencyFallbackColor="rgba(255,255,255,0.12)"
//       />

//       {/* Tint (very light so background doesn’t “fade out”) */}
//       <View style={styles.tint} />

//       {/* Shine / soft bevel */}
//       <LinearGradient
//         pointerEvents="none"
//         colors={['rgba(255,255,255,0.35)','rgba(255,255,255,0.04)']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* Inner highlight border */}
//       <View style={styles.innerBorder} />

//       {children}
//     </View>
//   );
// }

// const RADIUS = 33;

// const styles = StyleSheet.create({
//   wrapper: {
//     borderRadius: RADIUS,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255,255,255,0.07)', // keep background visible
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.18)',
//     // soft outer shadow
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     shadowOffset: { width: 0, height: 16 },
//     elevation: 8,
//   },
//   tint: {
//     ...StyleSheet.absoluteFillObject,
//     // slight greenish tint like your mock, very subtle
//     backgroundColor: 'rgba(33, 74, 40, 0.10)',
//   },
//   innerBorder: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0, bottom: 0,
//     borderRadius: RADIUS,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.22)',
//   },
// });


import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

export default function GlassCard({ children, style }: PropsWithChildren<{style?: any}>) {
  return (
    <View style={[styles.wrapper, style]}>
      {Platform.OS === "ios" ? (
        // iOS glass look (with blur)
        <View style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['rgba(46,72,30,0.7)', 'rgba(46,72,30,0.85)']}
            style={StyleSheet.absoluteFill}
          />
        </View>
      ) : (
        // Android fallback (no heavy blur, more tint)
        <LinearGradient
          colors={['rgba(46,72,30,0.85)', 'rgba(46,72,30,0.95)']}
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={styles.innerBorder} />
      {children}
    </View>
  );
}

const RADIUS = 33;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(46,72,30,0.8)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
});
