export const filterData = (searchText, allRestaturants) => {
  console.log(allRestaturants);
  const data = allRestaturants.filter((restaurant) => {
    const resName = restaurant?.data?.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    return resName;
  });
  // console.log(data + " inside filter data");
  return data;
};
