$(document).on('click','#btnSignIn',function()
{
    var objNewSessionResponse;
    let blnError = false;
    let strErrorMessage = '';
    if(!$('#txtEmail').val())
    {
        blnError = true;
        strErrorMessage += '<p>Email/username is blank</p>';
    }
    else if(validUsernameFormat($('#txtEmail').val()) == false){
        blnError = true;
        strErrorMessage +='<p>Email/Username is blank</p>';
    }
    
    if(!$('#txtPassword').val())
    {
        blnError = true;
        strErrorMessage += '<p>Password is blank</p>';
    }
    else if(validPasswordFormat($('#txtPassword').val())== false)
    {
        blnError = true;
        strErrorMessage +='<p>Password is blank</p>';
    }


    if(blnError == true)
    {
        Swal.fire({
            icon: 'error',
            title: 'Missing Data...',
            html: strErrorMessage
          })
    }
    else
    {
       var objNewSessionPromise =$.post('https://www.swollenhippo.com/DS3870/newSession.php',{ strUsername: $('#txtEmail').val(), strPassword:$('#txtPassword').val()}, function(result){
        objNewSessionResponse = JSON.parse(result);
        console.log(objNewSessionResponse);
         })

         $.when(objNewSessionPromise).done(function()
         {
             if(objNewSessionResponse.Outcome == 'Login failed')
             {
                 Swal.fire({
                     icon: 'error',
                     title: 'Login Failed',
                     html: 'Please review Username and password'
                 })
             }
             else
             {
                 sessionStorage.setItem('HippoSessionID',objNewSessionResponse.Outcome);
                 window.location.href = 'index.html';
             }
         })
    }

   

    function validUsernameFormat(strUsername){
        let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
       let blnMatchesFormat = reg.test(strUsername);
        return blnMatchesFormat;  
    }

    function validPasswordFormat(strPassword){
        let reg = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
        return reg.test(strPassword);
    }
})