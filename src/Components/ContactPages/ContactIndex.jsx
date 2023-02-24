import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddContact from "./AddContact";
import AddRandomContact from "./AddRandomContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContact from "./GeneralContacts";
import RemoveAllContact from "./RemoveAllContact";

class ContactIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contactList: [
				{
					id: 1,
					name: "Ben Parker",
					phone: "0612345678",
					email: "ben@mycompany.com",
					isFavorite: false,
				},
				{
					id: 2,
					name: "Kathy Smith",
					phone: "0687654321",
					email: "kathy@mycompany.com",
					isFavorite: true,
				},
				{
					id: 3,
					name: "Stan Roger",
					phone: "0645687321",
					email: "stan@mycompany.com",
					isFavorite: true,
				},
			],
		};
	}

	handleAddContact = (newContact) => {
		if (newContact.name == "") {
			return { status: "failure", msg: "Please enter a valid name" };
		} else if (newContact.phone == "") {
			return { status: "failure", msg: "Please enter a valid phone number" };
		}
		const duplicatedRecord = this.state.contactList.filter((x) => {
			if ((x.name == newContact.name) & (x.phone == newContact.phone)) {
				return true;
			}
		});
		if (duplicatedRecord.lenght > 0) {
			return { status: "failure", msg: "Duplicate Record" };
		} else {
			const newFinalContact = {
				...newContact,
				id: this.state.contactList[this.state.contactList.length - 1].id + 1,
				isFavorite: false,
			};
			this.setState((prevState) => {
				return {
					contactList: prevState.contactList.concat([newFinalContact]),
				};
			});
			return { status: "success", msg: "Contact was added successfully" };
		}
	};

	handleToggleFavorite = (contact) => {
		this.setState((prevState) => {
			return {
				contactList: prevState.contactList.map((obj) => {
					if (obj.id == contact.id) {
						return { ...obj, isFavorite: !obj.isFavorite };
					}
					return obj;
				}),
			};
		});
	};

	render() {
		return (
			<div>
				<Header />
				<div className="container" style={{ minHeight: "85vh" }}>
					<div className="row py-3">
						<div className="col-4 offset-2">
							<AddRandomContact />
						</div>
						<div className="col-4 ">
							<RemoveAllContact />
						</div>
						<div className="row py-2">
							<div className="col-8 offset-2 row">
								<AddContact handleAddContact={this.handleAddContact} />
							</div>
						</div>
						<div className="row py-2">
							<div className="col-8 offset-2 row">
								<FavoriteContacts
									contacts={this.state.contactList.filter(
										(u) => u.isFavorite == true,
									)}
									favoriteClick={this.handleToggleFavorite}
								/>
							</div>
						</div>
						<div className="row py-2">
							<div className="col-8 offset-2 row">
								<GeneralContact
									contacts={this.state.contactList.filter(
										(u) => u.isFavorite == false,
									)}
									favoriteClick={this.handleToggleFavorite}
								/>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ContactIndex;
