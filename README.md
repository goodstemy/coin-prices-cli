# coin-prices-cli

### Description
Basically this is just cli for usage if you doesn't want to leave your teminal :)

### How to use
```
>npm i coin-prices-cli -g
THEN
> coin-prices-cli
OR
> coin-prices-cli --help
OR
> coin-prices-cli help

# You should see help page
< How to use coin-prices-cli:

    --help XOR help             : Show all available commands to provide
    --all XOR all               : Show all available tokens to use in price
    --price=weth XOR price=weth : Return usd price of provided token name

This software is opensource and using coingecko api with free tier. Limited with 10-30* request per minute.
```

### How to get price
```
> coin-prices-cli --price=weth

# You should see response

< 1 WETH = 1754.54$
```

### How to see all available tokens
```
> coin-prices-cli --all

# Looooong list of tokens will see
< Available tokens:
zoc
zcn
vix
zrx
0x0
0xa
oxd
oxd v2
0xmr
shield
tshp
1337
realt-s-14066-santa-rosa-dr-detroit-mi
realt-s-1617-s.avers-ave-chicago-il
1art
1bch
1doge
1eco
water
1inch
yv1inch
1mil
1mb
1mt
1peco
....
```

#### Author
Efremov I. goodstemy (c)
