window.onload=callback;

var http = new XMLHttpRequest();


function callback(){
    http.onreadystatechange=function(){

            if(http.readyState===4){
            if(http.status===200){
              armargrilla(JSON.parse(http.responseText));
           
            }else{
                console.log("tenemos un error");
            }
        }
    }

    http.open("GET","http://localhost:3000/materias",true);
    http.send();

    document.getElementById("cerrar").addEventListener("click", cerrarFunction);
    document.getElementById("modificar").addEventListener("click", modificar);
    document.getElementById("eliminar").addEventListener("click", eliminar);
    

}

function armargrilla(jsonObj){
    var tCuerpo=document.getElementById("tcuerpo");
    for(var i=0;i<jsonObj.length;i++){
      var tr = document.createElement("tr");

    tr.setAttribute("idPersona",jsonObj[i].id)

      var td1 = document.createElement("td");
      var nodoTexto1=document.createTextNode(jsonObj[i].nombre);
      td1.appendChild(nodoTexto1);
      tr.appendChild(td1);

      var td2 = document.createElement("td");
      var nodoTexto2=document.createTextNode(jsonObj[i].cuatrimestre);
      td2.appendChild(nodoTexto2);
      tr.appendChild(td2);

      var td3 = document.createElement("td");
      var nodoTexto3=document.createTextNode(jsonObj[i].fechaFinal);
      td3.appendChild(nodoTexto3);
      tr.appendChild(td3);

      var td4 = document.createElement("td");
      var nodoTexto4=document.createTextNode(jsonObj[i].turno);
      td4.appendChild(nodoTexto4);
      tr.appendChild(td4);

      tr.addEventListener("dblclick",clickGrilla); 
      tCuerpo.appendChild(tr);

    }
}

function clickGrilla(event)
{
    document.getElementById("fieldset").hidden=false;

    var trClick=event.target.parentNode;
    document.getElementById("id").value=trClick.getAttribute("idPersona");
    document.getElementById("nombre").value=trClick.childNodes[0].innerHTML;
    document.getElementById("cuatrimestre").value=trClick.childNodes[1].innerHTML;
    document.getElementById("fecha").value=sacarfecha(trClick.childNodes[2].innerHTML);
   
    if(trClick.childNodes[3].innerHTML=="Mañana")
    {
        document.getElementById("mañana").checked=true;
    }else{
        document.getElementById("noche").checked=true;;
    }
}

function cerrarFunction()
{
    document.getElementById("fieldset").hidden=true;
}


function modificar()
{
    http.onreadystatechange=function(){
        if(http.readyState==4&&http.status==200){
            location.reload();
            document.getElementById("fieldset").hidden=true;
            document.getElementById("gif").hidden=true;
        }
    }  

http.open("POST","http://localhost:3000/editar ",true);
http.setRequestHeader("Content-Type","application/json");

var $materia = document.getElementById("nombre");



if($materia.value.length<7)
{
    document.getElementById("gif").hidden=true;
        document.getElementById("nombre").className = "error";
    alert("Error. Reingrese la materia.");
    return;
    
}
document.getElementById("gif").hidden=false;
var json={id:document.getElementById("id").value,cuatrimestre:document.getElementById("cuatrimestre").value,nombre:document.getElementById("nombre").value,fechaFinal:document.getElementById("fecha").value,turno:document.querySelector('input[name="turno"]:checked').value}

http.send(JSON.stringify(json));
} 

function eliminar()
{
    http.onreadystatechange=function(){
        if(http.readyState==4&&http.status==200){
            location.reload();
            document.getElementById("fieldset").hidden=true;
            document.getElementById("gif").hidden=true;
        }
    }  

http.open("POST","http://localhost:3000/eliminar",true);
http.setRequestHeader("Content-Type","application/json");
var json={id:document.getElementById("id").value}
document.getElementById("gif").hidden=false;
http.send(JSON.stringify(json));

} 

function sacarfecha(valor){

    var fechaEnArray = valor.split("/");

    return fechaEnArray[2]+"-"+fechaEnArray[1]+"-"+fechaEnArray[0];

}



