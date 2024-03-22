import { MaterialExtension } from "./ExtendedMaterial.react";

export const SaturnRingShader = new MaterialExtension({
  name: "SaturnShader",
  uniforms: {
    iTime: {type: 'f', value: 1.0}
  },
  vertexShader: (shader, type) => {
      return shader
          .replace('#define STANDARD', `#define STANDARD
          varying vec3 v_position;
          `)
          .replace('#include <color_vertex>',
          `#include <color_vertex>
          v_position=position;
      `);
  },
  fragmentShader: (shader: string, type: string) => {
    shader = `
        uniform float iTime;
        varying vec3 v_position;
        vec4 lerp(vec4 c1, vec4 c2, float value){
          return (c1 + value*(c2-c1));
        }
        ${shader.replace(
          "#include <color_fragment>",
           `
          
          #include <color_fragment>
          vec4 JupiterColor1 = vec4(0.8,0.5,0.35, 1.0); 
          vec4 JupiterColor2 = vec4(0.6, 0.5,0.3, 0.0); 
          float distanceFromCenter = length(v_position);
          diffuseColor = JupiterColor1 * (1.0- (cos(distanceFromCenter*3.14*2.0*1.0)/2.0+0.5));
          diffuseColor += JupiterColor2 * (1.0- (cos(distanceFromCenter*3.14*3.6*3.0+3.0)/2.0+0.5));
          diffuseColor -= (cos(cos(v_position.x*v_position.y*6.28*11.0)*.1+distanceFromCenter*3.14*47.7)/2.0+0.5)*(cos(distanceFromCenter*3.14*77.7)/2.0+0.5);
          
          
          //diffuseColor = lerp(diffuseColor, JupiterColor2, distanceFromCenter*2.0);
              // if(distanceFromCenter>.45 || distanceFromCenter<.3){
            //diffuseColor.a = 0.0;
          //}
          diffuseColor.a = min(min(1.0 - max(
            smoothstep(distanceFromCenter-.3,0.0,1.0),
            smoothstep((.43-distanceFromCenter)*3.0,0.0,1.0)
          ), diffuseColor.a), diffuseColor.r);
            
          diffuseColor.a = max(0.0,min( diffuseColor.a,  0.5-distanceFromCenter));
     

          
          
          `)
      }`;
    return shader;
  },
});
