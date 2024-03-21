import {Planet, PlanetProps} from "./Base";
import {useMemo} from "react";
import {MeshStandardMaterial, Vector2} from "three";
import { ExtendedMaterial } from "../shader/ExtendedMaterial.react";
import {extend, Object3DNode} from "@react-three/fiber";
import {Checkerboard} from "../shader/Checkerboard";

export const Jupiter = (props: PlanetProps) => {

    const shader = useMemo(function(){


        var vertexShader = `
    #define MAX_ITER 13
    uniform float iTime;
    varying vec2 vUv;
    #define TAU 6.28318530718
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      vUv = uv;
      gl_Position = projectedPosition;
    }

`;

        var fragmentShader = `varying vec2 vUv;
uniform float iTime;
uniform vec2 iResolution;

vec3 colorA = vec3(0.412,0.191,0.252);
vec3 colorB = vec3(0.200,0.077,0.052);
#define TAU 6.28318530718
#define MAX_ITER 13

vec3 lerp(vec3 c1, vec3 c2, float value){
  return (c1 + value*(c2-c1));
}

void main() {
  vec2 normalizedPixel = gl_FragCoord.xy/60.0;
  vec3 color = lerp(colorA, colorB, sin(vUv.y*15.0));

  gl_FragColor = vec4(color,  length(vUv.x)/270.0);
  gl_FragColor.a = 1.0;
  
}`;
        return {vertexShader, fragmentShader}
    }, []);

    return (
        <Planet color={'#e1a27a'}
                distanceMin={740} distanceMax={816}
                weight={318}
                radius={69911}
                rings={true}
                cycle={12*365}
                name={props.name}
                material={<ExtendedMaterial superMaterial={MeshStandardMaterial}
                                            extensions={[Checkerboard]}

                /> }
        />
    );
};