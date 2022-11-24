import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, Image as ImageImpl } from '@react-three/drei'
import { ScrollControls, Scroll, useScroll } from '../components/ScrollControls/ScrollControls'
import '../styles/globals.css';
import styles from '../styles/Home.module.css'

function Image(props: any) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
  })
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  )
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 3 : 1 / 3
  return (
    <group {...props}>
      <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
      <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
    </group>
  )
}

function Pages() {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[0, 9, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} />
      <Page position={[-0, 0, 0]} urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']} />
      <Page position={[0, -6, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
      <Page position={[0, -14, 0]} urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']} />
      <Page position={[0, -23, 0]} urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']} />
      <Page position={[0, -29, 0]} urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
    </>
  )
}

export default function App() {
  return (
    <div className={styles.container}>

      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls infinite horizontal={false} damping={4} pages={4} distance={1}>
            <Scroll>
              <Pages />
            </Scroll>
            {/* <Scroll html>
              <h1 style={{ position: 'absolute', left: '20vh', top: '-75vw' }}>home</h1>
              <h1 style={{ position: 'absolute', left: '20vh', top: '25vw' }}>to</h1>
              <h1 style={{ position: 'absolute', left: '20vh', top: '125vw' }}>be</h1>
              <h1 style={{ position: 'absolute', left: '20vh', top: '225vw' }}>home</h1>
              <h1 style={{ position: 'absolute', left: '20vh', top: '325vw' }}>to</h1>
              <h1 style={{ position: 'absolute', left: '20vh', top: '425vw' }}>be</h1>
            </Scroll> */}
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  )
}
