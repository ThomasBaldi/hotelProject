deleteHotel = async (hotelId) => {
	console.log(typeof hotelId);
	await fetch('http://localhost:3000/hotels', {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			id: hotelId,
		}),
	}).catch((res) => {
		alert(res.statusText);
	});
};

addHotel = async () => {
	let name = prompt("Provide an hotel's name");
	let location = prompt('Provide location of new hotel');
	await fetch('http://localhost:3000/hotels', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			Name: name,
			Location: location,
		}),
	}).catch((res) => {
		alert(res.statusText);
	});
};
