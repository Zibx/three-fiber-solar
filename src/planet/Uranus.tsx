import {Planet, PlanetProps} from "./Base";

export const Uranus = (props: PlanetProps) => {
    return (
        <Planet color={'#5580aa'}
                distanceMin={3006} distanceMax={3006}
                weight={318}
                radius={58232}
                rings={false}
                cycle={84*365}
                name={props.name}
        />
    );
};