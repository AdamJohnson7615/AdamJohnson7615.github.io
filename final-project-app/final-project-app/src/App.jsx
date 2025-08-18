import { useEffect, useState } from 'react'
import './App.css'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { nanoid } from 'nanoid'
import AddCharacter from './Components/AddCharacter'
import Character from './Components/Character'

function App() {
  const [allCharacters, setAllCharacters] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [keywords, setKeyWords] = useState('')
  const [tierRank, setTierRank] = useState('')
  const [debutYear, setDebutYear] = useState('')

  const characters = [
    {
      characterId: nanoid(),
      fighterName: "Mario",
      universe: "Super Mario",
      tierRank: "B",
      debutYear: 1981,
      image: "images/mario.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Donkey Kong",
      universe: "Donkey Kong",
      tierRank: "C",
      debutYear: 1981,
      image: "images/dk.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Link",
      universe: "The Legend of Zelda",
      tierRank: "C",
      debutYear: 1986,
      image: "images/link.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Samus",
      universe: "Metroid",
      tierRank: "C",
      debutYear: 1986,
      image: "images/samus.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Yoshi",
      universe: "Yoshi",
      tierRank: "A",
      debutYear: 1990,
      image: "images/yoshi.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Kirby",
      universe: "Kirby",
      tierRank: "S",
      debutYear: 1992,
      image: "images/kirby.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Fox",
      universe: "Star Fox",
      tierRank: "A",
      debutYear: 1993,
      image: "images/fox.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Pikachu",
      universe: "Pokémon",
      tierRank: "S",
      debutYear: 1996,
      image: "images/pikachu.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Luigi",
      universe: "Super Mario",
      tierRank: "C",
      debutYear: 1983,
      image: "images/luigi.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Ness",
      universe: "EarthBound",
      tierRank: "C",
      debutYear: 1994,
      image: "images/ness.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Captain Falcon",
      universe: "F-Zero",
      tierRank: "A",
      debutYear: 1990,
      image: "images/falcon.jpg"
    },
    {
      characterId: nanoid(),
      fighterName: "Jigglypuff",
      universe: "Pokémon",
      tierRank: "B",
      debutYear: 1996,
      image: "images/jigglypuff.jpg"
    }
  ]

  useEffect(() => {
    if (localStorage) {
      const charactersLocalStorage = JSON.parse(localStorage.getItem('characters'))
      if (charactersLocalStorage) {
        saveCharacters(charactersLocalStorage)
      } else {
        saveCharacters(characters)
      }
    }
  }, [])

  const addCharacter = (newCharacter) => {
    const updatedCharacters = [...allCharacters, newCharacter]
    saveCharacters(updatedCharacters)
  }

  const saveCharacters = (characters) => {
    setAllCharacters(characters)
    setSearchResults(characters)
    if (localStorage) {
      localStorage.setItem('characters', JSON.stringify(characters))
      console.log('saved to local storage')
    }
  }

  const searchCharacters = () => {
  let results = allCharacters;

  // Filter by keywords (fighterName or universe, partial match)
  if (keywords.trim()) {
    const keyWordsArray = keywords.toLowerCase().split(' ');
    results = results.filter(character =>
      keyWordsArray.some(word =>
        character.fighterName.toLowerCase().includes(word) ||
        character.universe.toLowerCase().includes(word)
      )
    );
  }

  // Filter by tierRank (exact match)
  if (tierRank) {
    results = results.filter(character =>
      character.tierRank.toLowerCase() === tierRank.toLowerCase()
    );
  }

  // Filter by debutYear (exact match)
  if (debutYear) {
    results = results.filter(character =>
      character.debutYear && character.debutYear.toString() === debutYear
    );
  }

  setSearchResults(results);
};

  const removeCharacter = (characterToDelete) => {
    const updatedCharactersArray = allCharacters.filter(character => character.characterId !== characterToDelete.characterId)
    saveCharacters(updatedCharactersArray)
  }

  const updateCharacter = (updatedCharacter) => {
    const updatedCharactersArray = allCharacters.map(character =>
      character.characterId === updatedCharacter.characterId
        ? { ...character, ...updatedCharacter }
        : character
    )
    saveCharacters(updatedCharactersArray)
  }

  return (
    <div className='container'>
      <div className='row' id='allCharacters'>
        <h3>Fighting Game Characters</h3>
        {searchResults && searchResults.map((character) => (
          <div className='col-md-2' key={character.characterId}>
            <Character character={character} removeCharacter={removeCharacter} updateCharacter={updateCharacter} />
          </div>
        ))}
      </div>
      <AddCharacter addCharacter={addCharacter} />
      <div className='row mt-4' id='searchCharacter'>
        <div className='col-md-3'>
          <h3>Search Character</h3>
          <label htmlFor='txtKeywords'>Search by Fighter Name or Universe</label>
          <input
            type='text'
            className='form-control'
            placeholder='Search Fighter Name or Universe'
            onChange={e => setKeyWords(e.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className='col-md-3'>
          <label htmlFor='tierRankSelect'>Tier Rank</label>
          <select
            id='tierRankSelect'
            value={tierRank}
            onChange={evt => setTierRank(evt.currentTarget.value)}
            className='form-select'
          >
            <option value=''>Select Tier Rank</option>
            {_(allCharacters)
              .map(character => character.tierRank)
              .filter(rank => rank != null && rank !== '')
              .uniq()
              .sort()
              .map(rank => (
                <option key={`rank-${rank}`} value={rank}>
                  {rank}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className='col-md-3'>
          <label htmlFor='debutYearSelect'>Debut Year</label>
          <select
            id='debutYearSelect'
            value={debutYear}
            onChange={evt => setDebutYear(evt.currentTarget.value)}
            className='form-select'
          >
            <option value=''>Select Debut Year</option>
            {_(allCharacters)
              .map(character => character.debutYear)
              .filter(year => year != null && year !== '')
              .uniq()
              .sort()
              .map(year => (
                <option key={`year-${year}`} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className='col-md-3'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={searchCharacters}
          >
            Search Characters <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App