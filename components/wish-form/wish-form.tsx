import { Button } from '../button/button';
import { Wish } from '../../types/wish';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Image as RFImage } from 'react-feather';
import { Input } from '../input/input';
import { FormLabel } from '../form-label/form-label';

type WishFormProps = {
  wish?: Wish;
  disabled?: boolean;
  onSubmit: (data: Wish) => Promise<void>;
  onDelete: (id: number) => void;
};

const WishForm = ({ wish, disabled, onSubmit, onDelete }: WishFormProps) => {
  const [isDirty, setDirty] = useState(false);
  const [currentData, setCurrentData] = useState(
    wish ?? {
      imageUrl: '',
      title: '',
      url: '',
    },
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setDirty(!wish || wish[name as keyof Wish] !== value);

    setCurrentData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const isValid = Object.values(currentData).every(
    (value) => value && (typeof value !== 'number' ? value.trim() !== '' : true),
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isValid) {
      await onSubmit(currentData);
      setDirty(false);
      setCurrentData({
        imageUrl: '',
        title: '',
        url: '',
      });
    }
  };

  const handleDelete = () => {
    if (wish && wish.id) {
      onDelete(wish.id);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-md bg-gray-400 p-2 dark:bg-gray-700"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        {currentData.imageUrl ? (
          <div>
            <img src={currentData.imageUrl} width="140px" alt={currentData.title} />
          </div>
        ) : (
          <div className="flex h-[140px] w-[140px] items-center justify-center border-2">
            <RFImage />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <div className="mb-4">
            <FormLabel htmlFor="title">Titel</FormLabel>
            <Input
              id="title"
              type="text"
              value={currentData.title}
              name="title"
              placeholder="Titel"
              onChange={handleChange}
              disabled={disabled}
              required
            />
          </div>
          <div className="mb-4">
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
              id="url"
              type="url"
              value={currentData.url || ''}
              name="url"
              placeholder="URL"
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
          <div className="mb-4">
            <FormLabel htmlFor="imageUrl">Bild URL</FormLabel>
            <Input
              id="imageUrl"
              type="url"
              value={currentData.imageUrl || ''}
              name="imageUrl"
              placeholder="Bild URL"
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
          <div className="flex">
            {!!wish?.giver && (
              <>
                <span className="mr-1 block text-center font-bold text-gray-700 dark:text-gray-200">
                  Erfüllt von:{' '}
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
            disabled={disabled}
          >
            Löschen
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          disabled={disabled || !isValid || !isDirty}
        >
          Speichern
        </Button>
      </div>
    </form>
  );
};

export default WishForm;
