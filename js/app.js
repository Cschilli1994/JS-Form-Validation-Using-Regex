
//                            Basic Info
//===============================================================================
const $name = $('#name');
  //start user in name input box
  $name.focus();

//hides input for other job role
const $otherJob = $('#otherJob');
$otherJob.hide();

const $email = $("#mail");
const $jobRole = $("#title");
//--------------------------Name-------------------------------------------------
    //Check Name has at least 2 char (space) 2 char.
function checkName(name){
  return /[\w]{2,20}\s[\w]{2,20}/i.test(name);
}


//--------------------------Email------------------------------------------------
    //Check for valid email format  Chars@chars.3chars
function checkMail(mail){
  return /[a-z|0-9]{2,20}@[a-z]{3,10}.[a-z]{3}/i.test(mail);
}


//--------------------------JobRole----------------------------------------------
   //Display job role text input when Other Role is selected
const $job = $('#job');
$job.on('change', function(){
  
  if($jobRole.val()==='other'){
    $otherJob.show();
  }else{
    $otherJob.hide();
  }
});

//                            T-Shirt Info
//===============================================================================
const $shirtBox = $('.shirt');
const $Color = $('#color');
const $colorOption = $('#color option');
//hides color option
const $tColors = $('#colors-js-puns');
  $tColors.hide();
//-------------------
$shirtBox.on('change', function(e){
  if (e.target.name ==='user-design'){
    if(e.target.value==='Select Theme'){
      $tColors.hide();
    }else{
    //display color option selection
      $tColors.show();
      $Color.prop("selectedIndex", 0);
      //check t shirt design
      if(e.target.value==='js puns'){
       //only display available colors for design
       $colorOption.slice(1,4).show();
       $colorOption.slice(4,).hide();
      }
        //check t shirt design
       if(e.target.value==='heart js'){
         //only display available colors for design
         $colorOption.slice(1,4).hide();
         $colorOption.slice(4,).show();
      }
    }
  }
});

//                            Activities
//===============================================================================
//check for atleast one selected event
let totalCost = 0;
let activitesChecked = 0;
$('.activities').on('change' , function(e){
  
  
  const cost = parseInt(e.target.dataset.cost);
  //add total cost of selected and display at bottom of section
  if(e.target.checked){
    totalCost +=cost;
    activitesChecked += 1;
    $('#totalCost').text('Total Cost: $'+totalCost+'.');
    if(totalCost>0){
      $('#totalCost').show();
    }
  }else{
    totalCost -= cost;
    activitesChecked -= 1;
    $('#totalCost').text('Total Cost: $'+totalCost+'.');
    if(totalCost===0){
      $('#totalCost').hide();
    }
  }
  const $allActivities = $('.activities input');
  $allActivities.each(activity => {
    if($allActivities[activity]!==e.target && $allActivities[activity].dataset.dayAndTime === e.target.dataset.dayAndTime){
      //check for no conflicting events and grey them out
      if(e.target.checked){
        $allActivities.eq(activity).attr('disabled',true);
        $allActivities.eq(activity).parent().css({color:'grey'});
      
      }else{
        $allActivities.eq(activity).attr('disabled',false);
        $allActivities.eq(activity).parent().css({color:'black'});
        
      }
    }
  });
});



//                            Payment Option
//===============================================================================
//hides all payment option displays 
const $creditCard = $('#credit-card');
  $creditCard.hide();
const $bitcoin = $('#bitcoin');
  $bitcoin.hide();
const $paypal = $('#paypal');
  $paypal.hide();
//------------------------------------
const $payField = $('#payment');
//check payment type
let paymentIndex;
let selectedPayment;
//display correct div for selected method and hides previous method
function displayPaymentOption(payment , hideOrShow){
    const payMethod = $('#'+payment);
    if(hideOrShow==='show'){
        payMethod.show();
    }else{
        payMethod.hide();
    }
}
$payField.on('change', function(e){ 
    if(e.target.id==="payment"){
        //removes previous payment method information
        if(paymentIndex>=0){
        displayPaymentOption(selectedPayment[paymentIndex].value,'hide');
        }
        //sets to selected payment index
        paymentIndex =  e.target.selectedIndex;
        selectedPayment = e.target.children;
        displayPaymentOption(selectedPayment[paymentIndex].value,'show');
    }
});

  //----------------------------credit card-----------------------------------------
    //check credit card number is 13-16 numbers
    function checkCreditCard(CCnum){
        return /[0-9]{13,16}/.test(CCnum);
      }
    // check CVV code is 3-4 digits
    function checkCVV(CVV){
        return /[0-9]{3}/.test(CVV);;
      }
    // check postal code is 5 digits
    function checkZip(zip){
        return /[0-9]{5}/.test(zip);
      }
      
//                            Submit/validation
//===============================================================================
const form = $('form');
let error;

function validate(checkFunc, selector, textvalue, e){
  //changes incorrect fields to pink and adds a red error message
  if(!checkFunc(selector.val())){
    e.preventDefault();
  
    selector.css({background:"pink"});
    if(selector.prev().prop("tagName")!=="P"){
      error = $('<p style="color:red">'+textvalue+'</p>').insertBefore(selector);
    }
    //changes correct input to green and removes any error message
    }else if(checkFunc(selector.val())){
      selector.css({background:"lightgreen"});
        if(selector.prev().prop("tagName")==="P"){
          selector.prev().remove()
          
        }
      
  }
}
form.on('submit',function(e){
  validate(checkName,$name,"Incorrect Name format.",e);
  validate(checkMail, $email, "Incorrect email format 'email@mail.com'",e);
 //check for an activity selected
  if(activitesChecked<=0){
  $('.activities legend').text('Select atleast one activity!').css({color:'red'});
 }else{
  $('.activities legend').text('Register for Activities').css({color:'darkblue'});
 }
  //if credit card selected validate card info
  if(paymentIndex===1){
    validate(checkCreditCard, $('#cc-num'),"Invalid Credit Card Number must be 13-16 digits.", e);
    validate(checkCVV, $('#cvv'),"Invalid CVV must be 3 digits.", e);
    validate(checkZip, $('#zip'),"Invalid zip code must be 5 digits.", e);
  }
});
