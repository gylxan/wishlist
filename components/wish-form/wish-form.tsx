import { Button } from '../button/button';
import { Wish } from '../../types/wish';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Image as RFImage } from 'react-feather';

type WishFormProps = {
  wish?: Wish;
  onSubmit: (data: Wish) => Promise<void>;
  onDelete: (id: number) => void;
};

const WishForm = ({ wish, onSubmit, onDelete }: WishFormProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [currentData, setCurrentData] = useState(
    wish ?? {
      imageUrl: '',
      title: '',
      url: '',
    },
  );
  console.log(currentData);

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

  console.log('valid', isValid, 'dirty', isDirty);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isValid) {
      setLoading(true);
      try {
        await onSubmit(currentData);
        setDirty(false);
        setCurrentData({
          imageUrl: '',
          title: '',
          url: '',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();

    if (wish && wish.id) {
      onDelete(wish.id);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-md border-2 border-blue-900 p-2 dark:border-white"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        {currentData.imageUrl ? (
          <img src={currentData.imageUrl} width="140px" alt={currentData.title} />
        ) : (
          <div className="flex h-[140px] w-[140px] items-center justify-center border-2">
            <RFImage />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2">
          <input
            type="text"
            className="rounded-sm px-2 py-1"
            value={currentData.title}
            name="title"
            placeholder="Titel"
            onChange={handleChange}
            required={true}
          />
          <input
            type="url"
            className="rounded-sm px-2 py-1"
            value={currentData.url || ''}
            name="url"
            placeholder="URL"
            onChange={handleChange}
          />
          <input
            type="url"
            className="rounded-sm px-2 py-1"
            value={currentData.imageUrl || ''}
            name="imageUrl"
            placeholder="Bild URL"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse gap-2">
        <Button
          variant="primary"
          type="submit"
          disabled={!isValid || !isDirty || isLoading}
        >
          Speichern
        </Button>
        {wish && (
          <Button
            variant="outline"
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Löschen
          </Button>
        )}
      </div>
    </form>
  );
};

export default WishForm;
