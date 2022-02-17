// Begin Page Specific Functions

$(document).on('click','#btnAddAccount', function(){
    let strFirstName = $('#txtFirstName').val();
    let strLastName = $('#txtLastName').val();
    let strEmailAddress = $('#txtEmail').val();
    let strMyPassword = $('#txtPassword').val();
    let blnError = false;
    let strErrorMessage = '';

    if(!$('#txtFirstName').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide a first name to continue</p>';
    }

    if(!$('#txtLastName').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide a Last Name to continue</p>';
    }
   

    if(!$('#txtEmail').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide an email address to continue</p>';
    }
    else if(isValidEmail ==  false){
        blnError = true;
        strErrorMessage +='<p>Email is not valid</p>';
    }
    if(!$('#txtPassword').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide your password to continue</p>';
    }
    else if(isValidPassword == false){
        blnError = true;
        strErrorMessage +='<p>Password is not formatted right</p>';
    }

    if(doPasswordsMatch == false){
        blnError = true;
        strErrorMessage += '<p>Passwords do not match</p>';
    }

    if(blnError == true){
        Swal.fire({
            icon: 'error',
            title: 'Missing Data',
            html: strErrorMessage
        }) 
    } 

    else( $.post('https://www.swollenhippo.com/DS870/Comics/createAccount.php',{strmyemail: strEmailAddress, strPass: strMyPassword, strFirst: strFirstName, strLast: strLastName}, function(result){
        let objResult = JSON.parse(result);
        if(objResult.Outcome == 'New User Created'){
            Swal.fire({
                icon: 'success',
                title: 'User Created',
                html: '<p>Your account was successful</p>'

           }).then((result)=>{
                window.location.href = 'login.html';
           })
        }else if(objResult.Outcome == 'User already exists'){
            Swal.fire({
                icon: 'error',
                title: 'User not Created',
                html: '<p>Your account was not successful. User already exists</p>'
           })
        } else {
            Swal.fire({
            icon: 'error',
            title: 'User not Created',
            html: '<p>Please check username and password and try agian</p>'
           })
        }
        
    
    

})

$(document).on('click','#btnAddCharacter', function(){
    let strmyCharacter = $('#txtCharacterName').val();
    let strmySuperPower = $('#txtSuperPower').val();
    let strmyLocation = $('#txtLocation').val();
    let strmySatus = $('#txtStatus').val();
    let blnError = false;
    let strErrorMessage = '';

    function validLength(strmyCharacter){
        let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{200})/;
         let taskCheck = reg.test(strmyCharacter);
        return(taskCheck);
    }

    function validLength(strmySuperPower){
        let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{200})/;
         let taskCheck = reg.test(strmySuperPower);
        return(taskCheck);
    }

    function validLength(strmyLocation){
        let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{200})/;
         let taskCheck = reg.test(strmyLocation);
        return(taskCheck);
    }

    function validLength(strmySatus){
        let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{200})/;
         let taskCheck = reg.test(strmySatus);
        return(taskCheck);
    }
    if(validLength == false)
    {
        blnError = true;
        strErrorMessage +='<p>Information needs to be less than 200 characters</p>';
    }

    if(blnError == true)
    {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            html: strErrorMessage
          })
    }

    else{
        $.post('https://www.swollenhippo.com/DS3870/Comics/addCharacter.php',{ strSessionID: CharacterSession, strLocation:strmyLocation, strpower:strmySuperPower, strstat: strmySatus,strcharacter: strmyCharacter},function(result){
                let objResult = JSON.parse(result);
                if(objResult.Outcome != 'Error'){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Character Added!',
                        showConfirmButton: false,
                        timer: 1500
                     })
                     
                     clearCharacterFields();
                     } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Character Not Added',
                        html: '<p>Verify your Character data and try again</p>'
                    })
                    }
                })
    }

})

$(document).on('click','#btnLogin', function(){
    let blnError = false;
    let strErrorMessage = '';
    if(!$('#txtEmail').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide an email address to continue</p>';
    }
    if(!$('#txtPassword').val()){
        blnError = true;
        strErrorMessage += '<p>Please provide your password to continue</p>';
    }
    if(blnError == true){
        Swal.fire({
            icon: 'error',
            title: 'Missing Data',
            html: strErrorMessage
        }) 
    } else{
        $.post('https://www.swollenhippo.com/DS3870/Comics/createSession.php',{strEmail:$('#txtEmail').val(),strPassword:$('#txtPassword').val()},function(result){
        objResult = JSON.parse(result);    
        if(objResult.Outcome != 'Login Failed'){
                // set your Session Storage Item here
                sessionStorage.setItem('CharacterSession', objResult.Outcome);
                 window.location.href = 'index.html';
                // then redirect the user to the dashboard
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    html: '<p>The provided username and password did not match any in our database</p>'
                })
            }
        })
    }
})

$(document).on('click','#btnToggleExisting', function(){
    $('#divCharacters').slideToggle();
})


function clearCreateAccountPage(){
    $('#txtFirstName').val('');
    $('#txtLastName').val('');
    $('#txtEmail').val('');
    $('#txtPassword').val('');
    $('#txtVerifyPassword').val('');
}

function clearCharacterFields(){
    $('#txtCharacterName').val('');
    $('#txtSuperPower').val('');
    $('#txtLocation').val('');
    $('#selectStatus').val('Active').trigger('change');
}

function fillCharacterTable(){
    $('#tblCharacters tbody').empty();
    let strCurrentSessionID = sessionStorage.getItem('CharacterSession');
    $.getJSON('https://www.swollenhippo.com/DS3870/Comics/getCharacters.php',{strSessionID:strCurrentSessionID},function(result){
        $.each(result,function(i,superhero){
            let strTableHTML = '<tr><td>' + superhero.Name + '</td><td>' + superhero.SuperPower + '</td><td>' + superhero.Location + '</td><td>' + superhero.Status + '</td></tr>';
            $('#tblCharacters tbody').append(strTableHTML);
        })
    })
}

// End Page Specific Functions


// Begin Helper Functions
function isValidEmail(strEmailAddress){
    let regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regEmail.test(strEmailAddress);
}

function isValidPassword(strPassword){
    let regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/;
    return regPassword.test(strPassword);
}

function doPasswordsMatch(strPassword, strVerifyPassword){
    if(strPassword == strVerifyPassword){
        return true;
    } else {
        return false;
    }

// End Helper Functions

// Begin Universal Functions
function verifySession(){
    if(sessionStorage.getItem('CharacterSession')){
        let strCurrentSessionID = sessionStorage.getItem('CharacterSession')
        $.getJSON('https://www.swollenhippo.com/DS3870/Test1/verifySession.php', {strSessionID: strCurrentSessionID}, function(result){
            if(result.Outcome != 'Valid Session'){
                return false;
            } else {
                return true;
            }
        })
    } else {
        return false;
    }
}
// End Universal Functions

