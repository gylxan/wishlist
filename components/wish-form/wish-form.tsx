import { Button } from '../button/button';
import { Wish } from '../../types/wish';
import { useState } from 'react';
import { Image as RFImage, X } from 'react-feather';
import { Input } from '../input/input';
import { FormLabel } from '../form-label/form-label';
import { Formik, FormikHelpers } from 'formik';
import { object, string, lazy } from 'yup';
import { FormErrorMessage } from '../form-error-message/form-error-message';
import { Textarea } from '../textarea/textarea';
import { RequiredMarker } from '../required-marker/required-marker';
import { Spinner } from '../spinner/spinner';
import { IconButton } from '../icon-button/icon-button';

type WishFormProps = {
  wish?: Wish;
  disabled?: boolean;
  onSubmit: (data: Wish) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onDeleteGiver: (data: Wish) => Promise<void>;
};

const WishSchema = object().shape({
  title: string().min(2, 'Zu kurz!').required('Gib einen gültigen Titel ein'),
  url: string().url('Gib eine gültige URL ein').required('Gib eine gültige URL ein'),
  imageUrl: lazy((value) =>
    /^data/.test(value)
      ? string().matches(
          /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
          'Muss eine validate data-URL sein',
        )
      : string()
          .url('Gib eine gültige URL ein')
          .required('Gib eine gültige Bild-URL ein'),
  ),
  description: string(),
});
const WishForm = ({ wish, onSubmit, onDelete, onDeleteGiver }: WishFormProps) => {
  const [isDeleting, setDeleting] = useState(false);
  const [isDeletingGiver, setDeletingGiver] = useState(false);

  const handleSubmit = async (values: Wish, { resetForm }: FormikHelpers<any>) => {
    await onSubmit(values);
    resetForm(!wish ? undefined : { values });
  };

  const handleDelete = async () => {
    if (wish && wish.id) {
      setDeleting(true);
      await onDelete(wish.id);
      setDeleting(false);
    }
  };

  const handleDeleteGiver = async () => {
    if (wish && wish.id && wish.giver) {
      setDeletingGiver(true);
      await onDeleteGiver({ ...wish, giver: null });
      setDeletingGiver(false);
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
          className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          onSubmit={handleSubmit}
        >
          {/* Maybe break to column on small screens */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            {values.imageUrl ? (
              <div className="w-[200px]">
                <img src={values.imageUrl} width="100%" alt={values.title} />
              </div>
            ) : (
              <div className="flex h-[140px] w-[140px] items-center justify-center border-2">
                <RFImage />
              </div>
            )}
            <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden">
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
                  value={values.description || ''}
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
              <div className="flex items-center gap-2">
                {!!wish?.giver && (
                  <>
                    <div className="inline-flex">
                      <span className="mr-1 block text-center font-bold text-gray-700 dark:text-gray-200">
                        Erfüllt von:
                      </span>
                      {wish.giver}
                    </div>
                    <IconButton onClick={handleDeleteGiver}>
                      {isDeletingGiver ? (
                        <Spinner size="sm" color="blue" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </IconButton>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            {wish && (
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && <Spinner size="sm" color="blue" className="mr-2" />}
                Löschen
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || isDeleting || (wish && !dirty)}
            >
              {isSubmitting && <Spinner size="sm" color="white" className="mr-2" />}
              Speichern
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default WishForm;
