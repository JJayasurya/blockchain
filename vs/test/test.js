const assert = require("assert");
const Token = artifacts.require("./Token.sol");

contract ("Token",function (accounts){

   before( async function(){  
       instance = await Token.deployed();
       console.debug(`New token contract deployed - address: ${instance.address}`);  
   });


   it("should return name", async function(){
      const name_ = "tt coin";
      const _name = await instance.names();
      try{
         assert.equal(_name, name_ );
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(`--> Expected output result: ${_name} , but original result: ${name_}`);
         assert(error);
      }
   });

   it("should return symbol", async function(){
      const symbol_ = "tt";
      const _symbol = await instance.symbols();
      try{
         assert.equal(_symbol, symbol_);
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(` --> Expected output result: ${_symbol} , but original result: ${symbol_}`);
         assert(error);
      }
   });

   it("should return decimals", async function(){
      const decimal_ = 18;
      const _decimal = await instance.decimals();
      try{    
         assert.equal(_decimal , decimal_);
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(` --> Expected output result: ${_decimal} , but original result: ${decimal_}`);
         assert(error);
      }
   });

   it("should return totalsupply", async function(){
      const totalsupply_ = 2500;
      const _totalsupply = await instance.TotalSupply();
      try{
         assert.equal(_totalsupply, totalsupply_ );   
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(` --> Expected  output result: ${_totalsupply} , but original result: ${totalsupply_ }`);
         assert(error);
      }
   });

   it("should return the initial balance of owner ie. minted balance", async function(){
      const mint_ = 2500; 
      const _balance = await instance.balanceof(accounts[0]);
      try{
         assert.equal(_balance, mint_);
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(` --> Expected  output result: ${_balance}, but original result: ${mint_}`);
         assert(error);
      }
   });

   it("should transfer 500 from  owner", async function(){
      await instance.transfer(accounts[1],500,{from: accounts[0]});
      const balanceOfAccount0 = await instance.balanceof(accounts[0]);
      const balanceOfAccount1 = await instance.balanceof(accounts[1]);
      try{       
         assert.equal(balanceOfAccount0 .toNumber() , 2000);
         assert.equal(balanceOfAccount1 .toNumber() , 500);
      }
      catch(error){
         console.debug(`Error :: ${error.message}`);
         assert(error);
      }
   });


   it("approve by  owner", async function(){
      const ammount_ = 500;
      try{
         await instance.approve(accounts[1], ammount_, {from: accounts[0]});
         const _allowance = await instance.allowance(accounts[0], accounts[1], {from: accounts[0]});
         assert.equal(_allowance.toNumber(), ammount_);
      }
      catch(error){
         console.debug(`Error :: ${error.message}`);
         assert(error);
      }
   });

   it("transferfrom by  spender", async function(){
      const num_ = 100;
      await instance.transferfrom(accounts[0], accounts[1], 400, {from: accounts[1]});
      const rem_= await instance.allowance(accounts[0], accounts[1]);
      try{            
         assert.equal(rem_.toNumber(), num_);
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(`  --> Expected output result: ${num_} , but original result: ${rem_}`);
         assert(error);
      }
   });

   //-- Error condition ----
   it("error capturing_transferfrom by  spender", async function(){
      const num = 10;
      await instance.transferfrom(accounts[0], accounts[1], 50, {from: accounts[1]});
      var rem = await instance.allowance(accounts[0], accounts[1]);  
      try {      
         assert.equal(rem .toNumber(), num );
      }
      catch(error){
         console.debug(`Error ::${error.message}`);
         console.debug(` --> Expected output result: ${num}, but original result: ${rem}`);
         assert(error);
      }  
   });


});






