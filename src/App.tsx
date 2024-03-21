import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Box, OrbitControls} from "@react-three/drei";
import "./styles.css";
import { Vector3 } from "three";
import * as SkyObjects from './SkyObjects';

import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {Neptune} from "./planet/Neptune";
import {Uranus} from "./planet/Uranus";
import {Pluto} from "./planet/Pluto";
import {Stars} from "./Stars";
import {FrameLimiter} from "./FrameLimiter";

const Scene = () => {
    let vec = new Vector3().randomDirection().multiplyScalar(0.001);
    const scene = useRef<THREE.Group>(null);

    FrameLimiter({fps: 20});


    useFrame(() => {
        const acc = new Vector3().randomDirection().multiplyScalar(0.001);
        vec = vec.add(acc);
/*        if (scene.current) {
            scene.current.rotateX(0.01);
            scene.current.rotateZ(0.01);
        }*/
    });

    const objects = [];

    for(let key in SkyObjects){
        //@ts-ignore
        objects.push(React.createElement(SkyObjects[key], {key, name: key}));
    }


    return (
        <>
            {/*<hemisphereLight intensity={1.5} position={[0,0,0]} castShadow={true}/>*/}
            <pointLight intensity={1.5} position={[0,0,0]} castShadow={true} shadow-mapSize={[1024,1024]}>
            </pointLight>
            {/*<directionalLight intensity={1} position={[0,0.1,0]} isDirectionalLight={true} />*/}
            {/*<spotLight intensity={1.5} position={[0,0,2]} castShadow={true}/>
            <spotLight intensity={1.5} position={[0,0,-2]} castShadow={true} angle={180}/>*/}
            {objects}
            <OrbitControls />
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
