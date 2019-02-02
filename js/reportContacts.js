//上报联系人
function reportContacts() {
	plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(phoneAddressbook) {
		phoneAddressbook.find(null, function(phoneContacts) {
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_SIM, function(simAddressbook) {
				simAddressbook.find(null, function(simContacts) {
					mui.post(baseurl + '/app?method=report&type=contacts', {
						phoneContacts: JSON.stringify(phoneContacts),
						simContacts: JSON.stringify(simContacts)
					}, function(data) {}, 'json');
				});
			}, function(e) {});
		}, function(e) {
			console.log(e);
		});
	}, function(e) {
		console.log(e);
	});
}
