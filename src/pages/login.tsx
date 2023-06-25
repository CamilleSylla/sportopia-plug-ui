import { Formik, Form, Field, ErrorMessage } from "formik";
import lang from "../../lang/fr.json";
import { signIn } from "next-auth/react"
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";



export default function LoginPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex justify-center items-center">
        <SignInForm />
      </div>
      <div
        className="w-1/2 h-full rounded-bl-3xl"
        style={{ background: "url(/login.png)", backgroundSize: "cover" }}
      ></div>
    </div>
  );
}

function SignInForm() {

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

  const submit = async (values: { email: string; password: string}) => {
    signIn('credentials', {...values, callbackUrl: '/'})
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
              className="bg-violet-800 px-6 py-4 rounded-md w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {lang.signin.submit}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  
  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: {},
  };
}