pragma abicoder  v1;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    constructor(address to, uint256 supply, string memory name, string memory symbol) ERC20(name, symbol){
        _mint(to, supply);
    }
}

contract FactoryPattern{

   mapping(address => MyToken[]) tokenAddresses;

   function createToken(
       address msgsender,
       uint256 supply,
       string memory _name,
       string memory _symbol
   )
   public
   {
        MyToken token = new MyToken(msgsender,supply,_name, _symbol);
        tokenAddresses[msgsender].push(token);
   }

   function getAllAddresses(
       address msgsender
   )
   public
   view
   returns(MyToken[] memory){
       return tokenAddresses[msgsender];
   }
}