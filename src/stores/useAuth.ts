interface User {
  name: string;
  email: string;
  objectId: string;
  token: string;
}

function useAuth() {
  return {
    user: null as User | null,

    login: (user: User) => {
      console.log(user);
    },

    logout: () => {},
  };
}

export default useAuth;
