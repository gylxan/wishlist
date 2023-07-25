import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Card } from '../../components/card/card';
import { GetServerSidePropsContext } from 'next';
import { FormLabel } from '../../components/form-label/form-label';
import { FormErrorMessage } from '../../components/form-error-message/form-error-message';
import { RequiredMarker } from '../../components/required-marker/required-marker';
import { object, string } from 'yup';
import { Formik, FormikHelpers } from 'formik';

const SignInSchema = object().shape({
  email: string()
    .email('Gib eine gültige E-Mail ein')
    .required('Gib einen gültige E-Mail ein'),
  password: string().required('Gib ein gültiges Passwort ein'),
});
const SignInPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? '/');

  const handleSubmit = async (
    values: { password: string; email: string },
    { resetForm }: FormikHelpers<any>,
  ) => {
    const result = await signIn('credentials', {
      ...values,
      callbackUrl: callbackUrl ?? '/',
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    }
    if (result?.ok) {
      await router.push(callbackUrl);
      resetForm();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Card className="flex w-full flex-col items-center p-8 shadow-md sm:max-w-2xl">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={SignInSchema}
        >
          {({
            values,
            errors,
            handleSubmit,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
              <h1 className="my-8 text-4xl">Anmelden</h1>

              <div className="mb-4">
                <FormLabel htmlFor="email">
                  E-Mail
                  <RequiredMarker />
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={values.email}
                  name="email"
                  placeholder="E-Mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && touched.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </div>

              <div className="mb-4">
                <FormLabel htmlFor="password">
                  Passwort
                  <RequiredMarker />
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={values.password}
                  name="password"
                  placeholder="Passwort"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.password && touched.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </div>

              {!!error && <FormErrorMessage>Fehler: {error}</FormErrorMessage>}
              <Button type="submit" className="w-fit" disabled={isSubmitting}>
                Anmelden
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignInPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
