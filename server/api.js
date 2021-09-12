import { Router } from "express";
import process from "process";
import pool from "./db";
import "dotenv/config";
import format from "pg-format";
import bcrypt from "bcrypt";

const router = new Router();
const axios = require("axios");
const slackWorkspace = "https://ldn7-test-workspace.slack.com";
// const slackWorkspace = "https://codeyourfuture.slack.com";

const users = [];
const loginRequired = (req, res, next) => {
	if (!req.session.userId) {
		return res.status(403).json({ message: "You should login first" });
	}
	const user = users.includes(req.session.userId);
	if (!user) return res.status(404).json({ message: "User not found" });
	req.user = req.session.userId;
	next();
};

router.post("/login", (req, res) => {
	const { email = "", password = "" } = req.body;
	//const user = users.find((user) => user.password === password);
	const isLogin = password === process.env.LOGIN_PASS;
	if (!(email && password)) {
		return res.status(400).send({ error: "Data not formatted properly" });
	}
	//const isLogin = password === process.env.LOGIN_PASS;
	const query = `select * from users where email='${email}' and status='3' `;
	pool.query(query, async (db_err, db_res) => {
		if (db_err) {
			res.status(400).send(JSON.stringify(db_err));
		} else {
			if (db_res.rows.length == 0) {
				res.status(404).json({ message: "This user is not exists" });
			} else {
				const hash = db_res.rows[0].password;
				const resultCompare = await bcrypt.compare(password, hash);
				if (resultCompare) {
					req.session.userId = email;
					users.push(email);
					res.json({
						name: db_res.rows[0].user_name,
						userId: db_res.rows[0].user_id,
						role: db_res.rows[0].role,
					});
				} else if (!resultCompare) {
					res.status(403).json({ message: "user not allowed" });
				}
			}
		}
	});
});

router.get("/request", (req, res) => {
	const query = `select user_id,user_name,role,email,status from users where user_id!='Admin' order by status asc`;
	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.send(JSON.stringify(db_err));
		} else {
			res.json(db_res.rows);
		}
	});
});

router.put("/approve", (req, res) => {
	const { email = "", status = "" } = req.body;
	const query = ` update users set status='${status}' where email='${email}';`;
	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.status(400).send(JSON.stringify(db_err));
		} else {
			res.json({ message: "Done" });
		}
	});
});

router.post("/signUp", async (req, res) => {
	const { name = "", userId = "", email = "", password = "" } = req.body;
	console.log("name", name, "userId:", userId, password, email);
	if (!(name && password && email && userId)) {
		return res.status(400).send({ error: "Data not formatted properly" });
	}
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	if (userId !== "mentor") {
		const query = `select * from users where user_id='${userId}' or email='${email}'`;
		pool.query(query, (db_err, db_res) => {
			if (db_err) {
				res.status(400).send(JSON.stringify(db_err));
			} else {
				if (db_res.rows.length !== 0) {
					res.status(403).json({ message: "This user already exists" });
				} else {
					const query = `INSERT INTO users  VALUES ('${userId}','${name}', '1'  , '${hashPassword}' , '${email}' , '1' )`;

					pool.query(query, (db_err, db_res) => {
						if (db_err) {
							res.status(400).send(JSON.stringify(db_err));
						} else {
							req.session.userId = name;
							users.push(name);
							res.json({ message: "Done" });
						}
					});
				}
			}
		});
	} else {
		const query = `select * from users where email='${email}'`;
		pool.query(query, (db_err, db_res) => {
			if (db_err) {
				res.status(400).send(JSON.stringify(db_err));
			} else {
				if (db_res.rows.length !== 0) {
					res.status(403).json({ message: "This mentor already exists" });
				} else {
					const query = `INSERT INTO users  VALUES ('mentor','${name}', '2'  , '${hashPassword}' , '${email}' , '1')`;

					pool.query(query, (db_err, db_res) => {
						if (db_err) {
							res.status(400).send(JSON.stringify(db_err));
						} else {
							req.session.userId = name;
							users.push(name);
							console.log("session", req.session.userId, "name", users);
							res.json({ message: "Done" });
						}
					});
				}
			}
		});
	}
});

router.get("/profile", loginRequired, (req, res) => {
	res.json({ message: req.user });
});
router.post("/logout", loginRequired, (req, res) => {
	req.session.userId = null;
	res.json({ message: "logout" });
});

const getChannelList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/conversations.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getRepliesMessage = async (channelId, timeStamp) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/conversations.replies?channel=${channelId}&ts=${timeStamp}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getChannelUser = async (channelId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/conversations.members?channel=${channelId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserList = async () => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/users.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getUserInfo = async (userId) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `${slackWorkspace}/api/users.info?user=${userId}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const getChannelHistory = async (channel, oldest, latest) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	let url = "";
	if (oldest === undefined || latest === undefined) {
		url = `${slackWorkspace}/api/conversations.history?channel=${channel}`;
	} else {
		url = `${slackWorkspace}/api/conversations.history?channel=${channel}&oldest=${oldest}&latest=${latest}`;
	}
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	return res.data;
};

const findReaction = (reactions, userId) => {
	return reactions.filter((reaction) => reaction.users.includes(userId));
};

const getStat = async (channel, userId, oldest, latest) => {
	latest = latest == undefined ? "" : latest;
	const data = await getChannelHistory(channel, oldest, latest);
	const messageCount = data.messages.filter(
		(message) =>
			(message.user == userId && message.type == "message") ||
			(message.reply_users && message.reply_users.includes(userId))
	).length;
	const reactionCount = data.messages.filter(
		(message) =>
			message.reactions && findReaction(message.reactions, userId).length > 0
	).length;
	const newCount = {
		messageCount: messageCount,
		reactionCount: reactionCount,
	};
	return newCount;
};

router.get("/channelList", loginRequired, async (req, res) => {
	const fetchChannelList = await getChannelList();
	res.status(200).json(fetchChannelList);
});

router.get("/userList", loginRequired, async (req, res) => {
	const fetchUserList = await getUserList();
	res.status(200).json(fetchUserList);
});

const fetchAllData = async (startDate) => {
	const channelList = await getChannelList();
	console.log("fetchAllData", channelList);
	const result = channelList.channels.map(async (channel) => {
		const channelId = channel.id;
		const data = await getChannelHistory(channel.id, startDate, " ");
		const extractedData = data.messages.map((message) => {
			const userId = message.user;
			const type = message.type;
			const date = message.ts;
			const day = new Date(date * 1000).toLocaleDateString();
			const threadDate = message.thread_ts ? message.thread_ts : false;
			const reaction = message.reactions ? message.reactions : false;
			const replyUsers = message.reply_users ? message.reply_users : false;
			return {
				channelId,
				userId,
				type,
				date,
				day,
				threadDate,
				reaction,
				replyUsers,
			};
		});
		return [...extractedData];
	});
	return Promise.all(result);
};

router.post("/dailyStatistic", async (req, res) => {
	const startDateString = req.query.date || new Date();
	const numberOfDays = req.query.days || 1;
	let startDate =
		new Date(
			new Date(
				new Date(startDateString) - 60 * 60 * 24 * numberOfDays * 1000
			).setHours(0, 0, 0, 0)
		) / 1000;
	const messageInfo = await fetchAllData(startDate); // All Data/messages for 3 weeks (unsorted)
	// console.log(messageInfo);
	const reactionData = FetchReactionData(messageInfo); // reactions (unsorted)
	messageInfo.push(reactionData); // messages + reaction (unsorted)
	const info = [].concat.apply([], messageInfo); // messages + reaction (sorted)
	const repliesMessages = await fetchRepliesData(info); // messages in thread (unsorted)
	const repliesMessagesSorted = [].concat.apply([], repliesMessages); // messages in thread (sorted)
	const repliesReaction = fetchRepliesReaction(repliesMessagesSorted); // reactions  in thread (sorted)
	messageInfo.push(repliesMessagesSorted);
	messageInfo.push(repliesReaction);
	const result = [].concat.apply([], messageInfo); // messages + reactions + repliesMessages + repliesReactions
	// console.log(result);
	const aggregateStat = await aggregateData(result, numberOfDays);
	const stat = [].concat.apply([], [].concat.apply([], aggregateStat));
	insertDataToTable(stat);
	res.json(stat);
});

const insertDataToTable = (newStat) => {
	pool
		.query("delete from messages")
		.then(() => console.log("Delete all messages"))
		.catch((e) => console.error(e));

	pool
		.query(
			format(
				"INSERT INTO messages (channel_id, user_id, date, message_count, reaction_count) VALUES %L",
				newStat
			)
		)
		.then(() => console.log("New message created!"))
		.catch((e) => console.error(e));
};

const aggregateData = async (result, numberOfDays) => {
	const channelList = await getChannelList();
	const aggregateStat = channelList.channels.map(async (channel) => {
		const UsersInfo = await getChannelUser(channel.id);
		const data = UsersInfo.members.map((user) => {
			const allDayStat = [];
			for (let dayDate = 1; dayDate <= numberOfDays; dayDate++) {
				allDayStat.push(calculateDailyStat(result, channel.id, user, dayDate));
			}
			return allDayStat;
		});
		return [...data];
	});
	return Promise.all(aggregateStat);
};

const calculateDailyStat = (info, channelId, userId, dayDate) => {
	const start = new Date().setHours(0, 0, 0, 0);
	const duration = 60 * 60 * 24 * 1000;
	const endDate = (start - duration * (dayDate - 1)) / 1000;
	const startDate = (start - duration * dayDate) / 1000;
	const day = new Date(startDate * 1000).toISOString().split("T")[0];
	const dailyMessage = info.filter((message) => {
		return (
			message.date < endDate &&
			message.date > startDate &&
			message.channelId == channelId &&
			message.userId == userId &&
			message.type == "message"
		);
	});
	const dailyReaction = info.filter((message) => {
		return (
			message.date < endDate &&
			message.date > startDate &&
			message.channelId == channelId &&
			message.userId == userId &&
			message.type == "reaction"
		);
	});
	const messageCount = dailyMessage.length;
	const reactionCount = dailyReaction.length;
	return [channelId, userId, day, messageCount, reactionCount];
};

const fetchRepliesReaction = (data) => {
	const filteredData = data.filter((message) => message.reactions);
	const type = "reaction";
	const result = [];
	filteredData.map((message) => {
		const channelId = message.channelId;
		const date = message.date;
		const day = message.day;
		message.reactions.map((users) => {
			users.users.map((userId) => {
				result.push({ channelId, userId, type, date, day });
			});
		});
	});
	return result;
};

const fetchRepliesData = (messageInfo) => {
	const filterData = messageInfo.filter((message) => message.replyUsers);
	const totalData = filterData.map(async (message) => {
		const repliesData = await getRepliesMessage(
			message.channelId,
			message.date
		);
		repliesData.messages.shift();
		const channelId = message.channelId;
		const resultTotal = repliesData.messages.map((reply) => {
			const userId = reply.user;
			const type = reply.type;
			const date = reply.ts;
			const day = new Date(date * 1000).toLocaleDateString();
			const threadDate = false;
			const replyUsers = false;
			const reactions = reply.reactions ? reply.reactions : false;
			return {
				channelId,
				userId,
				type,
				date,
				day,
				threadDate,
				reactions,
				replyUsers,
			};
		});
		return [...resultTotal];
	});
	return Promise.all(totalData);
};

const FetchReactionData = (messageInfo) => {
	const result = [];
	const type = "reaction";
	messageInfo.map((message) => {
		message.map((ele) => {
			const channelId = ele.channelId;
			const date = ele.date;
			const day = new Date(date * 1000).toLocaleDateString();
			if (ele.reaction) {
				ele.reaction.map((users) => {
					users.users.map((userId) => {
						result.push({ channelId, userId, type, date, day });
					});
				});
			}
		});
	});

	return result;
};

router.get("/channelUser/:channelId", loginRequired, async (req, res) => {
	const channelId = req.params.channelId;
	const fetchChannelUser = await getChannelUser(channelId);
	Promise.all(
		fetchChannelUser.members.map(async (member) => {
			const userInfo = await getUserInfo(member);
			return userInfo.user;
		})
	)
		.then((data) => res.status(200).json(data))
		.catch(() => res.status(400));
});

router.get("/user/:channelId/:userId", loginRequired, async (req, res) => {
	const userId = req.params.userId;
	const channelId = req.params.channelId;
	let result = {
		userName: "",
		profile: "",
		statistics: [],
	};
	const userInfo = await getUserInfo(userId);
	const userName = userInfo.ok
		? userInfo.user.real_name
		: res.status(400).json("The user not found");
	result.userName = userName;
	result.profile = userInfo.user.profile;
	const now = new Date() / 1000;
	const weekInSeconde = now - 60 * 60 * 7 * 24;
	const newStatistics = await getStat(channelId, userId, weekInSeconde);
	result.statistics.push(newStatistics);
	res.status(200).json(result);
});

router.get("/avr/:channelId/:userId", loginRequired, async (req, res) => {
	const userId = req.params.userId;
	const channelId = req.params.channelId;
	let data = await getChannelHistory(channelId);

	if (data.ok && data.messages) {
		const timestampOfJoin = data.messages.find(
			(message) =>
				message.type == "message" &&
				message.subtype &&
				message.subtype == "channel_join" &&
				message.user == userId
		);

		const now = new Date();
		const joinDate = timestampOfJoin.ts * 1000;
		const weeks = Math.round((now - joinDate) / 604800000);
		let stat = await getStat(channelId, userId, timestampOfJoin.ts);
		stat.messageCount = stat.messageCount / weeks;
		stat.reactionCount = stat.reactionCount / weeks;
		res.json(stat);
	}
});

router.get("/channelSum/:channelId", loginRequired, (req, res) => {
	const channelId = req.params.channelId;

	const query = `SELECT DATE_PART('week', date) week_no, channel_id, SUM(message_count) as total_message, SUM(reaction_count) as total_reaction FROM messages WHERE channel_id = '${channelId}' GROUP BY week_no, channel_id ORDER BY week_no DESC`;

	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.send(JSON.stringify(db_err));
		} else {
			res.json(db_res.rows);
		}
	});
});

router.get("/userSum/:channelId/:userId", (req, res) => {
	const channelId = req.params.channelId;
	const userId = req.params.userId;

	const query = `SELECT DATE_PART('week', date) week_no, channel_id, user_id, SUM(message_count) AS total_message, SUM(reaction_count) AS total_reaction FROM messages WHERE channel_id = '${channelId}' AND user_id = '${userId}'  GROUP BY user_id, channel_id, week_no ORDER by week_no DESC`;
	console.log(query);
	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.send(JSON.stringify(db_err));
		} else {
			res.json(db_res.rows);
		}
	});
});

router.get("/channels/:cohortId", loginRequired, (req, res) => {
	const cohortId = req.params.cohortId;
	const query = `SELECT ChannelList.channel_name, ChannelList.channel_id FROM ChannelList INNER JOIN CohortList ON CohortList.id::varchar = ChannelList.cohort_id WHERE CohortList.id = ${cohortId}`;

	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.send(JSON.stringify(db_err));
		} else {
			res.json(db_res.rows);
		}
	});
});

router.get("/cohortList", loginRequired, (req, res) => {
	const query = "SELECT * FROM CohortList";

	pool.query(query, (db_err, db_res) => {
		if (db_err) {
			res.send(JSON.stringify(db_err));
		} else {
			res.json(db_res.rows);
		}
	});
});

export default router;
