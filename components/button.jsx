import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Button, Box, Heading } from '@chakra-ui/react'

const Message = ({ text }) => {
  return (
    <Box>
      <Heading>{text}</Heading>
    </Box>
  )
}

// ESTO ES UN COMPONENTE DE PRUEBA - NO UTILIZAR!
// SE DEBE UTILIZAR EL OTRO COMPONENTE QUE SE LLAMA "HOME"
// NO SEAN GATOS! NI AUTH0 IMPLEMENTO ESTA SOLUCIÓN! 
// ME ESTAN HACIENDO LIBERAR UN CÓDIGO QUE LA VA A REE PEGAR!

const ButtonCustom = () => {
  const [customChain, setCustomChain] = useState(null)
  const [id, setId] = useState({})
  const [error, setError] = useState(false)

  const custom = [
    {
      chainId: '0x64', // esto esta harco la info tiene que ser dinamica
      chainName: 'xDai',
      nativeCurrency: {
        name: 'xDai',
        symbol: 'xDai',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.xdaichain.com/'],
    },
  ]

  const addChain = async (params) => {
    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const getAddress = await provider.send('eth_requestAccounts', [])

      await signer.provider.send('wallet_addEthereumChain', params)
      const network = provider.getNetwork()

      network
        .then((result) => {
          setId({
            chainId: result.chainId,
            address: getAddress[0],
            network: result.name,
          })
        })
        .catch((err) => {
          console.log('Message Error >>> ', err)
        })

      console.log(`Switch to ${params[0].chainName}`)
      setCustomChain(params[0])
    } catch (err) {
      setError(true)
    }
  }

  useEffect(() => {
    if (!window.ethereum) {
      setError(true)
    }
    setError(false)
    //setId(network)
  }, [])

  return (
    <div>
      {!error ? (
        <Box p={25}>
          <div>
            <p>ChainId: {parseInt(customChain?.chainId) || id?.chainId} </p>
            <p>Name Network: {customChain?.chainName || id?.network} </p>
            <p>My Address: {id?.address} </p>
            {console.log('fer chain >> ', id)}
          </div>
          <br />
          <Button
            colorScheme="blue"
            onClick={() => {
              addChain(custom)
            }}
          >
            Add xDai Network
          </Button>
        </Box>
      ) : (
        <Message text="errorrr" />
      )}
    </div>
  )
}

export default ButtonCustom
