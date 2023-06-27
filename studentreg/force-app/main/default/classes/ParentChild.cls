public class ParentChild{
  public static void InsertParentChild(){
  // Insert new accounts
        List<Account> ls = new List<Account>{
        new Account(name='Acme Inc.'),
        new Account(name='Acme')
        };

insert ls;
  }
}