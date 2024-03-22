import {JSX, useRef, useState} from "react";
import * as three from "three";
import {ExtendedColors, NodeProps, Object3DNode, Overwrite, useFrame} from "@react-three/fiber";
import { CSSProperties } from "react";
import {Ellipse} from "../Ellipse";
import {Mesh, ShaderMaterial} from "three";
import {animated, useSpring} from "@react-spring/three";

export type SkyObjectProps = {
    name?: string,
    setCameraTarget?: (target: three.Mesh|null|undefined) => void,
    key?: string
};
export type PlanetProps = {
    weight?: number,
    radius: number,
    distanceMin: number,
    distanceMax: number,
    cycle: number,
    color?: CSSProperties["color"],
    emissive?: CSSProperties["color"],
    rings?: boolean,
    moons?: JSX.Element[],
    noOrbit?: boolean,
    noShadow?: boolean,
    name?: string,
    material?: JSX.Element,
    interactive? :boolean,
    setCameraTarget?: (target: three.Mesh|null|undefined) => void,
    key?: string
};
export const Planet = function(cfg: PlanetProps){
    const sphere = useRef<three.Mesh|null>(null);
    useFrame((state, delta) => {
        let time = state.clock.getElapsedTime();
        var d = +new Date()/40000;
        var yearLength = cfg.cycle / 365;
        //sphere!.current!.rotation.x += 0.01;
        //sphere!.current!.rotation.y += 0.01;
        sphere.current!.position.x = cfg.distanceMin/30*Math.cos(d/yearLength);
        sphere.current!.position.z = cfg.distanceMax/30*Math.sin(d/yearLength);
        if(cfg.material) {
            (sphere!.current!.material! as ShaderMaterial).uniforms.iTime.value = time + 20;
        }
    });
    const [active, setActive] = useState(false);
    const { scale } = useSpring({ scale: active ? 1.5 : 1 })


    return (<><animated.mesh scale={scale} ref={sphere} position={[cfg.distanceMin/30,0,0]} onClick={(e)=>{
        if(cfg.interactive !== false) {
            console.log(cfg.name)
            cfg.setCameraTarget && cfg.setCameraTarget(sphere.current)
        }
    }}
                             onPointerEnter={()=>cfg.interactive !== false  && setActive(true)}
                             onPointerLeave={()=>cfg.interactive !== false && setActive(false)}
                  castShadow={cfg.noShadow?false:true} receiveShadow={cfg.noShadow?false:true}>
                <sphereBufferGeometry args={[cfg.radius**0.65/1500, 32*2, 16*2]} />
                {cfg.material?cfg.material:<meshStandardMaterial color={cfg.color} emissive={cfg.emissive || '#000000'}/>}
                {cfg.moons?cfg.moons:null}
            </animated.mesh>
            {cfg.noOrbit === true?null :<Ellipse min={cfg.distanceMin/30} max={cfg.distanceMax/30} color={cfg.color}/>}
        </>);
};