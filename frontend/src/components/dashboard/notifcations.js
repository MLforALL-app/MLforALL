import React from "react";
import moment from "moment";

// TODO: MAKE NOTIFICATIONS BAR HORIZONTAL

const makeNotif = (item) => {
	return (
		<div className="col s4">
			{" "}
			<span className="blue-text">{item.user} </span>
			<span>{item.content}</span>
			<div className="note-date grey-text">
				{moment(item.time.toDate()).fromNow()}
			</div>
		</div>
	);
};

const Notifications = (props) => {
	const { notifications } = props;
	return (
		<div className="section">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title">Notifications</span>
					<ul className="online-users">
						<div className="row">
							{notifications && notifications.map(makeNotif)}
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
