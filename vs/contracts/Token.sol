//SPDX-License-Identifier: jan
pragma solidity ^0.8.0;
// impoting safemath lib to avoid unnecessary errors 

library safeMath{

    function safeSub(uint _a , uint _b) pure internal returns(uint){
        assert(_b <= _a);
        uint c = _a - _b;
        return c;

    }

      function safeAdd(uint _a , uint _b) pure internal returns(uint){
        uint c = _a + _b;
        assert(c >= _a);
        return c;

    }
}


contract Token {
   
       string public  name;
       string public  symbol;
       uint public decimal;

       using safeMath for uint;

       //mapping
       mapping(address => uint) balance;
       mapping(address => mapping(address => uint)) allowed;

       //event
       event Transfer(address indexed from , address indexed to , uint token );
       event approval(address indexed owner, address indexed sender , uint token );

        uint  public totalSupply ; 
       constructor(string memory _name, string memory _symbol, uint _decimal, uint  _totalSupply)  {
           name = _name;
           symbol = _symbol;
          decimal = _decimal;
          totalSupply = _totalSupply;
          balance[msg.sender] = totalSupply;
       }

       function names() public view  returns (string memory) {
        return name;
    }

    
    function symbols() public view  returns (string memory) {
        return symbol;
    }

       function decimals() pure public   returns (uint8) {
        return 18;
    }

       function TotalSupply() view public   returns(uint){
           return totalSupply;
       }

       

       function balanceof(address _tokenOwner) view public returns(uint){
           return balance[_tokenOwner];
       }

       function transfer(address _reciver , uint _numToken) public  returns(bool){
           require(  _numToken <= balance[msg.sender]  );
           balance[msg.sender] = balance[msg.sender] .safeSub(_numToken);
           balance[_reciver] = balance[_reciver] .safeAdd(_numToken);
           emit Transfer (msg.sender, _reciver,_numToken);
           return true;


       }

       function approve(address _spender,uint _numToken) public returns(bool){
           allowed[msg.sender][_spender] = _numToken;
           emit approval(msg.sender, _spender , _numToken);
           return true;
       }

       function allowance(address _owner  , address _spender) public view returns(uint){
           return allowed[_owner][_spender];
       }

       function transferfrom(address _owner , address _spender 
       , uint _numToken) public returns(bool){
           require(_numToken <= balance[msg.sender] );
           require(_numToken <= allowed[_owner][_spender]);
           balance[msg.sender]= balance[msg.sender] .safeSub (_numToken);
           allowed[_owner][_spender] = allowed[_owner][_spender] .safeSub (_numToken);
           balance[_spender] = balance[_spender] .safeAdd(_numToken);
           emit Transfer(_owner, _spender , _numToken );
           return true;
           
       }





       


 }