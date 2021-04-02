import React, { useEffect, useState } from 'react'
import Message from './Message'
import {
  Table,
  InputGroup,
  FormControl,
  FormGroup,
  Form
} from 'react-bootstrap'
import axios from 'axios'

const HomePage = () => {
  const [atomicNum, setAtomicNum] = useState()
  const [elDetails, setElDetails] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const API_URL1 = 'https://periodic-table-api.herokuapp.com/'
    const fetchAllData = async () => {
      const { data } = await axios.get(API_URL1)
      setResults(data)
    }
    fetchAllData()
  }, [])

  useEffect(() => {
    const API_URL2 = `https://periodic-table-api.herokuapp.com/atomicNumber/${atomicNum}`
    const getElementDetails = async () => {
      const { data } = await axios.get(API_URL2)
      setElDetails(data)
    }

    getElementDetails()
  }, [atomicNum])

  const {
    atomicNumber,
    symbol,
    atomicMass,
    name,
    bondingType,
    atomicRadius,
    meltingPoint,
    boilingPoint,
    density,
    electronAffinity,
    electronegativity,
    electronicConfiguration,
    groupBlock,
    ionRadius,
    vanDelWaalsRadius,
    oxidationStates,
    standardState,
    ionizationEnergy,
    yearDiscovered
  } = elDetails

  return (
    <>
      {!atomicNum ? (
        <Message
          variant='info'
          msg='Kindly select element or enter atomic number'
        />
      ) : atomicNum > 118 || atomicNum < 0 ? (
        <Message variant='danger' msg={`Sorry this element doesn't exists`} />
      ) : null}

      <FormGroup>
        <Form.Label className='m-0 text-info'>
          Get details by element name
        </Form.Label>
        <Form.Control
          as='select'
          onChange={e => setAtomicNum(e.target.value)}
          defaultValue='Select Element'
        >
          <option>Select Element</option>
          {results.map((r, key) => (
            <option key={key} value={r.atomicNumber}>
              {`${r.atomicNumber} - ${r.name}`}
            </option>
          ))}
        </Form.Control>
      </FormGroup>

      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id='basic-addon3'>
            Search By Atomic Number
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type='number'
          onChange={e => setAtomicNum(e.target.value)}
          id='basic-url'
          aria-describedby='basic-addon3'
        />
      </InputGroup>

      <div className='d-flex flex-column my-4 bg-light shadow-sm'>
        <div className='d-flex justify-content-center bg-info p-4'>
          <h3 className='align-self-end'>
            {atomicNumber ? atomicNumber : 'Z'}
          </h3>
          <h3 style={{ fontSize: '4rem' }}>{symbol ? symbol : 'X'}</h3>
          {atomicMass ? (
            Array.isArray(atomicMass) ? (
              <h3 className='align-self-start'>{atomicMass[0]}</h3>
            ) : (
              <h3>{atomicMass && atomicMass.split('.')[0]}</h3>
            )
          ) : (
            <h3>A</h3>
          )}
        </div>
        <div className='d-flex bg-dark text-light justify-content-center'>
          <h3>{name ? name : 'NA'}</h3>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Atomic Mass</td>
            <td>{atomicMass ? atomicMass : 'NA'}</td>
          </tr>
          <tr>
            <td>Bonding Type</td>
            <td>{bondingType ? bondingType : 'NA'}</td>
          </tr>
          <tr>
            <td>Atomic Radius</td>
            <td>{atomicRadius ? atomicRadius : 'NA'}</td>
          </tr>
          <tr>
            <td>Melting Point</td>
            <td>{meltingPoint ? meltingPoint : 'NA'}</td>
          </tr>
          <tr>
            <td>Boiling Point</td>
            <td>{boilingPoint ? boilingPoint : 'NA'}</td>
          </tr>
          <tr>
            <td>Density</td>
            <td>{density ? density : 'NA'}</td>
          </tr>
          <tr>
            <td>Group Block</td>
            <td>{groupBlock ? groupBlock : 'NA'}</td>
          </tr>
          <tr>
            <td>Electron Affinity</td>
            <td>{electronAffinity ? electronAffinity : 'NA'}</td>
          </tr>
          <tr>
            <td>Electronegativity</td>
            <td>{electronegativity ? electronegativity : 'NA'}</td>
          </tr>
          <tr>
            <td>Electronic Configuration</td>
            <td>{electronicConfiguration ? electronicConfiguration : 'NA'}</td>
          </tr>
          <tr>
            <td>Ion Radius</td>
            <td>{ionRadius ? ionRadius : 'NA'}</td>
          </tr>
          <tr>
            <td>Oxidation States</td>
            <td>{oxidationStates ? oxidationStates : 'NA'}</td>
          </tr>
          <tr>
            <td>VandeWaals Radius</td>
            <td>{vanDelWaalsRadius ? vanDelWaalsRadius : 'NA'}</td>
          </tr>
          <tr>
            <td>Standard State</td>
            <td>{standardState ? standardState : 'NA'}</td>
          </tr>
          <tr>
            <td>Ionization Energy</td>
            <td>{ionizationEnergy ? ionizationEnergy : 'NA'}</td>
          </tr>
          <tr>
            <td>Year Discoverd</td>
            <td>{yearDiscovered ? yearDiscovered : 'NA'}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default HomePage
