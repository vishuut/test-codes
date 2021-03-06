<script>
$('.rmspoc-users').hide();
$('.rmspoc-users').closest('div.form-group').hide();

$(document).on('change', '.Frequency', function() {
  var frequencyVal = $('.Frequency').val();
   if(frequencyVal  === 'First Time') {
     $('.Frequency').after('<span class=FirstTime style=width:75%;margin-left:auto;margin-top:3px;font-size:15px;>The event has happened for the first time.</span>');
    $('.Repeat').hide();
    $('.Recurring').hide();
  }else if(frequencyVal  === 'Repeat'){
    $('.Frequency').after('<span class=Repeat style=width:75%;margin-left:auto;margin-top:3px;font-size:15px;>The event has happened previously.</span>');
    $('.FirstTime').hide();
    $('.Recurring').hide();
  }else if(frequencyVal  === 'Recurring') {
    $('.Frequency').after('<span class=Recurring style=width:75%;margin-left:auto;margin-top:3px;font-size:15px;>The event happens repeatedly at fixed/random interval.</span>');
    $('.FirstTime').hide();
    $('.Repeat').hide();
  }else {
    $('.FirstTime').hide();
    $('.Repeat').hide();
    $('.Recurring').hide();
  }
});

$('input[name*=DateofOccurrence]').datepicker({
  dateFormat : 'dd/M/yy',
  changeMonth : true,
  changeYear : true,
  maxDate : new Date(),
  gotoCurrent : true
  });

function changeType(impConstVal) {
  if(impConstVal == 'Customer') {
      $('.Type').empty();
      var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Ex-Gratia Payout';
    option1.value = 'Ex-Gratia Payout';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)';
    option2.value = 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)';
    $('.Type').append(option2);
    var option3 = document.createElement('option');
    option3.text = 'IMU Payout';
    option3.value = 'IMU Payout';
    $('.Type').append(option3);
    var option4 = document.createElement('option');
    option4.text = 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)';
    option4.value = 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)';
    $('.Type').append(option4);
    var option5 = document.createElement('option');
    option5.text = 'Excessive payout to customers';
    option5.value = 'Excessive payout to customers';
    $('.Type').append(option5);
    var option6 = document.createElement('option');
    option6.text = 'Litigation';
    option6.value = 'Litigation';
    $('.Type').append(option6);
    var option7 = document.createElement('option');
    option7.text = 'PPHI Interest';
    option7.value = 'PPHI Interest';
    $('.Type').append(option7);
    var option8 = document.createElement('option');
    option8.text = 'Short Premium Funding';
    option8.value = 'Short Premium Funding';
    $('.Type').append(option8);
    var option9 = document.createElement('option');
    option9.text = 'Fraud Losses';
    option9.value = 'Fraud Losses';
    $('.Type').append(option9);
    var option10 = document.createElement('option');
    option10.text = 'Medicals conducted but proposal not converted';
    option10.value = 'Medicals conducted but proposal not converted';
    $('.Type').append(option10);
    var option11 = document.createElement('option');
    option11.text = 'Revival Fee campaign';
    option11.value = 'Revival Fee campaign';
    $('.Type').append(option11);
    var option12 = document.createElement('option');
    option12.text = 'Mortality experience';
    option12.value = 'Mortality experience';
    $('.Type').append(option12);
    var option13 = document.createElement('option');
    option13.text = 'Incorrect NAV';
    option13.value = 'Incorrect NAV';
    $('.Type').append(option13);
    var option14 = document.createElement('option');
    option14.text = 'Any operational incident';
    option14.value = 'Any operational incident';
    $('.Type').append(option14);
     
    var option15 = document.createElement('option');
    option15.text = 'Others';
    option15.value = 'Others';
    $('.Type').append(option15);

    }else if(impConstVal == 'Employees'){
        $('.Type').empty();
    var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Interest paid for any deficiency in services (Delay in Gratuity, PF, etc.)';
    option1.value = 'Interest paid for any deficiency in services (Delay in Gratuity, PF, etc.)';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Litigation';
    option2.value = 'Litigation';
    $('.Type').append(option2);
    var option3 = document.createElement('option');
    option3.text = 'Ex-gratia payouts';
    option3.value = 'Ex-gratia payouts';
    $('.Type').append(option3);
    var option4 = document.createElement('option');
    option4.text = 'Write-off';
    option4.value = 'Write-off';
    $('.Type').append(option4);
        var option5 = document.createElement('option');
    option5.text = 'ADM Non-Starters (M3/M6)';
    option5.value = 'ADM Non-Starters (M3/M6)';
    $('.Type').append(option5);


    }else if(impConstVal == 'Agents'){
      $('.Type').empty();
      var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Write-off';
    option1.value = 'Write-off';
    $('.Type').append(option1);  
    var option2 = document.createElement('option');
    option2.text = 'Terminated Negative Balance';
    option2.value = 'Terminated Negative Balance';
    $('.Type').append(option2);   


    }else if(impConstVal == 'Vendor'){
        $('.Type').empty();
    var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Write off';
    option1.value = 'Write off';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Excessive/Negative Payout';
    option2.value = 'Excessive/Negative Payout';
    $('.Type').append(option2);

    }else if(impConstVal == 'Regulator'){
        $('.Type').empty();
    var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Penalties';
    option1.value = 'Penalties';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Litigation/Ombudsman';
    option2.value = 'Litigation/Ombudsman';
    $('.Type').append(option2);
    }else if(impConstVal == 'Investment'){
        $('.Type').empty();
      var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Loss of interest/dividend/coupon/corporate actions';
    option1.value = 'Loss of interest/dividend/coupon/corporate actions';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Impairment loss';
    option2.value = 'Impairment loss';
    $('.Type').append(option2);
        var option3 = document.createElement('option');
    option3.text = 'Loss on Rental Income';
    option3.value = 'Loss on Rental Income';
    $('.Type').append(option3);

    }else if(impConstVal == 'Other Losses'){
        $('.Type').empty();
    var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    var option1 = document.createElement('option');
    option1.text = 'Write-offs';
    option1.value = 'Write-offs';
    $('.Type').append(option1);
    var option2 = document.createElement('option');
    option2.text = 'Technology related cost outage';
    option2.value = 'Technology related cost outage';
    $('.Type').append(option2);

    }else{
        $('.Type').empty();
    var option = document.createElement('option');
    option.text = 'Select';
    option.value = '';
    $('.Type').append(option);
    }
}

//function for type value depends on Impacted Constituent
  $(document).on('change', '.ImpactedConstituent', function(){   
    var impConstVal = $('.ImpactedConstituent').val();
    changeType(impConstVal);
  });

//function for e  - + validations on number fields on EstimatedLoss.
$(document).on('keydown', '.EstimatedLoss', function(e){
  if ([69, 187, 188, 189].includes(e.keyCode)) {
    e.preventDefault();
  }
});

//function for e  - + validations on number fields on ActualLoss.
$(document).on('keydown', '.TotalActualLoss', function(e){
  if ([69, 187, 188, 189].includes(e.keyCode)) {
    e.preventDefault();
  }
});

//function for e  - + validations on number fields on Impactedcount.
$(document).on('keydown', '.Totalimpactedstakeholdercount', function(e){
  if ([69, 187, 188, 189].includes(e.keyCode)) {
    e.preventDefault();
  }
});

//  Type field required validation.
$(document).on('change', '.Category', function(){
  var val = $('.Category').val();
  if(val == 'Loss'){
    $('.Type').attr('validation','required');   
    $('.ImpactedConstituent').attr('validation','required');
  }else{
    $('.Type').attr('validation','');
    $('.ImpactedConstituent').attr('validation','');
  }
})


// function for get form state and restrict fields.
  $(document).ready(function(){
    var formState = $('.form-status').val();
    
    if(typeof formState === 'undefined' || formState === ''){
      var userInfo = JSON.parse($('.userJsonData').val());
      $('.Managerofuser').val(userInfo['userManagerName']);
      $('.Functionoftheuser').val(userInfo['userDepartment']);
      $('.RiskCategory').hide();
      $('.RiskCategory').closest('div.form-group').hide();
      $('.ReputationalImpact').hide();
      $('.ReputationalImpact').closest('div.form-group').hide();
      $('.ComplianceImpact').hide();
      $('.ComplianceImpact').closest('div.form-group').hide();
      $('.LossStatus').hide();
      $('.LossStatus').closest('div.form-group').hide();
      $('.RiskCommentsActionstaken').hide();
      $('.RiskCommentsActionstaken').closest('div.form-group').hide();
      $('#Approvers').hide();
      $('#Approvers').closest('div.form-group').hide();
      $('#AutoApproval').hide();
      $('#AutoApproval').closest('div.form-group').hide();
    }
    if(formState === 'draft'){
      var userInfo = JSON.parse($('.userJsonData').val());
      $('.Managerofuser').val(userInfo['userManagerName']);
      $('.Functionoftheuser').val(userInfo['userDepartment']);
      $('.RiskCategory').hide();
      $('.RiskCategory').closest('div.form-group').hide();
      $('.ReputationalImpact').hide();
      $('.ReputationalImpact').closest('div.form-group').hide();
      $('.ComplianceImpact').hide();
      $('.ComplianceImpact').closest('div.form-group').hide();
      $('.LossStatus').hide();
      $('.LossStatus').closest('div.form-group').hide();
      $('.TotalActualLoss').attr('disabled','disabled');
      $('.Totalimpactedstakeholdercount').attr('disabled','disabled');
      $('.RiskCommentsActionstaken').hide();
      $('.RiskCommentsActionstaken').closest('div.form-group').hide();
      $('#Approvers').hide();
      $('#Approvers').closest('div.form-group').hide();
      $('#AutoApproval').hide();
      $('#AutoApproval').closest('div.form-group').hide();
    }
    if(formState === 'pending'){
    $('.Category').attr('disabled','disabled');
    $('.ImpactedConstituent').attr('disabled','disabled');
    $('.Type').attr('disabled','disabled');
    $('.Description').attr('disabled','disabled');
    $('.DateofOccurrence').attr('disabled','disabled');
    $( 'input[id^=ImpactedProcess]' ).attr('disabled','disabled');
    $('.Frequency').attr('disabled','disabled');
    $('.EstimatedLoss').attr('disabled','disabled');
    $('.TotalActualLoss').attr('disabled','disabled');
    $('.Totalimpactedstakeholdercount').attr('disabled','disabled');
    $( 'input[id^=ImpactedStakeholders]' ).attr('disabled','disabled');
    $( 'input[id^=ImpactedLOB]' ).attr('disabled','disabled');
    $( 'input[id^=Channel]' ).attr('disabled','disabled');
    $('.Recoverytobemade').attr('disabled','disabled');
    $( 'input[id^=RelatedDocument]' ).attr('disabled','disabled');
    
    $('.RiskCategory').attr('validation','required');
      $('.ReputationalImpact').attr('validation','required');
      $('.ComplianceImpact').attr('validation','required');
      $('.LossStatus').attr('validation','required');
      $('.RiskCommentsActionstaken').attr('validation','required');
      $('#Approvers').attr('validation','required');
  }
   var impConstVal = $('.ImpactedConstituent').val();
         changeType(impConstVal); 
         var content = JSON.parse($('.form-contnet-json').val());
         var i ;
         for(i=0; i < content.length; i++ ) {
           if(content[i].id === 'Type') {
             $('.Type').val(content[i].value);
           }
         }
  });
  
function showPPHIInterest() {
  $('.CompanyInitiatedActualLoss').show();
  $('.CompanyInitiatedActualLoss').closest('div.form-group').show();
  $('.CompanyInitiatedActualLoss').attr('validation','required');
  $('.CustomerInitiatedActualLoss').show();
  $('.CustomerInitiatedActualLoss').closest('div.form-group').show();
  $('.CustomerInitiatedActualLoss').attr('validation','required');
  $('.CompanyInitiatedImpactedcount').show();
  $('.CompanyInitiatedImpactedcount').closest('div.form-group').show();
  $('.CompanyInitiatedImpactedcount').attr('validation','required');
  $('.CustomerInitiatedImpactedcount').show();
  $('.CustomerInitiatedImpactedcount').closest('div.form-group').show();
  $('.CustomerInitiatedImpactedcount').attr('validation','required');
}

function hidePPHIInterest() {
  $('.CompanyInitiatedActualLoss').hide();
  $('.CompanyInitiatedActualLoss').closest('div.form-group').hide();
  $('.CompanyInitiatedActualLoss').attr('validation','');
  $('.CustomerInitiatedActualLoss').hide();
  $('.CustomerInitiatedActualLoss').closest('div.form-group').hide();
  $('.CustomerInitiatedActualLoss').attr('validation','');
  $('.CompanyInitiatedImpactedcount').hide();
  $('.CompanyInitiatedImpactedcount').closest('div.form-group').hide();
  $('.CompanyInitiatedImpactedcount').attr('validation','');
  $('.CustomerInitiatedImpactedcount').hide();
  $('.CustomerInitiatedImpactedcount').closest('div.form-group').hide();
  $('.CustomerInitiatedImpactedcount').attr('validation','');
}

function showClaimsPayouts() {
  $('.ServicePromiseInterestActualLoss').show();
  $('.ServicePromiseInterestActualLoss').closest('div.form-group').show();
  $('.ServicePromiseInterestActualLoss').attr('validation','required');
  $('.LitigationsActualLoss').show();
  $('.LitigationsActualLoss').closest('div.form-group').show();
  $('.LitigationsActualLoss').attr('validation','required');
  $('.PenalInterestUnderpaymentsActualLoss').show();
  $('.PenalInterestUnderpaymentsActualLoss').closest('div.form-group').show();
  $('.PenalInterestUnderpaymentsActualLoss').attr('validation','required');
  $('.OverpaymentActualLoss').show();
  $('.OverpaymentActualLoss').closest('div.form-group').show();
  $('.OverpaymentActualLoss').attr('validation','required');
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').show();
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').closest('div.form-group').show();
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').attr('validation','required');
  $('.OthersActualLoss').show();
  $('.OthersActualLoss').closest('div.form-group').show();
  $('.OthersActualLoss').attr('validation','required');
  $('.ServicePromiseInterestImpactedcount').show();
  $('.ServicePromiseInterestImpactedcount').closest('div.form-group').show();
  $('.ServicePromiseInterestImpactedcount').attr('validation','required');
  $('.LitigationsImpactedcount').show();
  $('.LitigationsImpactedcount').closest('div.form-group').show();
  $('.LitigationsImpactedcount').attr('validation','required');
  $('.PenalInterestUnderpaymentsImpactedcount').show();
  $('.PenalInterestUnderpaymentsImpactedcount').closest('div.form-group').show();
  $('.PenalInterestUnderpaymentsImpactedcount').attr('validation','required');
  $('.OverpaymentImpactedcount').show();
  $('.OverpaymentImpactedcount').closest('div.form-group').show();
  $('.OverpaymentImpactedcount').attr('validation','required');
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').show();
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').closest('div.form-group').show();
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').attr('validation','required');
  $('.OthersImpactedcount').show();
  $('.OthersImpactedcount').closest('div.form-group').show();
  $('.OthersImpactedcount').attr('validation','required');
}

function hideClaimsPayouts() {
  $('.ServicePromiseInterestActualLoss').hide();
  $('.ServicePromiseInterestActualLoss').closest('div.form-group').hide();
  $('.ServicePromiseInterestActualLoss').attr('validation','');
  $('.LitigationsActualLoss').hide();
  $('.LitigationsActualLoss').closest('div.form-group').hide();
  $('.LitigationsActualLoss').attr('validation','');
  $('.PenalInterestUnderpaymentsActualLoss').hide();
  $('.PenalInterestUnderpaymentsActualLoss').closest('div.form-group').hide();
  $('.PenalInterestUnderpaymentsActualLoss').attr('validation','');
  $('.OverpaymentActualLoss').hide();
  $('.OverpaymentActualLoss').closest('div.form-group').hide();
  $('.OverpaymentActualLoss').attr('validation','');
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').hide();
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').closest('div.form-group').hide();
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').attr('validation','');
  $('.OthersActualLoss').hide();
  $('.OthersActualLoss').closest('div.form-group').hide();
  $('.OthersActualLoss').attr('validation','');
  $('.ServicePromiseInterestImpactedcount').hide();
  $('.ServicePromiseInterestImpactedcount').closest('div.form-group').hide();
  $('.ServicePromiseInterestImpactedcount').attr('validation','');
  $('.LitigationsImpactedcount').hide();
  $('.LitigationsImpactedcount').closest('div.form-group').hide();
  $('.LitigationsImpactedcount').attr('validation','');
  $('.PenalInterestUnderpaymentsImpactedcount').hide();
  $('.PenalInterestUnderpaymentsImpactedcount').closest('div.form-group').hide();
  $('.PenalInterestUnderpaymentsImpactedcount').attr('validation','');
  $('.OverpaymentImpactedcount').hide();
  $('.OverpaymentImpactedcount').closest('div.form-group').hide();
  $('.OverpaymentImpactedcount').attr('validation','');
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').hide();
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').closest('div.form-group').hide();
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').attr('validation','');
  $('.OthersImpactedcount').hide();
  $('.OthersImpactedcount').closest('div.form-group').hide();
  $('.OthersImpactedcount').attr('validation','');
}

function showServicesRelated() {
  $('.GrievanceActualLoss').show();
  $('.GrievanceActualLoss').closest('div.form-group').show();
  $('.GrievanceActualLoss').attr('validation','required');
  $('.LitigationActualLoss').show();
  $('.LitigationActualLoss').closest('div.form-group').show();
  $('.LitigationActualLoss').attr('validation','required');
  $('.LowTerminationvalueActualLoss').show();
  $('.LowTerminationvalueActualLoss').closest('div.form-group').show();
  $('.LowTerminationvalueActualLoss').attr('validation','required');
  $('.OutsideFreelookActualLoss').show();
  $('.OutsideFreelookActualLoss').closest('div.form-group').show();
  $('.OutsideFreelookActualLoss').attr('validation','required');
  $('.OtherActualLoss').show();
  $('.OtherActualLoss').closest('div.form-group').show();
  $('.OtherActualLoss').attr('validation','required');
  $('.GrievanceImpactedcount').show();
  $('.GrievanceImpactedcount').closest('div.form-group').show();
  $('.GrievanceImpactedcount').attr('validation','required');
  $('.LitigationImpactedcount').show();
  $('.LitigationImpactedcount').closest('div.form-group').show();
  $('.LitigationImpactedcount').attr('validation','required');
  $('.LowTerminationvalueImpactedcount').show();
  $('.LowTerminationvalueImpactedcount').closest('div.form-group').show();
  $('.LowTerminationvalueImpactedcount').attr('validation','required');
  $('.OutsideFreelookImpactedcount').show();
  $('.OutsideFreelookImpactedcount').closest('div.form-group').show();
  $('.OutsideFreelookImpactedcount').attr('validation','required');
  $('.OtherImpactedcount').show();
  $('.OtherImpactedcount').closest('div.form-group').show();
  $('.OtherImpactedcount').attr('validation','required');
}

function hideServicesRelated() {
  $('.GrievanceActualLoss').hide();
  $('.GrievanceActualLoss').closest('div.form-group').hide();
  $('.GrievanceActualLoss').attr('validation','');
  $('.LitigationActualLoss').hide();
  $('.LitigationActualLoss').closest('div.form-group').hide();
  $('.LitigationActualLoss').attr('validation','');
  $('.LowTerminationvalueActualLoss').hide();
  $('.LowTerminationvalueActualLoss').closest('div.form-group').hide();
  $('.LowTerminationvalueActualLoss').attr('validation','');
  $('.OutsideFreelookActualLoss').hide();
  $('.OutsideFreelookActualLoss').closest('div.form-group').hide();
  $('.OutsideFreelookActualLoss').attr('validation','');
  $('.OtherActualLoss').hide();
  $('.OtherActualLoss').closest('div.form-group').hide();
  $('.OtherActualLoss').attr('validation','');
  $('.GrievanceImpactedcount').hide();
  $('.GrievanceImpactedcount').closest('div.form-group').hide();
  $('.GrievanceImpactedcount').attr('validation','');
  $('.LitigationImpactedcount').hide();
  $('.LitigationImpactedcount').closest('div.form-group').hide();
  $('.LitigationImpactedcount').attr('validation','');
  $('.LowTerminationvalueImpactedcount').hide();
  $('.LowTerminationvalueImpactedcount').closest('div.form-group').hide();
  $('.LowTerminationvalueImpactedcount').attr('validation','');
  $('.OutsideFreelookImpactedcount').hide();
  $('.OutsideFreelookImpactedcount').closest('div.form-group').hide();
  $('.OutsideFreelookImpactedcount').attr('validation','');
  $('.OtherImpactedcount').hide();
  $('.OtherImpactedcount').closest('div.form-group').hide();
  $('.OtherImpactedcount').attr('validation','');
}

//on document load show hide bifercation options.
$(document).ready(function() {
  var typeVal = $('.Type').val();
  let formState_n = $('.form-status').val();
  if(typeVal === 'PPHI Interest') {
    showPPHIInterest();
    hideClaimsPayouts();
    hideServicesRelated();
    if(formState_n !== 'draft'){
      $('.CompanyInitiatedActualLoss').attr('disabled','disabled');
      $('.CustomerInitiatedActualLoss').attr('disabled','disabled');
      $('.CompanyInitiatedImpactedcount').attr('disabled','disabled');
      $('.CustomerInitiatedImpactedcount').attr('disabled','disabled');
    }
    
  }else if(typeVal === 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)') {
    showClaimsPayouts();
    hidePPHIInterest();
    hideServicesRelated();
    if(formState_n !== 'draft'){
      $('.ServicePromiseInterestActualLoss').attr('disabled','disabled');
      $('.LitigationsActualLoss').attr('disabled','disabled');
      $('.PenalInterestUnderpaymentsActualLoss').attr('disabled','disabled');
      $('.OverpaymentActualLoss').attr('disabled','disabled');
      $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').attr('disabled','disabled');
      $('.OthersActualLoss').attr('disabled','disabled');
      $('.ServicePromiseInterestImpactedcount').attr('disabled','disabled');
      $('.LitigationsImpactedcount').attr('disabled','disabled');
      $('.PenalInterestUnderpaymentsImpactedcount').attr('disabled','disabled');
      $('.OverpaymentImpactedcount').attr('disabled','disabled');
      $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').attr('disabled','disabled');
      $('.OthersImpactedcount').attr('disabled','disabled');
    }
  } else if(typeVal === 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)') {
    showServicesRelated();
    hidePPHIInterest();
    hideClaimsPayouts();
    if(formState_n !== 'draft'){
      $('.GrievanceActualLoss').attr('disabled','disabled');
      $('.LitigationActualLoss').attr('disabled','disabled');
      $('.LowTerminationvalueActualLoss').attr('disabled','disabled');
      $('.OutsideFreelookActualLoss').attr('disabled','disabled');
      $('.OtherActualLoss').attr('disabled','disabled');
      $('.GrievanceImpactedcount').attr('disabled','disabled');
      $('.LitigationImpactedcount').attr('disabled','disabled');
      $('.LowTerminationvalueImpactedcount').attr('disabled','disabled');
      $('.OutsideFreelookImpactedcount').attr('disabled','disabled');
      $('.OtherImpactedcount').attr('disabled','disabled');
    }
  }else {
    hidePPHIInterest();
    hideClaimsPayouts();
    hideServicesRelated();
  }
});

function calculateBifercationFieldValues(bifercationType, fieldType) {
  if(bifercationType === 'PPHI Interest' && fieldType === 'Total Actual Loss'){
    var companyInitiatedActualLossVal =  
    $('.CompanyInitiatedActualLoss').val();
    var customerInitiatedActualLoss = $('.CustomerInitiatedActualLoss').val();
    var total = ((companyInitiatedActualLossVal === '') ? parseInt('0') : parseInt(companyInitiatedActualLossVal)) + ((customerInitiatedActualLoss 
 === '') ? parseInt('0') : parseInt(customerInitiatedActualLoss));
    $('.TotalActualLoss').val(total);
  } else if(bifercationType === 'PPHI Interest' && fieldType === 'Total impacted stakeholder count') {
    var companyInitiatedImpactedcount = $('.CompanyInitiatedImpactedcount').val();
    var customerInitiatedImpactedcount = $('.CustomerInitiatedImpactedcount').val();
    var total = ((companyInitiatedImpactedcount === '') ? parseInt('0') : parseInt(companyInitiatedImpactedcount )) + ((customerInitiatedImpactedcount 
 === '') ? parseInt('0') : parseInt(customerInitiatedImpactedcount ));
    $('.Totalimpactedstakeholdercount').val(total);
  }else if(bifercationType === 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)' && fieldType === 'Total Actual Loss') {
   var servicePromiseInterestActualLoss= $('.ServicePromiseInterestActualLoss').val();
   var litigationsActualLoss= $('.LitigationsActualLoss').val();
   var penalInterestUnderpaymentsActualLoss= $('.PenalInterestUnderpaymentsActualLoss').val();
   var overpaymentActualLoss= $('.OverpaymentActualLoss').val();
   var reinsurerdeniedtoaccepttheliabilityActualLoss= $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').val();
   var othersActualLoss= $('.OthersActualLoss').val();
   var total = ((servicePromiseInterestActualLoss=== '') ? parseInt('0') : parseInt(servicePromiseInterestActualLoss)) + ((litigationsActualLoss
 === '') ? parseInt('0') : parseInt(litigationsActualLoss)) + ((penalInterestUnderpaymentsActualLoss
 === '') ? parseInt('0') : parseInt(penalInterestUnderpaymentsActualLoss)) + ((overpaymentActualLoss
 === '') ? parseInt('0') : parseInt(overpaymentActualLoss)) + ((reinsurerdeniedtoaccepttheliabilityActualLoss
 === '') ? parseInt('0') : parseInt(reinsurerdeniedtoaccepttheliabilityActualLoss)) + ((othersActualLoss
 === '') ? parseInt('0') : parseInt(othersActualLoss));
    $('.TotalActualLoss').val(total);
  }else if(bifercationType === 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)' && fieldType === 'Total impacted stakeholder count') {
  var servicePromiseInterestImpactedcount= $('.ServicePromiseInterestImpactedcount').val();
    var litigationsImpactedcount= $('.LitigationsImpactedcount').val();
    var penalInterestUnderpaymentsImpactedcount= $('.PenalInterestUnderpaymentsImpactedcount').val();
    var overpaymentImpactedcount= $('.OverpaymentImpactedcount').val();
    var reinsurerdeniedtoaccepttheliabilityImpactedcount= $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').val();
    var othersImpactedcount= $('.OthersImpactedcount').val();
  var total = ((servicePromiseInterestImpactedcount=== '') ? parseInt('0') : parseInt(servicePromiseInterestImpactedcount)) + ((litigationsImpactedcount
 === '') ? parseInt('0') : parseInt(litigationsImpactedcount)) + ((penalInterestUnderpaymentsImpactedcount
 === '') ? parseInt('0') : parseInt(penalInterestUnderpaymentsImpactedcount)) + ((overpaymentImpactedcount
 === '') ? parseInt('0') : parseInt(overpaymentImpactedcount)) + ((reinsurerdeniedtoaccepttheliabilityImpactedcount
 === '') ? parseInt('0') : parseInt(reinsurerdeniedtoaccepttheliabilityImpactedcount)) + ((othersImpactedcount
 === '') ? parseInt('0') : parseInt(othersImpactedcount));
  $('.Totalimpactedstakeholdercount').val(total);
  }else if(bifercationType === 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)' && fieldType === 'Total Actual Loss') {
  var grievanceActualLoss= $('.GrievanceActualLoss').val();
    var litigationActualLoss= $('.LitigationActualLoss').val();
    var lowTerminationvalueActualLoss= $('.LowTerminationvalueActualLoss').val();
    var outsideFreelookActualLoss= $('.OutsideFreelookActualLoss').val();
    var otherActualLoss= $('.OtherActualLoss').val();
  var total = ((grievanceActualLoss=== '') ? parseInt('0') : parseInt(grievanceActualLoss)) + ((litigationActualLoss
 === '') ? parseInt('0') : parseInt(litigationActualLoss)) + ((lowTerminationvalueActualLoss
 === '') ? parseInt('0') : parseInt(lowTerminationvalueActualLoss)) + ((outsideFreelookActualLoss
 === '') ? parseInt('0') : parseInt(outsideFreelookActualLoss)) + ((otherActualLoss
 === '') ? parseInt('0') : parseInt(otherActualLoss));
  $('.TotalActualLoss').val(total);
  } else if(bifercationType === 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)' && fieldType === 'Total impacted stakeholder count') {
  var grievanceImpactedcount= $('.GrievanceImpactedcount').val();
    var litigationImpactedcount= $('.LitigationImpactedcount').val();
    var lowTerminationvalueImpactedcount= $('.LowTerminationvalueImpactedcount').val();
    var outsideFreelookImpactedcount= $('.OutsideFreelookImpactedcount').val();
    var otherImpactedcount= $('.OtherImpactedcount').val();
  var total = ((grievanceImpactedcount=== '') ? parseInt('0') : parseInt(grievanceImpactedcount)) + ((litigationImpactedcount
 === '') ? parseInt('0') : parseInt(litigationImpactedcount)) + ((lowTerminationvalueImpactedcount
 === '') ? parseInt('0') : parseInt(lowTerminationvalueImpactedcount)) + ((outsideFreelookImpactedcount
 === '') ? parseInt('0') : parseInt(outsideFreelookImpactedcount)) + ((otherImpactedcount
 === '') ? parseInt('0') : parseInt(otherImpactedcount));
  $('.Totalimpactedstakeholdercount').val(total);
  } 
}

$('.CompanyInitiatedActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.CustomerInitiatedActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.CompanyInitiatedImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.CustomerInitiatedImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.ServicePromiseInterestActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.LitigationsActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.PenalInterestUnderpaymentsActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.OverpaymentActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.ReinsurerdeniedtoaccepttheliabilityActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.OthersActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.ServicePromiseInterestImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.LitigationsImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.PenalInterestUnderpaymentsImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.OverpaymentImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.OthersImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.GrievanceActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.LitigationActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.LowTerminationvalueActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.OutsideFreelookActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.OtherActualLoss').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total Actual Loss');
});
$('.GrievanceImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.LitigationImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.LowTerminationvalueImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.OutsideFreelookImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
$('.OtherImpactedcount').keyup(function() {
  var bifercationType = $('.Type').val();
  calculateBifercationFieldValues(bifercationType, 'Total impacted stakeholder count');
});
  
  //Bifercation options show and hide
$(document).on('change', '.Type', function() {
  var typeVal = $('.Type').val();
  $('.CompanyInitiatedActualLoss').val('');
  $('.CustomerInitiatedActualLoss').val('');
  $('.ServicePromiseInterestActualLoss').val('');
  $('.LitigationsActualLoss').val('');
  $('.PenalInterestUnderpaymentsActualLoss').val('');
  $('.OverpaymentActualLoss').val('');
  $('.ReinsurerdeniedtoaccepttheliabilityActualLoss').val('');
  $('.OthersActualLoss').val('');
  $('.GrievanceActualLoss').val('');
  $('.LitigationActualLoss').val('');
  $('.LowTerminationvalueActualLoss').val('');
  $('.OutsideFreelookActualLoss').val('');
  $('.OtherActualLoss').val('');
  
  $('.CompanyInitiatedImpactedcount').val('');
  $('.CustomerInitiatedImpactedcount').val('');
  $('.ServicePromiseInterestImpactedcount').val('');
  $('.LitigationsImpactedcount').val('');
  $('.PenalInterestUnderpaymentsImpactedcount').val('');
  $('.OverpaymentImpactedcount').val('');
  $('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').val('');
  $('.OthersImpactedcount').val('');
  $('.GrievanceImpactedcount').val('');
  $('.LitigationImpactedcount').val('');
  $('.LowTerminationvalueImpactedcount').val('');
  $('.OutsideFreelookImpactedcount').val('');
  $('.OtherImpactedcount').val('');
  if(typeVal === 'PPHI Interest') {
    showPPHIInterest();
    hideClaimsPayouts();
    hideServicesRelated();
    $('.TotalActualLoss').attr('disabled','disabled');
    $('.Totalimpactedstakeholdercount').attr('disabled','disabled');
  }else if(typeVal === 'Claims Payout (service guarantee, section 45, Reinsurer denied to accept the liability, etc.)') {
    showClaimsPayouts();
    hidePPHIInterest();
    hideServicesRelated();
    $('.TotalActualLoss').attr('disabled','disabled');
    $('.Totalimpactedstakeholdercount').attr('disabled','disabled');
  } else if(typeVal === 'Services Related Payout (Grievances, Out of freelook cancellations, Low Termination Value, etc.)') {
    showServicesRelated();
    hidePPHIInterest();
    hideClaimsPayouts();
    $('.TotalActualLoss').attr('disabled','disabled');
    $('.Totalimpactedstakeholdercount').attr('disabled','disabled');
  }else {
    hidePPHIInterest();
    hideClaimsPayouts();
    hideServicesRelated();
    $('.TotalActualLoss').removeAttr('disabled');
    $('.Totalimpactedstakeholdercount').removeAttr('disabled');
  }
});  

//script on load    
$('.Functionoftheuser').hide();
$('.Functionoftheuser').closest('div.form-group').hide();
$('.Managerofuser').hide();
$('.Managerofuser').closest('div.form-group').hide();

$('.CompanyInitiatedActualLoss').hide();
$('.CompanyInitiatedActualLoss').closest('div.form-group').hide();
$('.CustomerInitiatedActualLoss').hide();
$('.CustomerInitiatedActualLoss').closest('div.form-group').hide();
$('.ServicePromiseInterestActualLoss').hide();
$('.ServicePromiseInterestActualLoss').closest('div.form-group').hide();
$('.LitigationsActualLoss').hide();
$('.LitigationsActualLoss').closest('div.form-group').hide();
$('.PenalInterestUnderpaymentsActualLoss').hide();
$('.PenalInterestUnderpaymentsActualLoss').closest('div.form-group').hide();
$('.OverpaymentActualLoss').hide();
$('.OverpaymentActualLoss').closest('div.form-group').hide();
$('.ReinsurerdeniedtoaccepttheliabilityActualLoss').hide();
$('.ReinsurerdeniedtoaccepttheliabilityActualLoss').closest('div.form-group').hide();
$('.OthersActualLoss').hide();
$('.OthersActualLoss').closest('div.form-group').hide();
$('.GrievanceActualLoss').hide();
$('.GrievanceActualLoss').closest('div.form-group').hide();
$('.LitigationActualLoss').hide();
$('.LitigationActualLoss').closest('div.form-group').hide();
$('.LowTerminationvalueActualLoss').hide();
$('.LowTerminationvalueActualLoss').closest('div.form-group').hide();
$('.OutsideFreelookActualLoss').hide();
$('.OutsideFreelookActualLoss').closest('div.form-group').hide();
$('.OtherActualLoss').hide();
$('.OtherActualLoss').closest('div.form-group').hide();

$('.CompanyInitiatedImpactedcount').hide();
$('.CompanyInitiatedImpactedcount').closest('div.form-group').hide();
$('.CustomerInitiatedImpactedcount').hide();
$('.CustomerInitiatedImpactedcount').closest('div.form-group').hide();
$('.ServicePromiseInterestImpactedcount').hide();
$('.ServicePromiseInterestImpactedcount').closest('div.form-group').hide();
$('.LitigationsImpactedcount').hide();
$('.LitigationsImpactedcount').closest('div.form-group').hide();
$('.PenalInterestUnderpaymentsImpactedcount').hide();
$('.PenalInterestUnderpaymentsImpactedcount').closest('div.form-group').hide();
$('.OverpaymentImpactedcount').hide();
$('.OverpaymentImpactedcount').closest('div.form-group').hide();
$('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').hide();
$('.ReinsurerdeniedtoaccepttheliabilityImpactedcount').closest('div.form-group').hide();
$('.OthersImpactedcount').hide();
$('.OthersImpactedcount').closest('div.form-group').hide();
$('.GrievanceImpactedcount').hide();
$('.GrievanceImpactedcount').closest('div.form-group').hide();
$('.LitigationImpactedcount').hide();
$('.LitigationImpactedcount').closest('div.form-group').hide();
$('.LowTerminationvalueImpactedcount').hide();
$('.LowTerminationvalueImpactedcount').closest('div.form-group').hide();
$('.OutsideFreelookImpactedcount').hide();
$('.OutsideFreelookImpactedcount').closest('div.form-group').hide();
$('.OtherImpactedcount').hide();
$('.OtherImpactedcount').closest('div.form-group').hide();



</script>