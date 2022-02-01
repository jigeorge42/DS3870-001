$(document).on('click','#btnSignIn',function()
{
    var objNewSessionResponse;
    let blnError = true;
    let strErrorMessage = '';
    if(!$('#txtEmail').val())
    {
        blnError = true;
        strErrorMessage += '<p>Email/username is blank</p>';
    }
    else if(validUsernameFormat($('#txtEmail').val())){
        blnError = true;
        strErrorMessage +='<p>Email/Username is blank</p>';
    }
    
    if(!$('#txtPassword').val())
    {
        blnError = true;
        strErrorMessage += '<p>Password is blank</p>';
    }
    else if(validUsernameFormat($('#txtPassword').val()))
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
       var objNewSesionPromise =$.post('https://www.swollenhippo.com/DS3870/newSession.php',{ strUsername: $('#txtEmail').val(), strPassword:$('#txtPassword').val()}, function(result){
        objNewSessionResponse = JSON.parse(result);
      
         })
    }

    $.when(objNewSesionPromise).done(function()
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
            sessionStorage.setItem('HippoSessonID',objNewSessionResponse.Outcome);
            Swal.fire({
                icon: 'error',
                title: 'Login Complete',
                html: 'Nice'
            })
        }
    })

    function validUsernameFormat(strUsername){
        let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return reg.test(strUsername);  
    }

    function validPasswordFormat(strPassword){
        let reg = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
        return reg.test(strPassword);
    }
})