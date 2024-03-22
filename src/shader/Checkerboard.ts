import { MaterialExtension } from "./ExtendedMaterial.react";
import {MeshBasicMaterial} from "three/src/Three";
import {MeshBasicMaterialProps} from "@react-three/fiber";

export const Checkerboard = new MaterialExtension({
  name: "checkerboard",
  uniforms: {
    checkersSize: 5,
    iTime: {type: 'f', value: 1.0}
  },
  fragmentShader: (shader: string, type: string) => {
    debugger
    shader = `
        uniform float checkersSize;
        ${
      type === "MeshNormalMaterial"
        ? shader.replace(
          "gl_FragColor = vec4( packNormalToRGB( normal ), opacity );",
          /*glsl*/ `
          vec2 pos = floor(gl_FragCoord.xy / checkersSize);
          float pattern = mod(pos.x + mod(pos.y, 2.0), 2.0);
          gl_FragColor = vec4( packNormalToRGB( normal ) * pattern, opacity );
          `)
        : shader.replace(
          "#include <output_fragment>",
          /*glsl*/ `
          vec2 pos = floor(gl_FragCoord.xy / checkersSize);
          float pattern = mod(pos.x + mod(pos.y, 2.0), 2.0);
          outgoingLight = outgoingLight * pattern;
          outgoingLight.b =1.0;
          outgoingLight.a = 0.0;
          #include <output_fragment>
          `)
    }
      `;
    return shader;
  },
});