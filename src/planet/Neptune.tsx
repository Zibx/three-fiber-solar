import {Planet, PlanetProps} from "./Base";

export const Neptune = (props: PlanetProps) => {
    return (
        <Planet color={'#eee7a7'}
                distanceMin={4537} distanceMax={4537}
                weight={318}
                radius={58232}
                rings={false}
                cycle={165*365}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

        />
    );
};