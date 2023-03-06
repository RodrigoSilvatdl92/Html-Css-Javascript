'use strict'
// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 5000,-2500, 2000,2500],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 5000,-2500, 5000,3500],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460, 5000,-2500, -2000,-1000],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90, 5000,-2500, 5000,2500, 5000,3500],
    interestRate: 1,
    pin: 4444, 
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US', 
  };
  
  const account5 = {
    owner: 'Rodrigo Silva',
    movements: [430, 1000, -700, 50, 2800, 90, 5000,-2500, 5000,-2500, 6000, 100],
    interestRate: 1,
    pin: 5555, 
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
  };
  
  const accounts = [account1, account2, account3, account4, account5];



// elements
//nav
const welcome = document.querySelector('.welcome')
const loginUser = document.querySelector('.login_input--user') 
const loginPin = document.querySelector('.login_input--pin') 
const btnLogin = document.querySelector('.btn_login')

// app

const app = document.querySelector('.app')

//balance 

const balanceDate = document.querySelector('.balance_date')
const balanceValue = document.querySelector('.balance_value')

//movements

const containerMovements = document.querySelector('.movements')

// operations transfer

const transferTo = document.querySelector('.form_input--to')
const transferValue = document.querySelector('.form_input--value') 
const btnTransfer = document.querySelector('.btn_operations--transfer')

// operations loan

const amountLoan = document.querySelector('.form_input--loan--amount')
const btnLoan = document.querySelector('.btn_operations--loan')

//operations close

const closeUser = document.querySelector ('.form_input--close--user')
const closePin = document.querySelector('.form_input--close--pin')
const btnClose = document.querySelector('.btn_operations--close')

// summary 

const summaryInEl = document.querySelector('.summary__value--in')
const summaryOutEl = document.querySelector('.summary__value--out')
const summaryInterestEl = document.querySelector('.summary__value--interest')
const btnSort = document.querySelector('.btn--sort')



let sorted = false ;

//display Movements

const displayMovements = function ( account, sort = false){
    
    const movs = sort ? account.movements.slice().sort((a,b)=> a-b) : account.movements

    containerMovements.innerHTML=''
    movs.forEach(function(movimento,index){
        const type = movimento > 0 ? 'deposit' : 'withdrawal'
        
        const date = new Date(account.movementsDates[index])
        const day = `${date.getDate()}`.padStart(2,0);
        const month = `${date.getMonth()+1}`.padStart(2,0);
        const year = date.getFullYear();
        const displayDate = `${day}/${month}/${year}`

        


        const html = `<div class="movements_row" >
        <p class="movements_type movements_type--${type}">${index + 1} ${type}</p>
        <p class="movements_date">${displayDate}</p>
        <p class="movements_value">${movimento.toFixed(2)}€</p>
    </div>`

    containerMovements.insertAdjacentHTML('afterbegin', html)

    })
}


//calculate balance

//const balanceDate = document.querySelector('.balance_date')

const displayBalance = function( account){
   const balance = account.movements.reduce((calc,movimento)=>calc + movimento,0)

   account.balance = balance
   balanceValue.textContent = `${balance}€`

   const now = new Date()
   const day = `${now.getDate()}`.padStart(2,0);
   const month = `${now.getMonth()+1}`.padStart(2,0);
   const year = now.getFullYear();
   balanceDate.textContent = `${day}/${month}/${year}`

}



// calculate summary

const displaySummary = function(account){

  const summaryIn = account.movements.filter(movs => movs > 0).reduce((acc,movs)=>acc + movs,0)
  summaryInEl.textContent = `${summaryIn}€` 

  const summaryOut = account.movements.filter(movs => movs < 0).reduce((acc,movs)=>acc + movs,0)
  summaryOutEl.textContent = `${-summaryOut}€` 

}




// juntar as 3funções

const updateUi = function(account){
  displayMovements(account)
  displayBalance(account)
  displaySummary(account)

}
updateUi(account1)

// create username

const createUsernames = function(){
    accounts.forEach(function(account,index){
      account.username = account.owner.toLowerCase().split(' ').map(words=>words[0]).join('')
      
    })

}

createUsernames()


const startLogOutTimer = function () {
  let time = 350
const tick = function(){

  const min = String(Math.trunc(time/60)).padStart(2,0)
  const sec = String(time % 60 ).padStart(2,0)

  



}



}




// função login
let currentAccount;





btnLogin.addEventListener('click',function(e){
  e.preventDefault()

  currentAccount = accounts.find(account=> account.username === loginUser.value)
  
  if(currentAccount?.pin === Number(loginPin.value)){

    



    welcome.textContent=`Welcome Back ${currentAccount.owner.split(' ')[0]}`
    app.style.opacity = 100;
    updateUi(currentAccount)
    loginUser.value = loginPin.value = ''
    loginPin.blur();




  }else{
    alert('User or Password wrong, Please, Try again')
    loginUser.value = loginPin.value = ''
    loginPin.blur();
    loginUser.focus();
    
  }
   sorted = false
})


//transferencia


btnTransfer.addEventListener('click',function(e){
 
  e.preventDefault()
  
  const amount = Number(transferValue.value);

  const receiverAccount = accounts.find(account => account.username === transferTo.value)

  if(currentAccount.balance>amount && currentAccount.balance > 0 && currentAccount.username !== receiverAccount && receiverAccount ){
    const date = new Date()
    
    currentAccount.movements.push(-amount)
    receiverAccount.movements.push(amount)

    currentAccount.movementsDates.push(date.toISOString())
    receiverAccount.movementsDates.push(date.toISOString())

    updateUi(currentAccount)
    transferTo.value = transferValue.value = '';
    transferValue.blur();
    alert('Transfer Done Correctly!')
  }else{
    alert('Transfer not Valid!, please introduce valid data')
    transferTo.value = transferValue.value = '';
    transferValue.blur();
    transferTo.focus()
  }

})

//emprestimo

btnLoan.addEventListener('click',function(e){

  e.preventDefault()
  const amount = Number(amountLoan.value)

  const hasCondition = currentAccount.movements.some(mov=> mov >= amount/10)
  const date = new Date()
  currentAccount.movementsDates.push(date.toISOString())
  if(hasCondition){

    setTimeout(function(){

    currentAccount.movements.push(amount)
    currentAccount.movementsDates.push(date.toISOString())
    updateUi(currentAccount)
    alert('Loan Request Accepted')
    amountLoan.value = '';
    amountLoan.blur();
    },1500)
    
  }else{
    alert('Loan Not Permited')
  }
  
})

//fechar conta

btnClose.addEventListener('click',function(e){

  e.preventDefault()
  if(currentAccount.username === closeUser.value && currentAccount.pin === Number(closePin.value)){
    const index = accounts.findIndex(account => account.username === currentAccount.username)
    accounts.splice(index,1);
    app.style.opacity = 0;
    welcome.textContent = `Log in to get started`
    closeUser.value = closePin.value = ''
  }else{
    alert('Wrong User and/or Pin')
  }

})

//sort movements

btnSort.addEventListener('click',function(e){

  e.preventDefault()
  displayMovements(currentAccount,!sorted)
  sorted = !sorted

})
