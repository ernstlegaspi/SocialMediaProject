import moment from 'moment'

interface DateTimeProps {
	dateTime: Date | undefined
}

const DateTime = ({ dateTime }: DateTimeProps) => {
	return (
		<p className="text-sm text-gray-500">
			{moment(dateTime).fromNow().includes("seconds ago") ? "now" 
			: moment(dateTime).fromNow().includes("a day ago") ? "1 day ago"
			: moment(dateTime).fromNow().includes("a minute") ? "1 minute ago"
			: moment(dateTime).fromNow().includes("an hour ago") ? "1 hour ago" 
			: moment(dateTime).fromNow().includes("a day ago") ? "1 day ago" 
			: moment(dateTime).fromNow().includes("hours ago") ? moment(dateTime).fromNow().split(" ")[0] + "h"
			: moment(dateTime).fromNow().includes("days ago") ? moment(dateTime).format("MMM Do") 
			: `${moment(dateTime).fromNow().split(" ")[0]}m`}
		</p>
	)
}

export default DateTime