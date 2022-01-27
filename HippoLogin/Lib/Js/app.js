$(document).on('click','#btnSignIn',function()
{
    console.log('btnSignIn Clicked');
    let strUserName = '';
    strUserName=$('#txtEmail').val();
    console.log('set value of strUserName = ' + strUserName);
    localStorage.setItem('Username', strUserName);
    console.log('Set local storage username');
    console.log($('txtPassword').val());

    if($('#txtPassword').val())
    {
        console.log('Password exists');
    }
    else
    {
        console.log('Password Blank');
    }

    if($('#txtEmail').val())
    {
        console.log('Username Exists');
    }
    else
    {
        console.log('Username Blank');
    }
})