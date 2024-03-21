import {Planet, PlanetProps} from "./Base";

export const Mercury = (props: PlanetProps) => {
    return (
        <Planet color={'#1a1a1a'}
                distanceMin={46} distanceMax={88}
                radius={2440}
                weight={0.055}
                cycle={88}
                name={props.name}

        />
    );
};