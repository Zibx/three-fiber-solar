import React, {CSSProperties, useEffect, useMemo, useRef, useState} from 'react';

import * as THREE from "three";

import {extend, useFrame, Object3DNode} from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {EllipseCurve} from "three";
import * as three from "three";

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}

export const Stars = function() {

    return (
        <Lines dash={0.994} count={500} radius={50} colors={['#be91f8', '#f5df89', '#d3f69f', '#b5f4f8']} />
    );
}

type LinesProps = {
    dash: number,
    count: number,
    colors: CSSProperties["color"][],
    radius: number,
    rand?: (range: number) => number,

}
function Lines({ dash, count, colors, radius = 50, rand = THREE.MathUtils.randFloatSpread }: LinesProps) {
    const lines = useMemo(() => {
        return Array.from({ length: count }, () => {
            const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius))
            const randomNumber1 = rand(radius)
            const randomNumber2 = rand(radius)
            const points = Array.from({ length: 10 }, () => pos.add(new THREE.Vector3(Math.sin(randomNumber1)*radius, Math.cos(randomNumber1)*Math.sin(randomNumber2)*radius, Math.cos(randomNumber2)*radius)).clone())
            const curve = new THREE.CatmullRomCurve3(points).getPoints(5)
            return {
                color: colors[colors.length * Math.random() | 0],
                width: 1,
                speed: Math.max(0.1, 1 * Math.random()),
                curve: curve.flatMap((point) => point.toArray())
            }
        })
    }, [colors, count, radius])
    return <>
        {lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)}
    </>;
}

type FatLineProps = {
    dash: number,
    speed: number,
    color: CSSProperties["color"],
    width: number,
    curve: number[]
}
function Fatline({ curve, width, color, speed, dash }: FatLineProps) {
    const ref = useRef<three.Mesh|null>(null)
    useFrame((state, delta) => {
        ((ref!.current!.material as MeshLineMaterial).dashOffset -= (delta * speed) / 100000000)
    })
    return (
        <mesh ref={ref}>
            <meshLineGeometry points={curve} />
            <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25} dashRatio={dash} toneMapped={false} />
        </mesh>
    )
}
