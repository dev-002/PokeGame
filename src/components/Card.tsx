// Style sheets 
import '../styles/Card.css'

// Props passed from App
/*
Props shoudl be defined acurately and array is represented with [] in the end
*/
interface CardProps {
    pokeData: {
        id: number,
        image: string,
        name: string,
        stats: {
            base_stat: number,
            stat: {
                name: string
            }
        }[],
        types: {
            slot: number,
            type: {
                name: string
            }
        }[]
    }
}

function Card({ pokeData }: CardProps) {
    return (
        <div className="pokemon-card center">
            <img src={pokeData.image} alt="Pokemon Image" className="pokemon-image" />
            <h2 className="pokemon-name">{pokeData.id}: {pokeData.name}</h2>
            <hr className='hrule'/>
            {pokeData.types.map(singleType => {
                return (
                    <p className="pokemon-type" key={singleType.slot}>
                        {singleType.type.name}
                    </p>
                )
            })}
            <hr className='hrule'/>
            <ul className="pokemon-stats">
                {pokeData.stats.map(({ base_stat, stat: { name } }) => {
                    return (
                        <li key={name} className="pokemon-stat">{name}: {base_stat}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Card;