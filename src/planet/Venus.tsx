import {Planet, PlanetProps, SkyObjectProps} from "./Base";

export const Venus = (props: SkyObjectProps) => {
    return (
        <Planet color={'#e6e6e6'}
                distanceMin={107} distanceMax={109}
                radius={6052}
                weight={0.815}
                cycle={225}
                name={props.name}
                setCameraTarget={props.setCameraTarget}


        />
    );
};