import React, {Ref, useMemo, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Box, OrbitControls, OrbitControlsProps} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import "./styles.css";
import {DoubleSide, Mesh, MeshStandardMaterial, Vector3} from "three";
import * as SkyObjects from './SkyObjects';

import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {FrameLimiter} from "./FrameLimiter";
import {Saturn} from "./SkyObjects";
import {Planet, SkyObjectProps} from "./planet/Base";
import {ExtendedMaterial} from "./shader/ExtendedMaterial.react";
import {SaturnRingShader} from "./shader/SaturnRingShader";
import {ForwardProps} from "@react-spring/three";

type Orbitar = {
    target: Vector3
}
const Scene = () => {
    let vec = new Vector3().randomDirection().multiplyScalar(0.001);
    const scene = useRef<THREE.Group>(null);


    FrameLimiter({fps: 20});
    const orbitRef = useRef<OrbitControlsImpl>(null);

    useFrame(() => {
        const acc = new Vector3().randomDirection().multiplyScalar(0.001);

        if(cameraTarget && orbitRef.current){
            orbitRef.current.target = orbitRef.current.target.lerp(cameraTarget.position,0.05);
        }else{

        }
        vec = vec.add(acc);
/*        if (scene.current) {
            scene.current.rotateX(0.01);
            scene.current.rotateZ(0.01);
        }*/
    });

    const [cameraTarget, setCameraTarget] = useState<Mesh|null>();

    const objects = useMemo<React.ReactNode[]>(()=>{
        const objects: React.ReactNode[] = [];
        Object.keys(SkyObjects)
            .forEach(key =>{
                const Ctor = SkyObjects[key as keyof typeof SkyObjects];
                const skyObject = <Ctor key={key} name={key} setCameraTarget={setCameraTarget}/>
                objects.push(skyObject);
            });

        return objects;
    }, []);

    return (
        <>
            {/*<hemisphereLight intensity={1.5} position={[0,0,0]} castShadow={true}/>*/}
            <pointLight intensity={1.5} position={[0,0,0]} castShadow={true} shadow-mapSize={[1024,1024]}>
            </pointLight>
            {/*<directionalLight intensity={1} position={[0,0.1,0]} isDirectionalLight={true} />*/}
            {/*<spotLight intensity={1.5} position={[0,0,2]} castShadow={true}/>
            <spotLight intensity={1.5} position={[0,0,-2]} castShadow={true} angle={180}/>*/}
            {objects}
            <OrbitControls ref={orbitRef}/>
        </>
    );
};

export default function App(): JSX.Element {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 90 }} shadows={true}>
            <Scene />
            <EffectComposer>
                <Bloom mipmapBlur luminanceThreshold={0.18} radius={0.9} />
            </EffectComposer>
        </Canvas>
    );
}
