const btn = document.getElementById("searchButon");
const txt = document.getElementById("search");

const searchPokemon = async () => {
  const { data } = txt.value ? await axios.get(`http://pokeapi.co/api/v2/pokemon/${txt.value}`) : {data : "Enter a name or id"};
  console.log(data)
  MakeDisplay(data);
};

btn.addEventListener('click', searchPokemon);


function MakeDisplay(data)
{
  document.getElementById("results").firstChild ? document.getElementById("results").removeChild(document.getElementById("results").firstChild) : null;
  let t = document.createElement("table");
  t.innerHTML = `<tr><td> Name </td><td> ID </td><td> Info </td></tr>`; 
  t.innerHTML += `<tr><td> ${data.name} </td><td> ${data.id} </td><td> <ul> <li> Type: ${data.types.map(e => { return e.type.name })}</li><li> Height: ${data.height}</li><li> Weight: ${data.weight}</li> </ul> </td></tr>`;
  t.innerHTML += `<tr><td><img id="pokeimg" src="${data.sprites.front_default}" width="100" height="100"></td><td><img id="pokeimg" src="${data.sprites.back_default}" width="100" height="100"></td></tr>`;
  document.getElementById("results").appendChild(t);
  // pokeAnimation(data);
}

// async function pokeAnimation(data)
// {
//   img = document.getElementById("pokeimg");
//   for (let i = 0; i < 5; i++)
//   {
//     setTimeout(() => {img.src = data.sprites.front_default}, 1000);
//     setTimeout(() => {img.src = data.sprites.back_default}, 1000);
//   }
// }