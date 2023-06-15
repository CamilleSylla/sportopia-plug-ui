import { Formik, Form, Field, ErrorMessage } from "formik";
import lang from "../../lang/fr.json";
import client from "../../apollo-client";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { SIGN_IN } from "../queries/auth";

export default function LoginPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex justify-center items-center">
        <SignInForm />
      </div>
      <div
        className="w-1/2 h-full rounded-bl-3xl"
        style={{ background: "url(/login.jpg)", backgroundSize: "cover" }}
      ></div>
    </div>
  );
}

function SignInForm() {
  const { setUser } = useUserContext();
  const router = useRouter();

  const validate = (values) => {
    const keys = Object.keys(values);
    const errors = {};
    keys.forEach((key) => {
      if (!values[key]) {
        errors[key] = lang.signup.validation.required;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = lang.signup.validation.invalid_email;
      }
    });
    return errors;
  };

  const submit = async (values) => {
    const { data, errors } = await client.query({
      query: SIGN_IN,
      variables: {
        ...values,
      },
    });

    console.log(values);

    if (errors) {
      throw errors;
    }
    setUser(data.signIn);
    return router.push("/");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-[410px] gap-6">
          <h1 className="text-4xl text-white font-bold">{lang.signin.title}</h1>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.signup.labels.email}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="email"
              name="email"
              placeholder={lang.signup.placeholders.email}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.signup.labels.password}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="password"
              name="password"
              placeholder={lang.signup.placeholders.password}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="space-y-1 w-full">
            <button
              className="bg-violet-800 px-6 py-4 rounded-xl w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {lang.signup.submit}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}


export async function getServerSideProps({ req }) {
  if(req.cookies.accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}