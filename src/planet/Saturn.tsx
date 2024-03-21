import {Planet, PlanetProps} from "./Base";

export const Saturn = (props: PlanetProps) => {
    return (
        <Planet color={'#b08f36'}
                distanceMin={1350} distanceMax={1350}
                weight={318}
                radius={58232}
                rings={true}
                cycle={29.5*365}
                name={props.name}

        />
    );
};