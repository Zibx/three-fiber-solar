import { MaterialExtension } from "./ExtendedMaterial.react";

export const SaturnShader = new MaterialExtension({
  name: "SaturnShader",
  uniforms: {
    iTime: {type: 'f', value: 1.0}
  },
  fragmentShader: (shader: string, type: string) => {
    shader = `
        uniform float iTime;
        vec4 lerp(vec4 c1, vec4 c2, float value){
          return (c1 + value*(c2-c1));
        }
        ${shader.replace(
          "#include <color_fragment>",
           `
          
          #include <color_fragment>
          vec4 JupiterColor1 = vec4(0.7,0.4,0.3, 1.0); 
          vec4 JupiterColor2 = vec4(0.5, 0.2,0.1, 1.0); 
          diffuseColor = lerp(
            JupiterColor1, 
            JupiterColor2, 
            (sin(sin(vUv.y*6.28*1.5+3.0)/2.0*vUv.y*6.28*10.0+cos(vUv.x*6.28*4.0+iTime))/2.0+0.5)+
            
            (sin(sin(vUv.y*6.28*2.0+2.0)/2.0*vUv.y*6.28*6.0+cos(vUv.x*6.28*1.5+iTime*1.7))/2.0+0.5)            
          );
          `)}`;
    return shader;
  },
});
