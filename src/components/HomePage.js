import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [atomicNum, setAtomicNum] = useState()
  const [elDetails, setElDetails] = useState({})

  useEffect(() => {
    const uri = `https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${atomicNum}`
    const fetchData = async () => {
      const { data } = await axios.get(uri)
      setElDetails(data)
    }
    fetchData()
  }, [atomicNum])

  return (
    <>
      <div id='input-box-el-name-num'>
        <div id='input-box'>
          <label htmlFor='atomic-number'>Atomic Number</label>
          <input
            type='number'
            onChange={e => setAtomicNum(e.target.value)}
            id='atomic-number-input-field'
          />
        </div>
        <div id='el-name-num'>
          <h3 id='el-atomic-num'>{elDetails.atomicNumber}</h3>
          <h3 id='el-symbol'>{elDetails.symbol}</h3>
          <h3 id='el-atomic-mass'>
            {elDetails.atomicMass && elDetails.atomicMass.split('.')[0]}
          </h3>
        </div>
      </div>
      {!atomicNum ? (
        <h2 className='alert'>Kindly enter atomic number</h2>
      ) : atomicNum > 118 || atomicNum < 1 ? (
        <h2 className='alert'>Atomic number can only be between 1-118</h2>
      ) : (
        <>
          <h2 id='el-properties'>Element Properties</h2>
          <h4>Element Name: {elDetails.name}</h4>
          <h4>Atomic Mass: {elDetails.atomicMass}</h4>
          <h4>Bonding Type: {elDetails.bondingType}</h4>
          <h4>Atomic Radius: {elDetails.atomicRadius}</h4>
          <h4>Melting Point: {elDetails.meltingPoint}</h4>
          <h4>Boiling Point: {elDetails.boilingPoint}</h4>
          <h4>Density: {elDetails.density}</h4>
          <h4>Electron Affinity: {elDetails.electronAffinity}</h4>
          <h4>Electronegativity: {elDetails.electronegativity}</h4>
          <h4>Electronic Configuration: {elDetails.electronicConfiguration}</h4>
          <h4>Group Block: {elDetails.groupBlock}</h4>
          <h4>Ion Radius: {elDetails.ionRadius}</h4>
          <h4>VandeWaals Radius: {elDetails.vanDelWaalsRadius}</h4>
          <h4>Oxidation States: {elDetails.oxidationStates}</h4>
          <h4>Standard State: {elDetails.standardState}</h4>
          <h4>Ionization Energy: {elDetails.ionizationEnergy}</h4>
          <h4>Year Discoverd: {elDetails.yearDiscovered}</h4>
        </>
      )}
    </>
  )
}

export default HomePage
