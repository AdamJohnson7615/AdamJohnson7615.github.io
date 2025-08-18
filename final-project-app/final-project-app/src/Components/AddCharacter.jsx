import React, {useState} from 'react'
import {nanoid} from 'nanoid'

function AddCharacter(props) {
  const[fighterName, setFighterName] = useState('');
  const[universe, setUniverse] = useState('');
  const[tierRank, setTierRank] = useState('');
  const[debutYear, setDebutYear] = useState('');
  const[selectedFile, setSelectedFile] = useState(null);

  const imageUpdate = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const doWork = () => {
    const newCharacter = {
      characterId: nanoid(),
      fighterName,
      universe,
      tierRank,
      debutYear,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };
    props.addCharacter(newCharacter);
  }

  return (
    <div className='row mt-5' id='addCharacter'>
        <h3>Add Fighter</h3>
      <div className='col-md-2'>
        <label htmlFor='txtFighterName' className='form-label'>Fighter Name</label>
        <input type='text' id='txtFighterName' placeholder='Fighter Name' className='form-control' onChange={(evt)=> setFighterName(evt.currentTarget.value)} value={fighterName}/>
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtUniverse' className='form-label'>Universe</label>
        <input type='text' id='txtUniverse' placeholder='Universe' className='form-control' onChange={(evt)=> setUniverse(evt.currentTarget.value)} value={universe}/>
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtTierRank' className='form-label'>Tier Rank</label>
        <input type='text' id='txtTierRank' placeholder='Tier Rank' className='form-control' onChange={(evt)=> setTierRank(evt.currentTarget.value)} value={tierRank}/>
      </div>
      <div className='col-md-2'>
        <label htmlFor='txtDebutYear' className='form-label'>Debut Year</label>
        <input type='number' id='txtDebutYear' placeholder='Debut Year' className='form-control' onChange={(evt)=> setDebutYear(evt.currentTarget.value)} value={debutYear}/>
      </div>
      <div className='col-md-2'>
        <label htmlFor='fileUpload' className='form-label'>Character Image</label>
        <input type='file' name='file' id='fileUpload' onChange={imageUpdate}/>
      </div>
      <div className='col-md-2'>
        <button type='button' className='btn btn-success btn-lg' id='btnAdd' onClick={doWork}>Add Character</button>
      </div>
    </div>
  )
}

export default AddCharacter