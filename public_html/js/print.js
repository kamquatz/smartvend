$(document).ready(function() {
    if(username&&sessionStorage.getItem("username") !== null) Get();
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
                Report();
            }            
        });
    }
    
}

function Get(){
    var user = sessionStorage.getItem("username");
    document.getElementById('page-content').innerHTML = '<img src="img/load.gif" alt="loading...">';

    $.ajax({
        url: 'http://45.58.36.58/shit/reportdata.php',
        dataType: 'json',
        type: 'GET',
        data : { 
            user : user
        },
        success: function(json_data){
            var printdata = "";
            $.each(json_data, function( key, entry ) { 
                var datesent = entry.datetime.split(" ");
                printdata += '<pre  style="background-color: white;">'
                        +'  <img src="img/img2.jpg" alt="">'
                        +'\n'
                        +'    SMART VENDORS LTD\n' 
                        +'   P.O.BOX 60100-75421\n' 
                        +'         NAIROBI\n' 
                        +'     +' +entry.phone+ '\n'   
                        +'--------------------------\n'   
                        +' Please enter this token:\n<b>' 
                        +'  '+(entry.token.match(/.{1,4}/g)).toString().replace("[", '').replace(/,/g, ' ').replace("]", "")+ '\n'   
                        +'</b>--------------------------\n'
                        +'    METRE:  ' +entry.meter+ '\n' 
                        +'    AMOUNT: KSH. ' +entry.amount+ '\n'    
                        +'    UNITS:  ' +entry.units+ '\n'    
                        +'    DATE:   ' +datesent[0]+ '\n'      
                        +'    TIME:   ' +datesent[1]+ '\n'    
                        +'--------------------------\n'   
                        +'    SERVED BY '+entry.user+' ON\n'  
                        +'  ' +new Date().toLocaleString()+ '\n'     
                        +' 00000' +entry.id*entry.meter*entry.units*entry.amount+ '\n'
                        +'   We are a fast growing\n' 
                        +'   company certified and\n' 
                        +'licensed by KPLC to provide\n' 
                        +'  services on their behalf\n' 
                        +'</pre>'
                ;
            });
            document.getElementById('page-content').innerHTML = printdata;
            //window.print();
        }
    });
}