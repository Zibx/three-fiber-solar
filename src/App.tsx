import React, {useMemo, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Box, OrbitControls, OrbitControlsProps} from "@react-three/drei";
import "./styles.css";
import {DoubleSide, Mesh, MeshStandardMaterial, Vector3} from "three";
import * as SkyObjects from './SkyObjects';

import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {FrameLimiter} from "./FrameLimiter";
import {Saturn} from "./SkyObjects";
import {Planet} from "./planet/Base";
import {ExtendedMaterial} from "./shader/ExtendedMaterial.react";
import {SaturnRingShader} from "./shader/SaturnRingShader";

const Scene = () => {
    let vec = new Vector3().randomDirection().multiplyScalar(0.001);
    const scene = useRef<THREE.Group>(null);


    FrameLimiter({fps: 20});
    // @ts-ignore
    const orbitRef = useRef<OrbitControls|null>(null);

    useFrame(() => {
        const acc = new Vector3().randomDirection().multiplyScalar(0.001);
        //@ts-ignore

        if(cameraTarget){
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

    const objects = useMemo<React.Component[]>(()=>{
        const objects: React.Component[] = [];
        for(let key in SkyObjects){
            //@ts-ignore
            objects.push(React.createElement(SkyObjects[key], {key, name: key, setCameraTarget: setCameraTarget}));
        }
        return objects;
    }, []);

    /*
    ,
                                  <mesh position={[1,0,0]} scale={[5,5,1]} rotation={[Math.PI/3,0,1]}>
                                      <planeGeometry />
                                      <meshStandardMaterial side={DoubleSide} color={[1.0,0.0,0.4]} opacity={0.5} transparent={true} alphaTest={0.5}/>
                                  </mesh>
     */



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
