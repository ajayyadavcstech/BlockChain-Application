import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Int64 "mo:base/Int64";
import Int16 "mo:base/Int16";
import Int32 "mo:base/Int32";




actor Web3bank {
  var lastLoggedUser :Text = "";
  type Customer = {
    accountNumber : Text;
    password : Text;
    fullName : Text;
    age : Int;
    mobileNumber : Int64;
    curBalance : Int64;
  };
  let Bank = HashMap.HashMap<Text, Customer>(10, Text.equal, Text.hash);

  public func addCustomer(AccountNumber : Text, Password : Text, Name : Text, Age : Int, MobileNumber : Int64, Balance : Int64) {
    let newCustomer : Customer = {
      accountNumber = AccountNumber;
      password = Password;
      fullName = Name;
      age = Age;
      mobileNumber = MobileNumber;
      curBalance = Balance;
    };
    Bank.put(AccountNumber, newCustomer);

  };

  public func RegisterUser(AccountNumber : Text, Password : Text, Name : Text, Age : Int, MobileNumber : Int64) : async Int {
    if (Bank.get(AccountNumber) == null) {
      addCustomer(AccountNumber, Password, Name, Age, MobileNumber, 0);
      return 1;
    };
    return -1;
  };

  public func LoginUser(AccountNumber : Text, Password : Text) : async Int {
    if (Bank.get(AccountNumber) != null) {
      let ?user : ?Customer = Bank.get(AccountNumber);
      if (user.password == Password){
        lastLoggedUser := user.accountNumber;
        return 1;
      } 
    };
    return -1;
  };
  func customerToJson(customer: Customer): Text {
  let json = "{ \"accountNumber\": \"" # customer.accountNumber # "\", \"password\": \"" # customer.password # "\", \"fullName\": \"" # customer.fullName # "\", \"age\": " # Int.toText(customer.age) # ", \"mobileNumber\": " # Int64.toText(customer.mobileNumber) # ", \"curBalance\": " # Int64.toText(customer.curBalance) # " }";
  return json;
};

  public func getCustomerInfo() : async Text {
    let AccountNumber : Text = lastLoggedUser;
    if (Bank.get(AccountNumber) == null) {
      return "{}";
    };
    let ?customer : ?Customer = Bank.get(AccountNumber);
    return customerToJson(customer);
  };

  public func TopUp(AccountNumber : Text, topUpAmount : Int64) : async Int {
    if (Bank.get(AccountNumber) == null) return -1;
    let ?customer : ?Customer = Bank.get(AccountNumber);
    let user : Customer = {
      accountNumber = customer.accountNumber;
      password = customer.password;
      fullName = customer.fullName;
      age = customer.age;
      mobileNumber = customer.mobileNumber;
      curBalance = customer.curBalance +topUpAmount;
    };
    Bank.put(AccountNumber, user);
    return 1;
  };

  public func Withdraw(AccountNumber : Text, WithdrawAmount : Int64) : async Int {
    if (Bank.get(AccountNumber) == null) return -1;
    let ?customer : ?Customer = Bank.get(AccountNumber);
    if (customer.curBalance >= WithdrawAmount) {
      let user : Customer = {
        accountNumber = customer.accountNumber;
        password = customer.password;
        fullName = customer.fullName;
        age = customer.age;
        mobileNumber = customer.mobileNumber;
        curBalance = customer.curBalance -WithdrawAmount;
      };
      Bank.put(AccountNumber, user);
      return 1;
    };
    return -1;
  };

  public func TransferFund(fromAccount : Text, toAccount : Text, Amount : Int64) : async Int {
    if (Bank.get(toAccount) == null) return -1;
    let isSufficientBalance : Int = await Withdraw(fromAccount, Amount);
    if (isSufficientBalance == -1) {
      return -1;
    };
    let isTranferSucceeded = await TopUp(toAccount, Amount);
    return 1; 
  };
};
