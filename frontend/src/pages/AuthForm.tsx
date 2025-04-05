import { useForm } from "react-hook-form";
import {
  signinInput,
  SigninType,
  signupInput,
  SignupType,
} from "../../../common/src/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import {toast} from 'sonner'

const AuthForm = () => {
  const [signInType, setSignInType] = useState(true);
  const {setIsSigned} = useContext(AppContext);

  const signup = useForm<SignupType>({
    resolver: zodResolver(signupInput),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const signin = useForm<SigninType>({
    resolver: zodResolver(signinInput),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInApi = async () => {
    try {
      const payload = signin.getValues();
    console.log(payload, "SigniN Payload");
    const res = await axios.post(
      "https://backend.hidden-snow-9313.workers.dev/api/v1/user/signin",
      payload
    );
    console.log(res);
    const { token } = res.data;

    localStorage.setItem("token", token);
    console.log(token);
    setIsSigned(true);

    toast("You are Successfully signed in!", {
      description: 'Welcome Back!',
      action: {
        label: "close",
        onClick: () => console.log("Toast Closed")
      }
    })
    } catch (error) {
      console.log("Sign in Error", error)
    }
    
  };

  const onSubmit = (values: SignupType | SigninType) => {
    if (signInType) {
      console.log("Sign In:", values);
      signInApi();
    } else {
      console.log("Sign Up:", values);
    }
  };

  const renderFormFields = () => {
    const form = signInType ? signin : signup;
    const fields = signInType
      ? [
          { name: "email", label: "Email", placeholder: "Email..." },
          { name: "password", label: "Password", placeholder: "Password..." },
        ]
      : [
          { name: "name", label: "Name", placeholder: "Name..." },
          { name: "email", label: "Email", placeholder: "Email..." },
          { name: "password", label: "Password", placeholder: "Password..." },
        ];

    return fields.map((field) => (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name as keyof (SignupType | SigninType)} // Explicitly type the name
        render={({ field: inputField }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input placeholder={field.placeholder} {...inputField} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <Form {...(signInType ? signin : signup)}>
      <form
        onSubmit={(signInType ? signin : signup).handleSubmit(onSubmit)}
        className="space-y-6 w-full"
      >
        {renderFormFields()}
        <div className="cursor-pointer flex justify-between items-center">
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
          <span
            className="font-semibold"
            onClick={() => setSignInType(!signInType)}
          >
            {signInType ? "Signup Here" : "Signin Here"}
          </span>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
