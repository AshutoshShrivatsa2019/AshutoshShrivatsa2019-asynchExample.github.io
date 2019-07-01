/*
(function(){



var myButton=document.querySelector("button");
var obj=[];

var outputData=[{
	"name":'',
    "full_name":'',
    "private":'',
	"owner":{
  		"login":'',
		"name":'',
        "followersCount":'',
        "followingCount":'',
    },
    "licenseName":'',
    "score":'',
    "numberOfBranch":''
}]




function getValue()
{
    let url="https://api.github.com/search/repositories?q=";
    console.log("in");
    var inputText=document.getElementById("searchField").value;
    console.log(inputText);
    url=url+inputText;
    console.log(url);
    return url;
}


// $("document").ready(function(){
//     $("button").click(function(){
//         init();


//     })
// })

// function init()
// {
//     //getData(getValue);
//     let call=getValue();
//    var myPromise= getInitialData(call);

//    myPromise.then(resp1=>{
//        getOwnerData(resp1);
//    })
//    .catch(error=>{
//        console.log(error)
//     return Promise.reject("Errorrrrrrr");
//     });

//    myPromise.then(resp2=>{
//     getBranchData(resp2);
// })
// .catch(error=>{
//     console.log(error)
//     return Promise.reject("Errorrrrrrr");
//     });

//     //console.log(JSON.stringify(outputData,null,"\t"));
// }

myButton.onclick=function()
{
    //getData(getValue);
    let call=getValue();

   var myPromise= getInitialData(call);
   console.log("2");
   myPromise.then(resp1=>{
       getOwnerData(resp1);
   })
   .catch(error=>{
       console.log(error)
    return Promise.reject("Errorrrrrrr");
    });
    console.log("3");
   myPromise.then(resp2=>{
        getBranchData(resp2);
    })
.catch(error=>{
    console.log(error)
    return Promise.reject("Errorrrrrrr");
    });

    //console.log(JSON.stringify(outputData,null,"\t"));
    
}


// function getData(callback)
// {
//     console.log("starts");
//     let call=callback();
//     console.log("ends");
//     console.log(1);
//     fetch(call)
//     .then(function(response){
//         console.log(3);
//         return response.json();
//     })
//     .then(function(myJSON){

//         return writeInitialData(myJSON);
//     })
//     .then((newURL)=>{getOwnerData(newURL)})
//     .then((ownerJSON)=>{writeOwnerData(ownerJSON)})


//     .catch(error=>console.log(error));
    

//     console.log(2);
// }

function writeInitialData(myJSON,call)
{

            // console.log(4);
        // console.log(call.split("=")[1].trim());
        // console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((n)=>n.name));
        // console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((f)=>f.full_name));
        // console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((p)=>p.private));
        // console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim() && val.license!==null).map((l)=>l.license.name));
        // console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((s)=>s.score));
        call=call===undefined?getValue():call;
            console.log(4);
        console.log(call.split("=")[1].trim());
        console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((n)=>n.name)[0]);
        console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((f)=>f.full_name)[0]);
        console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((p)=>p.private)[0]);
        console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim() && val.license!==null).map((l)=>l.license.name)[0]);
        console.log(myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((s)=>s.score)[0]);

        outputData.name= myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((n)=>n.name)[0];
        outputData.full_name= myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((f)=>f.full_name)[0];
        outputData.private= myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((p)=>p.private)[0];
        outputData.licenseName= myJSON.items.filter((val)=>val.name===call.split("=")[1].trim() && val.license!==null).map((l)=>l.license.name)[0];
        outputData.score= myJSON.items.filter((val)=>val.name===call.split("=")[1].trim()).map((s)=>s.score)[0];

        //return myJSON.items.map((r)=>r.name===call.split("=")[1].trim());
        return myJSON.items.filter((val)=>val.name===call.split("=")[1].trim());
}


function getInitialData(url)
{
 
    console.log("1");
    return fetch(url)
    .then((response)=>{
        if(response.ok)
        {
            console.log("4");
            return response.json()
            .then((myJSON,url)=>{
               return writeInitialData(myJSON,url);
            })
            .catch((error)=>{
                console.log(error);
                return Promise.reject("Errorrrrrrr");
            })
        }
        else{
            return Promise.reject(new ResponseError("Authentication error: "));
        }
    })
    .catch(error=>{
        console.log(error)
        return Promise.reject("Errorrrrrrr");
    });
}



function getOwnerData(json)
{
    console.log("in GetOwnerData "+json);

    let ownerURL=json[0].owner.url;

    console.log(ownerURL);

    return fetch(ownerURL)
    .then((response)=>{
        if(response.ok)
        {
            response.json()
            .then((myJSON)=>{
                writeOwnerData(myJSON);
            })
            .catch(error=>{
                return Promise.reject("RRRRRR");
            })
        }
        else
        {
            return Promise.reject("EOEOEOE");
        }

    })
    .catch(error=>{
        return Promise.reject("ERORORORO");
    })

  

}


function getBranchData(json)
{
    console.log("in getBranchData "+json);

    let branchesURL=json[0].branches_url;
    branchesURL=branchesURL.split("{")[0].trim();
    console.log(branchesURL);
 
    return fetch(branchesURL)
    .then((response)=>{
        if(response.ok)
        {
            response.json()
            .then((myJSON)=>{
                writeBranchData(myJSON);

            })
            .catch(error=>{
                return Promise.reject("EEEEEE");
            })
        }
        else
        {
            return Promise.reject("EROORORRR");
        }

    })
    .catch(error=>{
        return Promise.reject("ERROOOORERR")
    })
}


function writeBranchData(json)
{
    console.log(json.length);

    outputData.numberOfBranch=json.length;

    console.log(JSON.stringify(outputData,null,"\t"));

    $("document").ready(()=>{
        $("pre").text("");
        $("pre").text(JSON.stringify(outputData,null,"\t"));
    })
}

function writeOwnerData(json)
{
    console.log(json.login);
    console.log(json.name);
    console.log(json.followers);
    console.log(json.following);

    outputData.owner.login=json.login;
    outputData.owner.name=json.name;
    outputData.owner.followersCount=json.followers;
    outputData.owner.followingCount=json.following;
}


})();
*/


(function () {

    var myButton = document.querySelector("button");
    

    function getURL() {
        let url = "https://api.github.com/search/repositories?q=";
        console.log("in");
        var inputText = document.getElementById("searchField").value;
        console.log(inputText);
        url = url + inputText;
        console.log(url);
        return url;
    }

    myButton.onclick = function () {
        let url = getURL();

        var intialPromise = getInitialData(url)
            .then((response) => {
                if (response.ok) {
                    return Promise.resolve(response.json());
                }
                else {
                    return Promise.reject(new ResponseError("Authentication error: "));
                }
            })
            .then((response)=>{
                let url = getURL();
               var resp=response.items.filter((val)=>val.name===url.split("=")[1].trim());
               return resp;
            })
            .then((resp)=>{
                Promise.all([getOwnerData(resp), getBranchData(resp)]).then((responses) => { 
                    console.log(resp);
                    console.log(responses);
                   processOutputData(resp,responses);
                   
                  })
                  .catch(error=>{
                      console.log(error);
                      return Promise.reject("XXXXXXXXXxx");
                  });
            })
            .catch(error => {
                console.log(error)
                return Promise.reject("Errorrrrrrr");
            });

       

    }


    function getInitialData(url) {

        return fetch(url);
    }


    function getOwnerData(json)
{
    let ownerURLs=[];

    for (let index = 0; index < json.length; index++) {
        ownerURLs[index] = json[index].owner.url;
        
    }
    

    let requests=ownerURLs.map((url)=>fetch(url).then(resp=>{return resp.json()}));

    

     return Promise.all(requests);
    

  

}


function getBranchData(json)
{
    let branchesURLs=[];

    for (let index = 0; index < json.length; index++) {
        branchesURLs[index] = json[index].branches_url;
        
    }
   
    let requests=branchesURLs.map((url)=>fetch(url.split("{")[0].trim()).then(resp=>{return resp.json()}));

    return Promise.all(requests);

    
}

function processOutputData(outerResp,innerResp)
{

    console.log(outerResp);
    console.log(innerResp);
    var outputData = [];
    var listObj = {
        "name": '',
        "full_name": '',
        "private": '',
        "owner": {
            "login": '',
            "name": '',
            "followersCount": '',
            "followingCount": '',
        },
        "licenseName": '',
        "score": '',
        "numberOfBranch": ''
    }
     

    for (let index = 0; index < outerResp.length; index++) {
        let element = outerResp[index];
        listObj = {
            "name": '',
            "full_name": '',
            "private": '',
            "owner": {
                "login": '',
                "name": '',
                "followersCount": '',
                "followingCount": '',
            },
            "licenseName": '',
            "score": '',
            "numberOfBranch": ''
        }
       // listObj.owner.login=element[index].login;
      
       listObj.name=element.name;
       listObj.full_name=element.full_name;
       listObj.private=element.private;
       listObj.licenseName=element.license;
       listObj.score= element.score;

        outputData.push(listObj);
    }

  
       let  elements = innerResp[0];

        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];

           // listObj.owner.login=element[index].login;
           outputData[index].owner.login=element.login;
           outputData[index].owner.name=element.name;
           outputData[index].owner.followersCount=element.followers;
           outputData[index].owner.followingCount=element.following;

         
        }

        elements = innerResp[1];

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];

           
           outputData[index].numberOfBranch=element.length;

         
        }

        
        console.log(JSON.stringify(outputData,null,"\t"))

        $("document").ready(function(){
            $("pre").text("");
            $("pre").text(JSON.stringify(outputData,null,"\t"));
        })

    
}

})();