
async function generate()
{
  var currentDate = document.getElementById("currentDate");
  var status = document.createElement("h1"); 
  status.innerHTML="Generating";
  currentDate.appendChild(status);
  const prompt = document.getElementById('prompt');
  const model = document.getElementById('model');
  const server = document.getElementById('server');
  const widthSlider = document.getElementById('widthSlider');
  const heightSlider = document.getElementById('heightSlider');
  const steps = document.getElementById('steps');
  const res = await fetch('/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
        {
            server:server.value,
            name:prompt.value,
            model:model.value,
            height:heightSlider.value,
            width:widthSlider.value,
            steps:steps.value,
      })
    });
  let obj = await res.json()
  
  console.log(obj['imageUrl'])
  
  if(obj.imageUrl != null){
    const data = obj.imageUrl;
    currentDate.removeChild(status)
    var firstid = document.createElement("img"); 
    firstid.src=data;
    currentDate.appendChild(firstid);
    

  }
  else{
    
    // status.innerHTML="Error";
  }

}
// function test()
// {


//     fetch("/create",{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(
//         {
//             name:"data"
//         })
//     }).then(response => response.json())
//     .then(data => var image = data)
//     if(obj.imageUrl != null){
//     const data = obj.imageUrl;
//     // Get a reference to the HTML element with id "currentDate"
//     var currentDate = document.getElementById("currentDate");
//     var firstid = document.createElement("img"); 
//     firstid.src=data;

//     // Update its innerHTML with the formatted date
//     currentDate.appendChild(firstid);

// }
