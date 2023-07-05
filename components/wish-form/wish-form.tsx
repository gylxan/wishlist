import { Button } from '../button/button';
import { Wish } from '../../types/wish';
import { useState } from 'react';
import { Image as RFImage } from 'react-feather';
import { Input } from '../input/input';
import { FormLabel } from '../form-label/form-label';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { FormErrorMessage } from '../form-error-message/form-error-message';
import { Textarea } from '../textarea/textarea';

type WishFormProps = {
  wish?: Wish;
  disabled?: boolean;
  onSubmit: (data: Wish) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const WishSchema = object().shape({
  title: string().min(2, 'Zu kurz!').required('Gib einen gültigen Titel ein'),
  url: string().url('Gib eine gültige URL ein').required('Gib eine gültige URL ein'),
  imageUrl: string()
    .url('Gib eine gültige URL ein')
    .required('Gib eine gültige Bild-URL ein'),
  description: string(),
});

const RequiredMarker = () => <span className="text-red-500">*</span>;
const WishForm = ({ wish, onSubmit, onDelete }: WishFormProps) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleSubmit = async (values: Wish, { resetForm }: FormikHelpers<any>) => {
    await onSubmit(values);
    !wish && resetForm();
  };

  const handleDelete = async () => {
    if (wish && wish.id) {
      setDeleting(true);
      await onDelete(wish.id);
      setDeleting(false);
    }
  };

  return (
    <Formik
      initialValues={
        wish ?? {
          imageUrl: '',
          title: '',
          url: '',
          description: '',
        }
      }
      onSubmit={handleSubmit}
      validationSchema={WishSchema}
    >
      {({
        values,
        errors,
        handleSubmit,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        dirty,
      }) => (
        <form
          className="flex flex-col gap-4 rounded-md bg-gray-400 p-2 dark:bg-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            {values.imageUrl ? (
              <div>
                <img src={values.imageUrl} width="140px" alt={values.title} />
              </div>
            ) : (
              <div className="flex h-[140px] w-[140px] items-center justify-center border-2">
                <RFImage />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
              <div className="mb-4">
                <FormLabel htmlFor="title">
                  Titel
                  <RequiredMarker />
                </FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={values.title}
                  name="title"
                  placeholder="Titel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.title && touched.title && (
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                )}
              </div>
              <div className="mb-4">
                <FormLabel htmlFor="description">Beschreibung</FormLabel>
                <Textarea
                  rows={2}
                  id="description"
                  value={values.description}
                  name="description"
                  placeholder="Beschreibung"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                )}
              </div>
              <div className="mb-4">
                <FormLabel htmlFor="url">
                  URL
                  <RequiredMarker />
                </FormLabel>
                <Input
                  id="url"
                  type="url"
                  value={values.url || ''}
                  name="url"
                  placeholder="URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.url && touched.url && (
                  <FormErrorMessage>{errors.url}</FormErrorMessage>
                )}
              </div>
              <div className="mb-4">
                <FormLabel htmlFor="imageUrl">
                  Bild URL
                  <RequiredMarker />
                </FormLabel>
                <Input
                  id="imageUrl"
                  type="url"
                  value={values.imageUrl || ''}
                  name="imageUrl"
                  placeholder="Bild URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.imageUrl && touched.imageUrl && (
                  <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
                )}
              </div>
              <div className="flex">
                {!!wish?.giver && (
                  <>
                    <span className="mr-1 block text-center font-bold text-gray-700 dark:text-gray-200">
                      Erfüllt von:
                    </span>
                    {wish.giver}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            {wish && (
              <Button
                variant="outline"
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Löschen
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || isDeleting || (wish && !dirty)}
            >
              Speichern
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default WishForm;
