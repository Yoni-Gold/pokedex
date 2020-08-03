const btn = document.getElementById("searchButon");
const txt = document.getElementById("search");

const searchPokemon = async () => {
  if (txt.value)
  {
    try {
      const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${txt.value}`);
      console.log(data);
      MakeDisplay(data);
    }
    catch{
      window.alert("Does Not Exist");
    } 
  }
  else 
  {
    window.alert("Enter a name or id");
  }
};

btn.addEventListener('click', searchPokemon);

function MakeDisplay(data)
{
  document.getElementById("results").firstChild ? document.getElementById("results").removeChild(document.getElementById("results").firstChild) : null;
  let t = document.createElement("table");
  t.innerHTML = `<tr><td> Name </td><td> ID </td><td> Info </td></tr>`; 
  t.innerHTML += `<tr><td> ${data.name} </td><td> ${data.id} </td><td> <ul> <li> Type: ${printList(data.types)}</li><li> Height: ${data.height}</li><li> Weight: ${data.weight}</li> </ul> </td></tr>`;
  t.innerHTML += `<tr><td><img id="pokeimg" src="${data.sprites.front_default}" alt="${data.sprites.back_default}" width="100" height="100"></td></tr>`;
  document.getElementById("results").appendChild(t);
  Array.from(document.getElementsByClassName("type")).forEach(e => {e.addEventListener('click', getTypes)});
  document.getElementsByTagName("img")[0].addEventListener("mouseover", switchImg);
}

function switchImg(e)
{
  [e.currentTarget.src, e.currentTarget.alt] = [e.currentTarget.alt, e.currentTarget.src];
  e.currentTarget.addEventListener("mouseleave", switchImg);
}

function printList(arr)
{
  let result = arr.map(e => {return `<button class="type" id="${e.type.url}">${e.type.name}</button>`});

  return result;
}

async function getTypes(e)
{
  const { data } = await axios.get(e.currentTarget.id);

  let txt = " ";
  let counter = 0;

  data.pokemon.forEach(e => {counter++; txt += (`${counter} )  ${e.pokemon.name}
  `)});

  window.alert(txt);
}