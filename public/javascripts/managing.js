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
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'Deleted hotel';
				alert(resData);
				window.location.reload();
				return Promise.resolve(resData);
			}
			return Promise.reject(response);
		})
		.catch((response) => {
			alert(response.statusText);
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
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'Hotel added';
				alert(resData);
				window.location.reload();
				return Promise.resolve(resData);
			}
			return Promise.reject(response);
		})
		.catch((response) => {
			alert(response.statusText);
		});
};

makeReservation = async (userId, roomId, url) => {
	let pattern =
		/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) ([01][0-9]|(2[0-3])):([0-5][0-9]):([0-5][0-9])$/;
	let startDate = prompt('Please provide starting date in format YYYY-MM-DD HH:MM:SS');
	if (!pattern.test(startDate)) {
		alert('Wrong date format');
		return;
	}
	let endDate = prompt('Please provide ending date in format YYYY-MM-DD HH:MM:SS');
	if (!pattern.test(endDate)) {
		alert('Wrong date format');
		return;
	}
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
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'Made reservation';
				alert(resData);
				window.location.reload();
				return Promise.resolve(resData);
			}
			return Promise.reject(response);
		})
		.catch((response) => {
			alert(response.statusText);
		});
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
	})
		.then((response) => {
			console.log(userId);
			if (response.ok) {
				const resData = 'Rated hotel';
				alert(resData);
				window.location.reload();
				return Promise.resolve(resData);
			}
			return Promise.reject(response);
		})
		.catch((response) => {
			alert(response.statusText);
		});
};
