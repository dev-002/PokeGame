import { SetStateAction, SyntheticEvent, useState } from "react";
// Components
import Header from "./components/Header";
import Card from "./components/Card";
import HealthPoint from "./components/HealthPoint";
// Style sheets
import './styles/Index.css'

function App() {
  // States 
  // API Fetch
  const [isFetched1, setIsFetched1] = useState(false);
  const [isFetched2, setIsFetched2] = useState(false);
  // Health Update
  const [updateApi, setUpdateApi] = useState(false);
  const [healthUpdate, sethealthUpdate] = useState(false);
  // API data for 2 cards
  const [pokeData1, setPokeData1] = useState({
    id: NaN,
    image: '',
    name: '',
    stats: [{
      base_stat: NaN,
      stat: {
        name: ''
      }
    }],
    types: [{
      slot: NaN,
      type: {
        name: ''
      }
    }]
  });

  const [pokeData2, setPokeData2] = useState({
    id: NaN,
    image: '',
    name: '',
    stats: [{
      base_stat: NaN,
      stat: {
        name: ''
      }
    }],
    types: [{
      slot: NaN,
      type: {
        name: ''
      }
    }]
  });
  const [healthPoint, setHealthPoint] = useState(1000);

  function handleShow(e: SyntheticEvent) {
    if ((e.target as HTMLButtonElement).id === 'start-button') {
      Draw(setPokeData1, setIsFetched1);
      setUpdateApi(true);
    }
    setTimeout(() => {
      setUpdateApi(true);
      Draw(setPokeData2, setIsFetched2);
    }, 2000);
    sethealthUpdate(false);
  }

  async function Draw(setFunction: { (value: SetStateAction<{ id: number; image: string; name: string; stats: { base_stat: number; stat: { name: string; }; }[]; types: { slot: number; type: { name: string; }; }[]; }>): void; (value: SetStateAction<{ id: number; image: string; name: string; stats: { base_stat: number; stat: { name: string; }; }[]; types: { slot: number; type: { name: string; }; }[]; }>): void; (arg0: () => any): void; }, setIsFetched: { (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) {
    const pokeId = Math.floor(Math.random() * 1010 + 1);
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
    await fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => {
        setIsFetched(true);
        setFunction(() => {
          return { ...data, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png` }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  function Damage() {
    if (pokeData1.stats[2].base_stat < pokeData2.stats[1].base_stat) {
      setHealthPoint((healthPoint) => {
        return (healthPoint - (pokeData2.stats[1].base_stat - pokeData1.stats[2].base_stat))
      })
    }
    else {
      setHealthPoint((healthPoint) => {
        return (healthPoint + (pokeData1.stats[2].base_stat - pokeData2.stats[1].base_stat))
      })
    }
  }

  return (
    <>

      {/* <video autoplay muted loop id="bg-video">
        <source
          src="https://www.youtube.com/embed/W0W00MaCDBY?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=W0W00MaCDBY"
          type="video/mp4">
      </video> */}

      <div className="container">

        <Header />
        <button id="start-button" className="btn btn-primary btn-lg" onClick={(e: SyntheticEvent) => handleShow(e)}>Start</button>
        <br className="hb" />

        <div className="container">
          <div className="row">

            <div className="col-md-5">
              {isFetched1 && <Card pokeData={pokeData1} />}
            </div>

            {isFetched1 && <div className="col-md-2 text-center Vs">V/S</div>}

            <div className="col-md-5">
              {isFetched2 && <Card pokeData={pokeData2} />}
            </div>

          </div>

          {isFetched2 && <HealthPoint Damage={Damage} healthPoint={healthPoint}
            updateApi={updateApi} setUpdateApi={setUpdateApi}
            healthUpdate={healthUpdate} sethealthUpdate={sethealthUpdate} />}

        </div>

      </div>
    </>
  )
}

export default App;