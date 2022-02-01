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
    if(!$('#txtPassword').val())
    {
        blnError = true;
        strErrorMessage += '<p>Password is blank</p>';
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
})