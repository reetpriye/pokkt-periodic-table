import React, { useEffect, useState } from 'react'
import Spinner from '../assets/spinner.gif'
import Science from '../assets/science.svg'
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
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    const fetchAllElements = async () => {
      setShowLoader(true)
      let config = {
        // Don't make unnecessary calls
        headers: {
          'X-Master-Key':
            '$2b$10$Q52vyNMWcst0nKiJqMPmdeJnXggEAjZba1yEee8mU9/9BidvvU1OC'
        }
      }
      const {
        data: { record: {elements} }
      } = await axios.get(
        'https://api.jsonbin.io/v3/b/6069c3ad6397691864735be9',
        config
      )
      setShowLoader(false)
      setResults(elements)
    }
    fetchAllElements()
  }, [])

  useEffect(() => {
    const getElementDetails = () => {
      const reqData = results.filter(e => e.number === Number(atomicNum))

      if (reqData.length !== 0) setElDetails(reqData[0])
    }
    getElementDetails()
  }, [atomicNum, results])

  const {
    name,
    appearance,
    atomic_mass,
    boil,
    category,
    color,
    density,
    discovered_by,
    melt,
    molar_heat,
    named_by,
    number,
    period,
    phase,
    summary,
    symbol,
    shells,
    electron_configuration,
    electron_configuration_semantic,
    electron_affinity,
    electronegativity_pauling,
    ionization_energies
  } = elDetails

  return (
    <>
      {!atomicNum ? (
        <Message
          variant='info'
          msg='Kindly select element or enter atomic number'
        />
      ) : atomicNum > 119 || atomicNum < 1 ? (
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
            <option key={key} value={r.number}>
              {`${r.number} - ${r.name}`}
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

      <section className='d-flex my-2 flex-column bg-light shadow-sm align-items-stretch'>
        <div className='d-flex justify-content-center bg-info p-4'>
          {showLoader ? (
            <img src={Spinner} style={{ width: '80px' }} alt='loading...' />
          ) : (
            <>
              <h3 className='align-self-end'>{number ? number : 'Z'}</h3>
              <h3 style={{ fontSize: '4rem' }}>{symbol ? symbol : 'X'}</h3>
              <h3>{atomic_mass ? atomic_mass.toFixed(0) : 'X'}</h3>
            </>
          )}
        </div>
        <div className='d-flex bg-dark text-light justify-content-center'>
          <h3>{name ? name : 'NA'}</h3>
        </div>
      </section>

      {!atomicNum ? (
        <>
          <div className='d-flex py-4 flex-column align-items-center'>
            <img
              className='my-4'
              src={Science}
              style={{ width: '40%' }}
              alt='science-logo'
            />
            <h6 className='m-0 d-block d-xl-none'>KINDLY SELECT ELEMENT</h6>
          </div>
        </>
      ) : (
        <>
          <section className='d-flex border border-info bg-light shadow-sm my-3'>
            <div className='d-flex bg-dark text-light p-2'>
              <h6 className='align-self-center m-0'>E.C</h6>
            </div>
            <div className='p-2'>
              <h6 className='m-0'>
                {electron_configuration ? electron_configuration : 'NA'}
              </h6>
            </div>
          </section>

          <section className='d-flex bg-light shadow-sm my-2'>
            <div id='heading' className='bg-dark'>
              <h4 className='text-center text-uppercase m-0 px-1 py-2 text-light'>
                Summary
              </h4>
            </div>
            <div>
              <p className='p-2 m-0'>{summary ? summary : 'NA'}</p>
            </div>
          </section>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Period</td>
                <td>{period ? period : 'NA'}</td>
              </tr>
              <tr>
                <td>Atomic Mass</td>
                <td>{atomic_mass ? atomic_mass : 'NA'}</td>
              </tr>
              <tr>
                <td>Appearance</td>
                <td>{appearance ? appearance : 'NA'}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{category ? category : 'NA'}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>{color ? color : 'NA'}</td>
              </tr>
              <tr>
                <td>Density</td>
                <td>{density ? density : 'NA'}</td>
              </tr>
              <tr>
                <td>Dicovered By</td>
                <td>{discovered_by ? discovered_by : 'NA'}</td>
              </tr>
              <tr>
                <td>Molar Heat</td>
                <td>{molar_heat ? molar_heat : 'NA'}</td>
              </tr>
              <tr>
                <td>Named By</td>
                <td>{named_by ? named_by : 'NA'}</td>
              </tr>
              <tr>
                <td>Phase</td>
                <td>{phase ? phase : 'NA'}</td>
              </tr>
              <tr>
                <td>Melting Point</td>
                <td>{melt ? melt : 'NA'}</td>
              </tr>
              <tr>
                <td>Boiling Point</td>
                <td>{boil ? boil : 'NA'}</td>
              </tr>
              <tr>
                <td>Ionization Energies</td>
                <td>
                  {ionization_energies
                    ? ionization_energies.map(i => (
                        <p style={{ display: 'inline' }}>{`${i}, `}</p>
                      ))
                    : 'NA'}
                </td>
              </tr>
              <tr>
                <td>Shells</td>
                <td>
                  {shells
                    ? shells.map(s => (
                        <p style={{ display: 'inline' }}>{`${s} `}</p>
                      ))
                    : 'NA'}
                </td>
              </tr>
              <tr>
                <td>Electron Affinity</td>
                <td>{electron_affinity ? electron_affinity : 'NA'}</td>
              </tr>
              <tr>
                <td>Electronegativity</td>
                <td>
                  {electronegativity_pauling ? electronegativity_pauling : 'NA'}
                </td>
              </tr>
              <tr>
                <td>Electronic Configuration Semantic</td>
                <td>
                  {electron_configuration_semantic
                    ? electron_configuration_semantic
                    : 'NA'}
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default HomePage
