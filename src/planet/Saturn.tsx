import {Planet, PlanetProps} from "./Base";
import {Plane} from "@react-three/drei";
import {DoubleSide, MeshStandardMaterial} from "three";
import {JupiterShader} from "../shader/JupiterShader";
import {ExtendedMaterial} from "../shader/ExtendedMaterial.react";
import {SaturnRingShader} from "../shader/SaturnRingShader";


export const Saturn = (props: PlanetProps) => {
    return (
        <Planet color={'#b08f36'}
                distanceMin={1350} distanceMax={1350}
                weight={318}
                radius={58232}
                rings={true}
                cycle={29.5*365}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

                moons={[
                    <mesh position={[0,0,0]} scale={[5,5,1]} rotation={[Math.PI/3,0,1]}>
                        <planeBufferGeometry/>
                        <ExtendedMaterial superMaterial={MeshStandardMaterial}
                                          extensions={[SaturnRingShader]}
                                          options={{
                                              side: DoubleSide,
                                              color: [1.0,0.0,0.4],
                                              alphaTest : 0.7,
                                              transparent: true,
                                              receiveShadow: true,
                                              castShadow: true,
                                              depthWrite: false
                                          }}
                                          parameters={{side: DoubleSide, color: [1.0,0.0,0.4],   transparent: true,depthWrite: false}}
                        />
                    </mesh>
                ]}
        />
    );
};