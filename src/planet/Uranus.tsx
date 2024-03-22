import {Planet, PlanetProps, SkyObjectProps} from "./Base";

export const Uranus = (props: SkyObjectProps) => {
    return (
        <Planet color={'#5580aa'}
                distanceMin={3006} distanceMax={3006}
                weight={318}
                radius={58232}
                rings={false}
                cycle={84*365}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

        />
    );
};