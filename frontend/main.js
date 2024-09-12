// import axios from "axios";

// import axios from "https://cdn.jsdelivr.net/npm/axios@1.0.0/dist/axios.min.js";
// let notes = [];
let updatingId=null;
async function  renderElementsToSrn() {
  const data= (await axios.get("https://cricket-api-bsjx.onrender.com/api/v1/players/get-players")).data.data;
   // Clear existing content
   parentNote.innerHTML = '';
  data.forEach(player => {
    renderData(player,player._id)
  });
}

document.getElementById('createBtn').addEventListener("click", async (e)=>{
  e.preventDefault();

  const first_name=document.getElementById("firstName").value;
  const last_name=document.getElementById("lastName").value;
  const email=document.getElementById("email").value;
  const phone=document.getElementById("phone").value;
  const role=document.getElementById("role").value;
  const availability=document.querySelector('input[name="available"]:checked')? document.querySelector('input[name="available"]:checked').value:"";

  // console.log(role,availability)
  const body={first_name,last_name,email,phone,role,available:availability};

  if(updatingId){
    const result= await axios.put(`https://cricket-api-bsjx.onrender.com/api/v1/players/update-players/${updatingId}`,body)
    updatingId=null;
    document.getElementById("createBtn").innerText="Submit";
  }else{
    const res=await axios.post("https://cricket-api-bsjx.onrender.com/api/v1/players/add-players",body);
    console.log(res)
  }

  renderElementsToSrn()
})

var parentNote = document.getElementsByClassName("noteList")[0];
// console.log(parentNote);

function renderData(playerData, objId) {
  const divv = document.createElement("div");

  divv.classList.add('note', `note${objId}`);
  divv.id=objId;

  const nameElement = document.createElement("h4");
  const emailElement = document.createElement("p");
  const phoneElement = document.createElement("p");
  const roleElement = document.createElement("p");
  const availableElement = document.createElement("p");
  const btn = document.createElement("button");
  const updateBtn = document.createElement("button");

  nameElement.innerText = `Name: ${playerData.first_name} ${playerData.last_name}`;
  emailElement.innerText = `Email: ${playerData.email}`;
  phoneElement.innerText = `Phone: ${playerData.phone}`;
  roleElement.innerText = `Role: ${playerData.role}`;
  availableElement.innerText = `Available: ${playerData.available ? "Yes" : "No"}`;
  btn.innerText = "Delete";
  updateBtn.innerText = "Update";
  btn.id = "del";
  
  btn.addEventListener('click', () => removeELe(objId));
  updateBtn.addEventListener('click', () => updateELe(objId,playerData));
  updateBtn.style.marginLeft="5px"
  divv.appendChild(nameElement);
  divv.appendChild(emailElement);
  divv.appendChild(phoneElement);
  divv.appendChild(roleElement);
  divv.appendChild(availableElement);
  divv.appendChild(btn);
  divv.appendChild(updateBtn);

  parentNote.appendChild(divv);
   

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("role").value = "";
  // document.querySelector('input[name="available"]:checked')?.checked = false;
}

async function removeELe(id) {
  // document.getElementById(id).style.display='none';
  document.querySelector(`.note${id}`).remove();
  let res= await axios.delete(`https://cricket-api-bsjx.onrender.com/api/v1/players/delete-player/${id}`)
  console.log(res);
}

const updateELe=async (id,data)=>{
  document.getElementById("firstName").value=data.first_name;
  document.getElementById("lastName").value=data.last_name;
  document.getElementById("email").value=data.email;
  document.getElementById("phone").value=data.phone;
  document.getElementById("role").value=data.role;
  data.available ? document.getElementById("role_yes").checked=true : document.getElementById("role_no").checked=true;
  document.getElementById("createBtn").innerText="Update"
  updatingId=id;
}

renderElementsToSrn();

