import {Planet, PlanetProps} from "./Base";

export const Mars = (props: PlanetProps) => {
    return (
        <Planet color={'#b07f35'}
                distanceMin={206} distanceMax={249}
                weight={0.107}
                radius={3390}
                cycle={687}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

        />
    );
};