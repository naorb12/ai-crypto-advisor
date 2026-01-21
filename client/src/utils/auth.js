export function isLoggedIn() {
  return sessionStorage.getItem("token") !== null;
}

export async function loginUser(email, password, setErrorLabel, setLoading) {
  setLoading(true);
  setErrorLabel("");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      },
    );
    if (response.status === 200) {
      const { token, name, onboardingCompleted } = await response.json();
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("onboardingCompleted", onboardingCompleted);
      return { success: true, onboardingCompleted };
    } else if (response.status === 400) {
      setErrorLabel("Email doesn't exist in our systems.");
      return { success: false };
    } else if (response.status === 401) {
      setErrorLabel("Password incorrect.");
      return { success: false };
    } else {
      setErrorLabel("Error occured");
      return { success: false };
    }
  } catch (err) {
    console.log("Couldn't sign in, ", err);
    setErrorLabel("Connection error");
    return { success: false };
  } finally {
    setLoading(false);
  }
}