import { forwardRef, useEffect, useMemo, useRef } from "react";

//@ts-ignore
import { ExtendedMaterial as ImplExtendedMaterial } from "three-extended-material";
import {MaterialParameters, Material} from "three";


export type MaterialExtension = {
    name: string,
};
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
export const ExtendedMaterial = forwardRef((props: ExtendedMaterialProps, ref) => {
    const { superMaterial, extensions, parameters, options, ...rest } = props;
    const implMaterialRef = useRef<ExtendedMaterialProps>();

    const material = useMemo(() => {
        return new ImplExtendedMaterial(superMaterial, extensions, parameters, options);
    }, [superMaterial, extensions]);
/*    const material = useMemo(() => {
      const recreate = () => {
        implMaterialRef.current = new ImplExtendedMaterial(superMaterial, extensions, parameters, options);
        implMaterialRef!.current!.__extensions = mapExtsNames(extensions)
      };
/!*
      const t = new superMaterial();
      if (!implMaterialRef.current 
        || t.type !== implMaterialRef.current.type 
        || mapExtsNames(extensions) !== implMaterialRef.current.__extensions) {
        recreate();
      }
      t.dispose();*!/
      return implMaterialRef.current;
    }, [superMaterial, extensions]);

    useEffect(() => material!.dispose(), [material]);*/

    return <primitive attach="material" object={material} ref={implMaterialRef} {...parameters} {...rest} />;
  }
);
