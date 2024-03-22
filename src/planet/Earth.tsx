import {Planet, PlanetProps} from "./Base";

export const Earth = (props: PlanetProps) => {
    return (
        <Planet color={'#2f6a69'}
                distanceMin={147} distanceMax={152}
                weight={1} radius={6371}
                cycle={365.24}
                name={props.name}
                setCameraTarget={props.setCameraTarget}

                moons={[
                    <Planet color={'#777777'}

                            key={'Moon'}
                            distanceMin={10} distanceMax={10}
                            weight={1} radius={631}
                            cycle={28}
                            moons={[

                            ]}
                            noOrbit={true}
                    />
                ]}
        />
    );
};