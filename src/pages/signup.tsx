import { Formik, Form, Field, ErrorMessage } from "formik";
import lang from "../../lang/fr.json";
import { signIn, useSession } from "next-auth/react";
import client from "../../apollo-client";
import { CREATE_USER } from "../mutations/user";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function SignUpPage() {

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex justify-center items-center">
        <SignUpForm />
      </div>
      <div
        className="w-1/2 h-full rounded-bl-3xl"
        style={{ background: "url(/login.png)", backgroundSize: "cover" }}
      ></div>
    </div>
  );
}

function SignUpForm() {
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
      } else if (values.password !== values.confirmPassword) {
        errors.password = lang.signup.validation.passwords_dont_match;
      }
    });
    return errors;
  };

  const submit = async (values) => {
    const { confirmPassword, ...user } = values;
    console.log(user);
    const { data, errors } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        user,
      },
    });
    if (errors) {
      throw errors;
    }
    setUser(data.createUser)
    return router.push("/");
  }

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validate={validate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-[410px] gap-6">
          <h1 className="text-4xl text-white font-bold">{lang.signup.title}</h1>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.signup.labels.firstname}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="firstname"
              placeholder={lang.signup.placeholders.firstname}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="firstname"
              component="div"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.signup.labels.lastname}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="lastname"
              placeholder={lang.signup.placeholders.lastname}
            />
            <ErrorMessage
              className="text-xs text-red-500"
              name="lastname"
              component="div"
            />
          </div>
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
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.signup.labels.confirmPassword}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="password"
              name="confirmPassword"
              placeholder={lang.signup.placeholders.confirmPassword}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="space-y-1 w-full">
            {/* GOOGLE SIGN IN */}
            {/* <button
            type="button"
            onClick={() =>signIn('google')}
            className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <span className="flex items-center mx-auto">
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            {lang.signup.signup_google}
            </span>
          </button> */}
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