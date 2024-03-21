import {Planet, PlanetProps} from "./Base";
import {Vector2} from "three";
import {useMemo} from "react";

//696340
export const Sun = (props: PlanetProps) => {

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
  
  
    float time = iTime * .005+23.0;
    // uv should be the 0-1 uv of texture...


    vec2 p = mod(vUv*TAU*2.0, TAU)-250.0;

vec2 i = vec2(p);
float c = 1.0;
float inten = .002445;

vec3 colour = vec3(0.5,0.3,0);

for (int n = 0; n < MAX_ITER; n++) 
{
    float t = time * (11.0 - (3.5 / float(n+1)));
    
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    c-=0.7;
}
  
  
  gl_Position = projectedPosition;
  gl_Position.x *= 1.0+(c/30.0);
  gl_Position.y *= 1.0+(c/30.0);
}

`;

    var fragmentShader = `varying vec2 vUv;
uniform float iTime;
uniform vec2 iResolution;

vec3 colorA = vec3(0.112,0.191,0.652);
vec3 colorB = vec3(0.700,0.377,0.052);
#define TAU 6.28318530718
#define MAX_ITER 13

void main() {
  vec2 normalizedPixel = gl_FragCoord.xy/60.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,  length(gl_FragCoord.x)/270.0);
  
  
  
  
  float time = iTime * .005+23.0;
    // uv should be the 0-1 uv of texture...
vec2 uv = gl_FragCoord.xy / iResolution.xy*100.0;

    vec2 p = mod(vUv*TAU*2.0, TAU)-250.0;

vec2 i = vec2(p);
float c = 1.0;
float inten = .002445;

vec3 colour = vec3(0.5,0.3,0);

for (int n = 0; n < MAX_ITER; n++) 
{
    float t = time * (11.0 - (3.5 / float(n+1)));
    
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    c-=0.7;
}

    // colour.r = c;//clamp(colour + vec3(0.7, 0.15, 0.2), 0.4, 1.0);
    
    /*
colour.r = length(sin(vUv.y*30.0+cos(vUv.x*TAU)*44.0));
colour.g = length(sin(gl_FragCoord.x));
colour.b = length(vUv.y);*/

gl_FragColor = vec4(mix(colour, color/2.0, normalizedPixel.x), clamp(c, 0.2, 0.7));

gl_FragColor *= sin(c)/2.0;  
if(sin(c*time/30.0)<-0.4){
    gl_FragColor.r *= (sin(c*2.7)+1.0)/3.0;
    gl_FragColor.g = 0.0;
    gl_FragColor.b = 0.0;
    
    gl_FragColor.r = (sin(c/2.7)+1.0)/3.0+colour.r/3.0;
    gl_FragColor.g = 0.0;
    gl_FragColor.b = 0.0;
    
    gl_FragColor.a = 0.6;
    
}
  
  
}`;
        return {vertexShader, fragmentShader}
    }, []);

    const uniforms = {
        iTime: {type: 'f', value: 1.0},
        iResolution: {
            type: "v2",
            value: new Vector2(4, 3),
        }
    };


    return (<Planet color={'#FFFF00'}
                distanceMin={0} distanceMax={0}
                radius={169634}
                weight={330000}
                cycle={1}
                emissive={'#FFFF00'}
                noShadow={true}
                name={props.name}
                moons={[
                    <Planet color={'#FFFF00'}
                            distanceMin={0} distanceMax={0}
                            radius={169634}
                            cycle={100000000}
                            noShadow={true}
                            interactive={false}
                        // @ts-ignore
                            material={<shaderMaterial
                                fragmentShader={shader.fragmentShader}
                                vertexShader={shader.vertexShader}
                                opacity={1.0}
                                transparent={true}
                                uniforms={uniforms}
                            />}
                    />
                ]}
        />
    );
};