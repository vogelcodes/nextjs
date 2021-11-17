import { useState } from 'react'
import {
  Link as ChakraLink,
  Text,
  Code,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  List,
  ListIcon,
  ListItem,
  Box,
} from '@chakra-ui/react'
import Dropzone from 'react-dropzone'
import {CSVReader} from 'react-papaparse'

import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CSVDrop } from '../components/CSVDrop'


const Index = () => {
  const [rows, setRows] = useState([])
  var th = false;
  const handleOnDrop = (data) => {

    setRows(data);
    console.log(data);

  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    setRows([]);

    console.log('---------------------------');
  };


    
 


  return (
    <Box>
      <Text as="h1" fontSize="4xl" textAlign="center">
        CSV-Report-Generator
      </Text >
      <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      <span>Arraste ou selecione a lista</span>
    </CSVReader>
    <Table>
    {rows.map((r, i)=>{
      if(r.data.length > 1){

        if (th == false){
          th=true
          return (<Thead>
            <Tr key={i}>
                  {r.data.map((d,i)=>{
                    return <Th>{d}</Th>
                  })}
                </Tr>
                  </Thead>)
        }else{
          return (<Tr key={i}>
                  {r.data.map((d,i)=>{
                    return <Td>{d}</Td>
                  })}
                </Tr>)

        }
        
              }
    })
    
  }
  </Table>
    <DarkModeSwitch />
    </Box>
)
}

export default Index
