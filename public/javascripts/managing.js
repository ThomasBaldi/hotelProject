addHotel = async () => {
	let name = prompt("Provide an hotel's name");
	let location = prompt('Provide location of new hotel');
	if (name || location === (null || '')) {
		alert('Cancelled');
		return;
	}
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

deleteHotel = async (hotelId) => {
	let confirm = window.confirm();
	if (confirm == false) {
		alert('Deletion cancelled');
		return;
	}
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

addRoom = async () => {
	let Capacity = prompt('Provide capacity');
	let PricePerDay = prompt('Provide price per day');
	let HotelId = prompt('Provide HotelId for this room');
	if (Capacity || PricePerDay || HotelId == (null || '')) {
		alert('Cancelled');
		return;
	}
	await fetch('/rooms', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			Capacity: Capacity,
			PricePerDay: PricePerDay,
			HotelId: HotelId,
		}),
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'Room added';
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

deleteRoom = async (roomId) => {
	let confirm = window.confirm();
	if (confirm == false) {
		alert('Deletion cancelled');
		return;
	}
	await fetch('/rooms', {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			id: roomId,
		}),
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'Deleted room';
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
	if (value === (null || '')) {
		alert('Rating cancelled');
		return;
	}
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

deleteUser = async (userId) => {
	let confirm = window.confirm();
	if (confirm == false) {
		alert('Deletion cancelled');
		return;
	}
	await fetch('/users', {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			id: userId,
		}),
	})
		.then((response) => {
			if (response.ok) {
				const resData = 'User deleted...';
				location.reload();
				return Promise.resolve(resData);
			}
			return Promise.reject(response);
		})
		.catch((response) => {
			alert(response.statusText);
		});
};

updateUrl = (url, filtersAdded) => {
	if (filtersAdded == 0) {
		url += '?';
	} else {
		url += '&';
	}
	return url;
};

applyFilters = () => {
	let url = 'http://localhost:3000/hotels';
	let filtersAdded = 0;
	const searchFilter = document.getElementById('search-input').value;
	if (searchFilter !== '') {
		url = updateUrl(url, filtersAdded);
		url += 'location=' + searchFilter;
		filtersAdded++;
	}
	window.location.href = url;
};
