import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Box, Heading } from "@chakra-ui/react";

const Message = ({ text }) => {
  return (
    <Box>
      <Heading>{text}</Heading>
    </Box>
  );
};

// NO SEAN GATOS! NI AUTH0 IMPLEMENTO ESTA SOLUCIÓN EN SU DEMO LOGIN WEB3! 
// ME ESTAN HACIENDO LIBERAR UN CÓDIGO QUE LA VA A REE PEGAR EN EL MERCADO!
// TODO POR NACHO QUE QUIERE LOS REPOS PUBLICOS JAJAJAJA

const Home = () => {
  const [customChain, setCustomChain] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);

  const netWork = async () => {
    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const getAddress = await provider.send("eth_requestAccounts", []);
      const network = provider.getNetwork();

      network
        .then((result) => {
          setId({
            chainId: result.chainId,
            address: getAddress[0],
            network: result.name
          });
        })
        .catch((err) => {
          console.log("Message Error >>> ", err);
        });
    } catch (err) {
      setError(true);
    }
  };

  const addNetwork = (params) => {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params
      })
      .then(() => {
        console.log(`Switch to ${params[0].chainName}`);
        setCustomChain(params[0]);
      })
      .catch((err) => {
        console.log("Message Error >>> ", err);
      });
  };

  const addCustomChain = async (e) => {
    await addNetwork([
      {
        chainId: "0x64", // esto esta harco la info tiene que ser dinamica
        chainName: "xDai",
        nativeCurrency: {
          name: "xDai",
          symbol: "xDai",
          decimals: 18
        },
        rpcUrls: ["https://rpc.xdaichain.com/"]
      }
    ]);
  };

  useEffect(() => {
    if (!window.ethereum) {
      setError(true);
    }
    setError(false);
    setId(netWork);
  }, []);

  return (
    <div>
      {!error ? (
        <Box p={25}>
          <div>
            <p>ChainId: {parseInt(customChain?.chainId) || id?.chainId} </p>
            <p>Name Network: {customChain?.chainName || id?.network} </p>
            <p>My Address: {id?.address} </p>
          </div>
          <br />
          <Button colorScheme="blue" onClick={addCustomChain}>
            Add xDai Network
          </Button>
        </Box>
      ) : (
        <Message text="No tenes instalado Metamask" />
      )}
    </div>
  );
};

export default Home;
