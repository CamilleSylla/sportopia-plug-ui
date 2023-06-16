import AdminLayout from "@/layouts/AdminLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import lang from "../../../../lang/fr.json";
import * as Yup from "yup";
import client from "../../../../apollo-client";
import { ALL_SPORTS } from "../../../queries/sport";
import { CREATE_CLUB } from "../../../mutations/club";
import { useRouter } from "next/router";
export default function CreateClubDashboardPage({
  sports,
}: {
  sports: { id: string; name: string }[];
}) {
  return (
    <AdminLayout>
      <div className=" space-y-20">
        <h1 className="text-4xl font-bold text-white">
          {lang.admin.root.create_page.title}
        </h1>
        <CreateClubForm sports={sports} />
      </div>
    </AdminLayout>
  );
}

type Values = {
  name: string;
  adress: string;
  city: string;
  zip: string;
  sportId: string;
  email?: string;
  phone?: string;
};

function CreateClubForm({
  sports,
}: {
  sports: { id: string; name: string }[];
}) {
  const router = useRouter();
  const submit = async (values: Values) => {
    const { sportId, ...club } = values;
    const { errors } = await client.mutate({
      mutation: CREATE_CLUB,
      variables: {
        sportId,
        club,
      },
    });
    if (errors?.length) {
      throw errors[0];
    } else {
      router.push("/admin/club");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        adress: "",
        city: "",
        zip: "",
        sportId: "",
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required(
          lang.admin.root.create_page.form.validation.required
        ),
        adress: Yup.string().required(
          lang.admin.root.create_page.form.validation.required
        ),
        city: Yup.string().required(
          lang.admin.root.create_page.form.validation.required
        ),
        sportId: Yup.string().required(
          lang.admin.root.create_page.form.validation.required
        ),
        zip: Yup.string().required(
          lang.admin.root.create_page.form.validation.required
        ),
        email: Yup.string().email(
          lang.admin.root.create_page.form.validation.invalid_email
        ),
        phone: Yup.string(),
      })}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-2 w-[810px] gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.name}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="name"
              placeholder={lang.admin.root.create_page.form.placeholders.name}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.adress}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="adress"
              placeholder={lang.admin.root.create_page.form.placeholders.adress}
            />
            <ErrorMessage
              name="adress"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.city}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="city"
              placeholder={lang.admin.root.create_page.form.placeholders.city}
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.zip}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="zip"
              placeholder={lang.admin.root.create_page.form.placeholders.zip}
            />
            <ErrorMessage
              name="zip"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.sport}
            </label>
            <Field
              as="select"
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              name="sportId"
            >
                {/* TODO : select modify option ui and I18n placeholder */}
              <option value={""}>Choisir un sport</option>
              {sports?.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="sportId"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.email}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="email"
              name="email"
              placeholder={lang.admin.root.create_page.form.placeholders.email}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-violet-500">
              {lang.admin.root.create_page.form.labels.phone}
            </label>
            <Field
              className=" text-white px-6 py-4 rounded-xl bg-transparent border border-violet-800"
              type="text"
              name="phone"
              placeholder={lang.admin.root.create_page.form.placeholders.phone}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="space-y-1 w-full col-start-1">
            <button
              className="bg-violet-800 px-6 py-4 rounded-xl w-full"
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

export async function getServerSideProps() {
  const { data: sportsQuery } = await client.query({
    query: ALL_SPORTS,
  });
  return {
    props: {
      sports: sportsQuery.sports,
    },
  };
}
