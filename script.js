const evolucaoGengar = [
  { nome: "gastly", id: 92 },
  { nome: "haunter", id: 93 },
  { nome: "gengar", id: 94 },
  { nome: "mega gengar", id: "gengar-mega" },   // ou 10039
  { nome: "gengar gigantamax", id: "gengar-gmax" }  // Gengar Gigantamax
];

async function mostrarPokemon(index) {
  const pokemon = evolucaoGengar[index];
  const nomeEl = document.getElementById("pokemon-name");
  const imgEl = document.getElementById("pokemon-img");
  const idEl = document.getElementById("pokemon-id");
  const typesEl = document.getElementById("pokemon-types");
  const descEl = document.getElementById("pokemon-desc");
  const infoEl = document.getElementById("pokemon-info");

  try {
    // Dados principais
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const data = await res.json();

    // Descrição vem de outro endpoint (species)
    const resSpecies = await fetch(data.species.url);
    const speciesData = await resSpecies.json();
    const flavor = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");

    // Exibir dados
    nomeEl.textContent = pokemon.nome.toUpperCase();
    imgEl.src = data.sprites.other["official-artwork"].front_default;
    idEl.textContent = `Nº Pokédex: ${data.id}`;
    typesEl.textContent = `Tipo(s): ${data.types.map(t => t.type.name).join(", ")}`;
    descEl.textContent = `Descrição: ${flavor ? flavor.flavor_text.replace(/\n|\f/g, " ") : "Sem descrição disponível"}`;
    infoEl.textContent = `Altura: ${data.height / 10} m | Peso: ${data.weight / 10} kg`;

  } catch (error) {
    nomeEl.textContent = "Erro ao carregar";
    imgEl.src = "";
    idEl.textContent = "";
    typesEl.textContent = "";
    descEl.textContent = "";
    infoEl.textContent = "";
    console.error("Erro ao buscar Pokémon:", error);
  }
}

// Mostrar o primeiro ao carregar
mostrarPokemon(0);  