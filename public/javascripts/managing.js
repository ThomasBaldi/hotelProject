deleteHotel = async (hotelId) => {
	console.log(typeof hotelId);
	await fetch('/hotels', {
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
	await fetch('/hotels', {
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

makeReservation = async (userId, roomId, url) => {
	let startDate = prompt('Please provide starting date in format YYYY-MM-DD HH:MM:SS');
	let endDate = prompt('Please provide ending date in format YYYY-MM-DD HH:MM:SS');
	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			UserId: userId,
			RoomId: roomId,
			StartDate: startDate,
			EndDate: endDate,
		}),
	});
	const resData = 'Made reservation';
	location.reload();
	return resData;
};

makeRate = async (userId, url) => {
	let value = prompt('Rate the hotel from 1 to 5');
	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			UserId: userId,
			Value: value,
		}),
	});
	const resData = 'Made a rate';
	location.reload();
	return resData;
};
