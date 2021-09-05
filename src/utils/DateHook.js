const DateHook = ({ date }) => {
  return Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: "medium"}).format(new Date(date))
}

export default DateHook