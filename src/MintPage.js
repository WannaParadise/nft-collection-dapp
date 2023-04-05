import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import styles from './MintPage.module.css';

const MintPage = () => {
  const [mintAmount, setMintAmount] = useState(1);

  const handleMint = () => {
    // Здесь будет ваш код для минтинга NFT
    console.log(`Minting ${mintAmount} NFT(s)`);
  };

  const handleConnectWallet = () => {
    // Здесь будет ваш код для подключения кошелька
    console.log('Connecting Wallet');
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className={styles.textField}
            />     <Button
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
    </Container>
  );
};

export default MintPage;