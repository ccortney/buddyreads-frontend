import UserContext from "./auth/UserContext";

const demoUser = {
  id: 0,
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
