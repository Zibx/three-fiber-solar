import {ForwardedRef, forwardRef, useMemo, useRef} from "react";

//@ts-ignore
import { ExtendedMaterial as ImplExtendedMaterial } from "three-extended-material";
import {IUniform} from "three/src/Three";
import {ShaderMaterial} from "three";

export interface TypedIUniform<TValue = any> extends IUniform {
    value: TValue;
    type: string;
}

const mapExtsNames = (array: MaterialExtension[]): string => array.map(e => e.name || "unknown-extension").toString();

export type ExtendedMaterialProps = {
    superMaterial: any
    extensions: any,
    parameters?: any,
    options?: any,
    __extensions?: string,
    dispose?: ()=> void,
    type?: string,
    uniforms? :any

}
export type MaterialExtensionProps = {
    name: string,
    uniforms?: {[key: string]: TypedIUniform|boolean | number | string | undefined},
    fragmentShader?: (shader: string, type: string) => string,
    vertexShader?: (shader: string, type: string) => string,

};
export class MaterialExtension {
    name: string;
    uniforms: {[key: string]: TypedIUniform|boolean | number | string | undefined};
    fragmentShader?: (shader: string, type: string) => string;
    vertexShader?: (shader: string, type: string) => string;
    constructor({
                    name,
                    uniforms,
                    fragmentShader,
                    vertexShader
    }: MaterialExtensionProps) {
        this.name = name;
        this.uniforms = uniforms || {};
        this.fragmentShader = fragmentShader || ((shader, type) => shader);
        this.vertexShader = vertexShader || ((shader, type) => shader);
    }
}

const tune = function(materialProps: ExtendedMaterialProps): ExtendedMaterialProps{

    const proto = Object.getPrototypeOf(materialProps);

    const originalOnBeforeCompile = proto.onBeforeCompile;



    proto.onBeforeCompile = function(shader:any){
        originalOnBeforeCompile.apply(this, arguments);
        shader.vertexUvs  = true;
    };
    return materialProps;
}
export const ExtendedMaterial = forwardRef((props: ExtendedMaterialProps, ref: ForwardedRef<MaterialExtension>) => {
    const { superMaterial, extensions, parameters, options, ...rest } = props;
    const implMaterialRef = useRef<ExtendedMaterialProps>();

    const material = useMemo(() => {
        const recreate = () => {
            if(implMaterialRef.current && implMaterialRef.current.dispose)
                implMaterialRef.current.dispose();

            implMaterialRef.current = tune(new ImplExtendedMaterial(superMaterial, extensions, parameters, options));
            implMaterialRef!.current!.__extensions = mapExtsNames(extensions)
            return implMaterialRef.current;
        };

        if (implMaterialRef.current) {
            recreate();
        }

        return tune(new ImplExtendedMaterial(superMaterial, extensions, parameters, options));

    }, [superMaterial, extensions]);

    return <primitive attach="material" object={material} ref={implMaterialRef} {...parameters} {...rest} />;
  }
);
