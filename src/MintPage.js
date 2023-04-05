import { ethers } from 'ethers';
import { detect } from '@metamask/detect-provider';
import { useSpring, animated } from 'react-spring';
import styles from './MintPage.module.css';
import MyNFTContract from './MyNFTContract.json';
import detectEthereumProvider from '@metamask/detect-provider';

const MintPage = () => {
  const [mintAmount, setMintAmount] = useState(1);

  const handleMint = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const signer = new ethers.providers.Web3Provider(provider).getSigner();
        const contractAddress = '0x...'; // Замените на адрес вашего смарт-контракта
        const contract = new ethers.Contract(contractAddress, MyNFTContract.abi, signer);

        const mintTx = await contract.safeMint(account, { value: ethers.utils.parseEther(`${mintAmount * cost}`) });
        console.log('Minting in progress:', mintTx.hash);
        await mintTx.wait();
        console.log(`Successfully minted ${mintAmount} NFT(s)`);
      } catch (error) {
        console.error('Minting failed:', error);
      }
    } else {
      console.error('No Ethereum-compatible browser detected. Please install MetaMask.');
    }
  };

  const handleConnectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        console.log('Connected Wallet:', accounts[0]);
      } catch (error) {
        console.error('User rejected wallet connection:', error);
      }
    } else {
      console.error('No Ethereum-compatible browser detected. Please install MetaMask.');
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <Container sx={{ mt: 5 }}>
      <animated.div style={fadeIn}>
        <Typography variant="h4" className={styles.title}>
          NFT Minting
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={`${process.env.PUBLIC_URL}/icon3.png`} // Замените это ссылкой на изображение вашего NFT
                alt="NFT Image"
              />
              <CardContent>
                <Typography variant="h6">NFT Title</Typography>
                <Typography variant="body2" color="text.secondary">
                  NFT Description
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}> <TextField
          fullWidth
          type="number"
          label="Amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          className={styles.textField}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleMint}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Mint NFT
        </Button>
      </Grid>
    </Grid>
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleConnectWallet}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Connect Wallet
        </Button>
      </Grid>
    </Grid>
  </animated.div>
</Container>);
};

export default MintPage;