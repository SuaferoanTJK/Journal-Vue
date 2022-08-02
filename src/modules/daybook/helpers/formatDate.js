const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });
  return newDate;
};

export { formatDate };
