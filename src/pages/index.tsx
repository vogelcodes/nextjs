import { useState } from 'react'
import {
  Link as ChakraLink,
  Text,
  FormControl,
  Badge,
  FormLabel,
  Input,
  Code,
  Table,
  Tabs, TabList, TabPanels, Tab, TabPanel,
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
import { el } from 'date-fns/locale'


const Index = () => {
  const [rows, setRows] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [attendees, setAttendees] = useState([])

  var th = false;
  const handleOnDrop = (data) => {

    if (data[0].data[0] =="Resumo da Reunião") {
      setType("Relatório Final de Reunião")
      setTitle(data[2].data[1])
      setStartDate(data[3].data[1])
      setEndDate(data[4].data[1])

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element.data[0])
        if (index >= 8){
          let attIndex = attendees.indexOf(element.data[4])
          if (attIndex === -1){
            let att = attendees
            att.push(element.data[4]);
            setAttendees(att)

          }
          
        }
      }
    } else {
      if (data[0].data[0]=="Session Id") {
        setType("Relatório de Live")
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          console.log(element.data[0])
  
      }
    }
  }
    
    setRows(data);

    console.log(data);

  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    setRows([]);
    setTitle("");
    setType("");
    setAttendees([]);
    setStartDate("")
    setEndDate("")

    console.log('---------------------------');
  };


    
  const handleChange = (event) => setTitle(event.target.value)
  const handleStartDate = (event) => setStartDate(event.target.value)
  const handleEndDate = (event) => setEndDate(event.target.value)


  return (
    <Box margin="auto" maxWidth="800">
      <Text as="h1" fontSize="4xl" textAlign="center">
        Lista de Presença - Teams
      </Text >
      <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      <span>Arraste ou selecione a lista</span>
    </CSVReader>
    <Text fontSize="4xl">{title}</Text>
    <Tabs>
    <TabList>
    <Tab>Dados</Tab>
    <Tab>Lista</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>


    <FormControl>
      <FormLabel>Tipo de CSV</FormLabel>
      <Badge bgColor="green.300">{type}</Badge>
      <FormLabel>Título do Evento</FormLabel>
      <Input type="text" value={title} onChange={handleChange}></Input>
      <FormLabel>Início do Evento</FormLabel>
      <Input type="text" value={startDate} onChange={handleStartDate}></Input>
      <FormLabel>Fim do Evento</FormLabel>
      <Input type="text" value={endDate} onChange={handleEndDate}></Input>
    </FormControl>
    </TabPanel>
    {/* {attendees.map(e=><li>{e}</li>)} */}
    <TabPanel>

    <Table>
    {rows.map((r, i)=>{
      if(r.data.length >= 0){
        
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
</TabPanel>
</TabPanels>
</Tabs>
    <DarkModeSwitch />
    </Box>
)
}

export default Index
