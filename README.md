# JS Validation!  
import in component   
``` javascript  
import Validation from 'js-validation-serjik'  
```  
  
## single mode   
### use :  
``` javascript  
let data = 'input text';  
let rule = 'string|min:10'; 
let label = "label";
  
Validation.validate(data, rule, label,true);  
```  
> **Note**: label can be false, and if it has string value show it in error message 
### result :  
``` javascript  
{  
    errors: {  
       errors: ['message number one', 'message number tow'],  
    },  
    fails: true  // boolean = if has error is true else is false  
}  
```  
> **Note**:  if the action has validation error **fails** property is **true** and if does not has it is **false**  
## group mode   
### use:  
``` javascript  
let data = {  
   name: 'john',  
   last_name: 'doe',  
   age: 17,  
};
  
let rules = {  
   name: 'string|max:20',  
   age: 'integer',  
}; 
 
let labels = {
	name: 'your name',
	last_name: 'your last name',
	age; 'your age'
};
  
Validation.validate(data, rules, labels);  
```  
  
### result :  
``` javascript  
{  
    errors: {  
       field_name: ['message number one', 'message number tow'],  
       age: ['must be integer'],   
       // ...  
    },  
    fails: true  // boolean = if has error is true else is false  
}  
```  
  
## Rules :  
> **Note**;  when use rules must be split with `|` like this, `'rule1|rule2|rule3...'`  
  
|title          | description                |use                         |  
|---------------|--------------------------------|----------------------------|  
|string          |check the value is string      |`string`                     |  
|integer         |check the value is number      |`integer`                    |  
|min             |check value length lower than this|`min:{number}` like this `min:25`|  
|max             |check value length bigger than this|`max:{number}` like this `max:50`|  
|required        |check value exist and unequal with null|`required`|  
|in              |check value is in a array      |`in:1,2,3,4,...` these numbers is your array indexes|  
|start with      |check value started by this    |`start_with:{letter}` like this `start_with:a`|  
|persian alpha   |check words are persian alpha  |`persian` |  
|english alpha   |check words are english alpha  |`english`|  
|email           |check email format             |`email`|
|phone           |check phone number             |`phone`|
