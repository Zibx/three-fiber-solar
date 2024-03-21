import {Planet, PlanetProps} from "./Base";

export const Pluto = (props: PlanetProps) => {
    return (
        <Planet color={'#366896'}
                distanceMin={5900} distanceMax={5900}
                weight={318}
                radius={58232}
                rings={false}
                cycle={248*365}
                name={props.name}

        />
    );
};