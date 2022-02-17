$(document).on('click','#btnNewAccount',function(){
    let stryMyUsername = $('#txtUsername').val();
    let strMyPassword = $('#txtPassword').val();
    let blnError = false;
    let strErrorMessage = '';

    if($('#txtUsername').val() == false)
    {
        blnError = true;
        strErrorMessage += '<p>Email/username is blank</p>';
    }
    else if(validUsernameFormat($('#txtUsername').val()) == false){
        blnError = true;
        strErrorMessage +='<p>Email/Username is not valid</p>';
    }
    
    if($('#txtPassword').val()== false)
    {
        blnError = true;
        strErrorMessage += '<p>Password is blank</p>';
    }
    else if(validPasswordFormat($('#txtPassword').val())== false)
    {
        blnError = true;
        strErrorMessage +='<p>Password is not formatted right</p>';
    }

    if(blnError == true)
    {
        Swal.fire({
            icon: 'error',
            title: 'Missing Data...',
            html: strErrorMessage
          })
    }
    
    else{  $.post('https://www.swollenhippo.com/DS3870/Tasks/newAccount.php',{strUsername: stryMyUsername, strPassword: strMyPassword}, function(result){
        let objResult = JSON.parse(result);
        if(objResult.Outcome == 'New User Created'){
            Swal.fire({
                icon: 'success',
                title: 'User Created',
                html: '<p>Your account was successful</p>'

           }).then((result)=>{
                window.location.href = 'login.html';
           })
        } else if(objResult.Outcome == 'User already exists'){
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
   })}

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

$(document).on('click','#btnLogin',function(){
    let strMyUsername = $('#txtUsername').val();
    let strMyPassword = $('#txtPassword').val();
    let blnError = false;
    let strErrorMessage = '';

    if($('#txtUsername').val() == false)
    {
        blnError = true;
        strErrorMessage += '<p>Email/username is blank</p>';
    }
    else if(validUsernameFormat($('#txtUsername').val()) == false){
        blnError = true;
        strErrorMessage +='<p>Email/Username is not valid</p>';
    }
    
    if($('#txtPassword').val() == false)
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
    else{ 
        $.post('https://www.swollenhippo.com/DS3870/Tasks/newSession.php',{strUsername: strMyUsername, strPassword: strMyPassword},function(result){
        let objResult = JSON.parse(result);
        if(objResult.Outcome == 'Login Failed'){
            Swal.fire({
                icon: 'error',
                title: 'Username or Password is Incorrect',
                html: '<p>Verify your username and password and try again</p>'
            })
        } else {
            sessionStorage.setItem('HippoTaskID', objResult.Outcome);
            window.location.href = 'index.html';
        }
    })}

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

$(document).on('click','#btnAddTask',function()
{
    let strMySessionID = sessionStorage.getItem('HippoTaskID');
    $.getJSON('https://www.swollenhippo.com/DS3870/Tasks/verifySession.php', {strSessionID: strMySessionID}, function(result){
        if(result.Outcome == 'Valid Session'){
            let strMyTaskName = $('#txtTaskName').val();
            let strMyLocation = $('#txtLocation').val();
            let strMyDate = $('#txtDueDate').val();
            let strMyNotes = $('#txtNotes').val();
            let blnError = false;
            let strErrorMessage = '';

            function validTaskFormat (strMyTaskName){
                let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{250})/;
                let taskCheck = reg.test(strMyTaskName);
                return(taskCheck);
            }

            function validLocationFormat (strMyLocation){
                let reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{250})/;
                return reg.test(strMyLocation);
            }

            function validDateFormat (strMyDate){
                let reg =  /^(([0-9]{4})((-[0-9]{2}){2}(( |T)?([0-9]{2}:){2}[0-9]{2}((\+[0-9]{2}(:[0-9]{2})?)|Z)?)?|(-W[0-9]{2}(-[1-7])?)|(-[1-3]?[0-9]{2})))$/;
                return reg.test(strMyDate);
            }

            function validNotesFormat (strMyNotes){
                let reg = /^.{1,250}$/;
                return reg.test(strMyNotes);
            }

            if(validTaskFormat == false)
            {
                blnError = true;
                strErrorMessage +='<p>Task needs to be less than 250 characters</p>';
            }
            
            if(validLocationFormat == false){
                blnError = true;
                strErrorMessage +='Loacation needs to be less than 250 Char';
            }

            if(validDateFormat == false){
                blnError = true;
                strErrorMessage +='Invalid date format';
            }

            if(validNotesFormat == false){
                blnError = true;
                strErrorMessage +='Notes need to be less than 64kb';
            }
        
            if(blnError == true)
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    html: strErrorMessage
                  })
            }

            else{ $.post('https://www.swollenhippo.com/DS3870/Tasks/newTask.php',{ strSessionID: strMySessionID, strLocation:strMyLocation, strTaskName:strMyTaskName, datDueDate:strMyDate,strNotes:strMyNotes},function(result){
                let objResult = JSON.parse(result);
                if(objResult.Outcome != 'Error'){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Added!',
                        showConfirmButton: false,
                        timer: 1500
                     })
                      $('#txtTaskName').val('');
                      $('#txtLocation').val('');
                      $('#txtDueDate').val('');
                      $('#txtNotes').val('');
                     } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Task Not Added',
                        html: '<p>Verify your task data and try again</p>'
                    })
                    }
                })
                    
           
            }} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Expired Session',
                    html: '<p>Oops, appears your session has expired.  Click OK to go to login</p>'
            }).then((result)=>{
                    sessionStorage.removeItem('HippoTaskID');
                    window.location.href = 'login.html';
            })
             }
    })
})

$(document).on('click','.btnTaskDelete', function(){
    let strTaskID = $(this).attr('data-taskID');
    let strSessionID = sessionStorage.getItem('HippoTaskID');
    $.post('https://www.swollenhippo.com/DS3870/Tasks/deleteTask.php', {strSessionID: sessionStorage.getItem('HippoTaskID'), strTaskID: strSessionID}, function(result){
        console.log(result);
        fillTasks();
    })
})

$(document).on('click','.btnTaskComplete', function(){
    let strTaskID = $(this).attr('data-taskID');
    let strSessionID = sessionStorage.getItem('HippoTaskID');
    $.post('https://www.swollenhippo.com/DS3870/Tasks/markTaskComplete.php', {strSessionID: sessionStorage.getItem('HippoTaskID'), strTaskID: strSessionID}, function(result){
        console.log(result);
        fillTasks();
    })
})

$(document).on('click','#toggleAdd',function(){
    $('#divAddNewTask').slideToggle();
})

function fillTasks(){
    $.getJSON('https://www.swollenhippo.com/DS3870/Tasks/getTasks.php',{strSessionID: sessionStorage.getItem('HippoTaskID')}, function(result){
       console.log(result);
        $('#tblTasks tbody').empty();
        $.each(result,function(i,task){
                if(task.Status == 'ACTIVE'){
                    let strTableHTML ='<tr><td>'+task.Name+'</td><td>'+task.Location+'</td><td>'+task.DueDate+'</td><td>'+task.Notes+'</td><td><button class="btn btn-success mr-2 btnTaskComplete" data-taskid="' + task.taskID + '">Complete</button><button class="btn btn-danger ml-2 btnTaskDelete" data-taskid="' + task.taskID + '">Delete</button></td></tr>'
                    $('#tblTasks tbody').append(strTableHTML);
                }
               
            
           
        })
        })
    }
