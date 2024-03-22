import * as THREE from 'three'
import {CSSProperties, useMemo, useRef} from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {extend, Canvas, useFrame, Object3DNode} from '@react-three/fiber'
import { easing } from 'maath'
import * as three from "three";
import {Vector3} from "three";

extend({ MeshLineGeometry, MeshLineMaterial })
declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}

export default function App_tmp() {

    const dash = 0.1;
    const count = 50;
    const radius = 10;
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
            <color attach="background" args={['#101020']} />
            <Lines dash={dash} count={count} radius={radius} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff']} />
        </Canvas>
    )
}

type LinesProps = {
    dash: number,
    count: number,
    colors: CSSProperties["color"][],
    radius: number,
    rand?: (range: number) => number,

}

type FatLineProps = {
    dash: number,
    speed: number,
    color: CSSProperties["color"],
    width: number,
    curve: number[]
}

function Lines({ dash, count, colors, radius = 50, rand = THREE.MathUtils.randFloatSpread }: LinesProps) {
    const lines = useMemo(() => {
        return Array.from({ length: count }, () => {
            const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius))
            const points = Array.from({ length: 10 }, () => pos.add(new THREE.Vector3(rand(radius), rand(radius), rand(radius))).clone())
            const curve = new THREE.CatmullRomCurve3(points).getPoints(300)
            return {
                color: colors[colors.length * Math.random() | 0],
                width: Math.max(radius / 100, (radius / 50) * Math.random()),
                speed: Math.max(0.1, 1 * Math.random()),
                curve: curve.flatMap((point) => point.toArray())
            }
        })
    }, [colors, count, radius])
    return <>
        {lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)}
    </>;
}

function Fatline({ curve, width, color, speed, dash }: FatLineProps) {
    const ref = useRef<three.Mesh<MeshLineGeometry,MeshLineMaterial>|null>(null)
    useFrame((state, delta) => (ref!.current!.material.dashOffset -= (delta * speed) / 10))
    return (
        <mesh ref={ref}>
            <meshLineGeometry points={curve} />
            <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25} dashRatio={dash} toneMapped={false} />
        </mesh>
    )
}

function Rig({ radius = 20 }) {
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, [Math.sin(state.pointer.x) * radius, Math.atan(state.pointer.y) * radius, Math.cos(state.pointer.x) * radius], 0.25, dt)
        state.camera.lookAt(0, 0, 0)
    })
}
