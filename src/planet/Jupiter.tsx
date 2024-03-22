import {Planet, PlanetProps, SkyObjectProps} from "./Base";
import {useMemo} from "react";
import {MeshStandardMaterial, Vector2} from "three";
import { ExtendedMaterial } from "../shader/ExtendedMaterial.react";
import {extend, Object3DNode} from "@react-three/fiber";
import {Checkerboard} from "../shader/Checkerboard";
import {JupiterShader} from "../shader/JupiterShader";

export const Jupiter = (props: SkyObjectProps) => {
    return (
        <Planet color={'#e1a27a'}
                distanceMin={740} distanceMax={816}
                weight={318}
                radius={69911}
                rings={true}
                cycle={12*365}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

                material={<ExtendedMaterial superMaterial={MeshStandardMaterial}
                                            extensions={[JupiterShader]}

                /> }
        />
    );
};