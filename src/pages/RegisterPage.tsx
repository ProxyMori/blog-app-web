import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const url = "https://finekittens-us.backendless.app/api/data/Users";
      await axios.post(url, {
        name: name,
        email: email,
        password: password,
      });

      alert("Register Success!");
    } catch (error) {
      console.log(error);
      alert("Register Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-20 border border-black p-8 space-y-4">
      <h1>Register</h1>

      <Label>Name</Label>
      <Input type="text" onChange={(e) => setName(e.target.value)} />

      <Label>Email</Label>
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />

      <Label>Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </Button>
    </div>
  );
}

export default RegisterPage;
