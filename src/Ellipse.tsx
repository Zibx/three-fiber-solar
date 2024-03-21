import React, {CSSProperties, useEffect, useMemo, useRef, useState} from 'react';

import * as THREE from "three";

import {extend, useFrame, Object3DNode} from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {EllipseCurve} from "three";

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}

type EllipseProps = {
    min: number,
    max: number,
    color: CSSProperties["color"],

};

export const Ellipse = function({min, max, color}: EllipseProps) {

    // geometry

    //const ref = useRef<THREE.Mesh|null>(null)

    const points3D = useMemo(() => {
        const curve = new EllipseCurve(
            0, 0, // xCenter, yCenter
            min, max, // xRadius, yRadius
            0, 2 * Math.PI, // aStartAngle, aEndAngle
            false, // aClockwise
            0 // aRotation
        );

        const points: THREE.Vector2[] = curve.getPoints(1000);
        const points3D = points.map((point) => new THREE.Vector3(point.x,0,  point.y));
        var out: number[] = [];
        points3D.forEach(a=> out.push(a.x, a.y, a.z))
        var a = points3D[0];

        return out;
    }, [min, max])

    useFrame((state) => {
/*        if(ref.current){
            const curve = new EllipseCurve(
                0, 0, // xCenter, yCenter
                props.min, props.max, // xRadius, yRadius
                0, 2 * Math.PI, // aStartAngle, aEndAngle
                false, // aClockwise
                0 // aRotation
            );

            const points: THREE.Vector2[] = curve.getPoints( 50 );

            ref.current.geometry.setFromPoints(points.map((point) => new THREE.Vector3(point.x, point.y, 0)));
        }*/
    })
    return (
        <mesh>
            <meshLineGeometry points={points3D} />
            <meshLineMaterial transparent lineWidth={min/1000} color={color} depthWrite={true} dashArray={0} dashRatio={0.5} toneMapped={false} />
        </mesh>
    );
}
/*
function Fatline({ curve, width, color, speed, dash }) {
    const ref = useRef<THREE.Mesh|null>(null)
    useFrame((state, delta) => (ref!.current!.material.dashOffset -= (delta * speed) / 10))
    return (
        <mesh ref={ref}>
            <meshLineGeometry points={curve} />
            <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25} dashRatio={dash} toneMapped={false} />
        </mesh>
    )
}*/
