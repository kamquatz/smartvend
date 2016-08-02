//var username = null;
$(document).ready(function() {
    if(username&&sessionStorage.getItem("username") !== null) Populate();
});

function RequestLogin(){
    if(username !== null && password !== null){
        username = document.getElementById('username').value;
        password = document.getElementById('password').value; 
        
        $.get( "http://45.58.36.58/shit/login-user.php", 
        { 
            username : username,
            password : password
        }, 
        function(data) {            
            var jsondata = JSON.parse(data);
            if(jsondata.response==="success"){
                sessionStorage.setItem("username",username);
                Populate();
            }            
        });
    }
    
}

function Populate(){    
    document.getElementById('page-content').innerHTML = 
            '<div class="small" id="main-content">' +
                '<input class="margintop10" type="text" id="im" placeholder="meter"><br />' +
                '<input class="margintop10" type="text" id="ip" value="2547"><br />' +
                '<input class="margintop10" type="text" id="am" placeholder="amount"><br />' +
            '</div>' +
            '<div class="text-red small" id="verification" style="text-align: center"></div>' +
            '<div class="small" id="response" style="text-align: center">' +
                '<button class="btn btn-info btn-flat btn-sm  margintop10" onclick="Submit();">Submit</button><br />' +
	'</div> ';
}

function Submit(){
    meter = document.getElementById('im').value;
    phone = document.getElementById('ip').value; 
    amount = document.getElementById('am').value;
    //alert(meter+"\n"+phone+"\n"+amount);
   if(meter.length===11&&phone.length===12&&amount.length>1){
   document.getElementById('page-content').innerHTML = '<img src="img/load.gif" alt="loading...">';
    $.get( "http://45.58.36.58/shit/data.php",
    { 
        phone : phone,
        meter : meter,
        amount : amount,
        user : sessionStorage.getItem("username")
    }, 
    function(data) {            
        var jsondata = JSON.parse(data);
        if(jsondata.info === "success")
            document.getElementById('page-content').innerHTML = '<img src="img/tick.gif" alt="loading...">';
        else document.getElementById('page-content').innerHTML = '<div class="small" id="main-content">' +jsondata.reason+'</div> ';
          
    });
}
}


