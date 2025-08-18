import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWarning, faMagicWandSparkles} from '@fortawesome/free-solid-svg-icons'

function Character(props) {
  const[editMode, setEditMode] = useState(false)
  const[fighterName, setFighterName] = useState('');
  const[universe, setUniverse] = useState('');
  const[tierRank, setTierRank] = useState('');
  const[debutYear, setDebutYear] = useState('');

  useEffect(() => {
    setFighterName(props.character.fighterName || '' );
    setUniverse(props.character.universe || '' );
    setTierRank(props.character.tierRank || '' );
    setDebutYear(props.character.debutYear || '' );
  }, [props.character, editMode]);

  const saveCharacter = () => {
    setEditMode(false);
    const updatedCharacter = {
      fighterName,
      universe,
      tierRank,
      debutYear,
      characterId: props.character.characterId,
      image: props.character.image
    }
    props.updateCharacter(updatedCharacter);
  }

  return (
     <div className='card'>
        <img src={props.character.image} alt="Character" className='card-image-top mx-auto'/>
        {
          !editMode && <ul className='list-group list-group-flush'>
          <li className='list-group-item'>{props.character.fighterName}</li>
          <li className='list-group-item'>{props.character.universe}</li>
          <li className='list-group-item'>{props.character.tierRank}</li>
          <li className='list-group-item'>Debut Year: {props.character.debutYear}</li>
          <button type='button' className='btn btn-danger' onClick={() => props.removeCharacter(props.character)}>Delete Character <FontAwesomeIcon icon={faWarning}/></button>
          <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faMagicWandSparkles}/></button>
        </ul>
        }
        {
          editMode && <ul className='list-group list-group-flush'>
            <li className='list-group-item text-center'><input type='text' className='form-control' value={fighterName} onChange={(e) => setFighterName(e.currentTarget.value)} /></li>
            <li className='list-group-item text-center'><input type='text' className='form-control' value={universe} onChange={(e) => setUniverse(e.currentTarget.value)} /></li>
            <li className='list-group-item text-center'><input type='text' className='form-control' value={tierRank} onChange={(e) => setTierRank(e.currentTarget.value)} /></li>
            <li className='list-group-item text-center'><input type='number' className='form-control' value={debutYear} onChange={(e) => setDebutYear(e.currentTarget.value)} /></li>
            <li className='list-group-item'><button id='btnSave' className='btn brn-secondary' onClick={saveCharacter}>Save</button></li>
          </ul>
        }
        </div>
  )
}

export default Character