import UserContext from "./auth/UserContext";

const demoUser = {
  id: 0,
  firstName: "testfirst",
  lastName: "testlast",
  email: "test@test.net",
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

const NoUserProvider = 
    ({ children, currentUser = null }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider, NoUserProvider };
