async function getPetsData() {
	let response = await fetch('../../assets/JSON/pets.json');
	let pets = await response.json();
	return pets;
}

export const petsData = await getPetsData();

