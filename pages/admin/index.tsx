import { Button } from '../../components/button/button';
import { GetServerSideProps } from 'next';
import { Wish } from '../../types/wish';
import WishForm from '../../components/wish-form/wish-form';
import { useState } from 'react';
import { getWishes } from '../api/wish/[[...id]]';
import { doApiCall } from '../../utils/api';

type AdminPageProps = {
  wishes?: Wish[];
};
const AdminPage = ({ wishes }: AdminPageProps) => {
  const [currentWishes, setWishes] = useState(wishes);

  const loadWishes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/wish`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setWishes(await response.json());
  };
  const handleDelete = async (id: number) => {
    await doApiCall(`wish/${id}`, 'DELETE');

    await loadWishes();
  };

  const handleSubmit = async (data: Wish) => {
    if (data.id) {
      await doApiCall(`/wish/${data.id}`, 'PUT', data);
    } else {
      await doApiCall(`/wish`, 'POST', data);
    }
    await loadWishes();
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-8">
      <div className="flex w-full flex-col gap-4">
        {currentWishes?.map((wish) => (
          <WishForm
            key={wish.title}
            onSubmit={handleSubmit}
            wish={wish}
            onDelete={handleDelete}
          />
        ))}
        <WishForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </div>
      <Button href={'/'}>Zurück zur Startseite</Button>
    </div>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async () => {
  return { props: { wishes: await getWishes() } };
};
