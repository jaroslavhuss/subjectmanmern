export const setAuthToken = async (token: string | null) => {
  try {
    const res = await fetch("http://localhost:5001/api/protected", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
