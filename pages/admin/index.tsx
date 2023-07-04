import { Button } from '../../components/button/button';
import { GetServerSideProps } from 'next';
import { Wish } from '../../types/wish';
import WishForm from '../../components/wish-form/wish-form';
import { useState } from 'react';
import { getWishes } from '../api/wish/[[...id]]';
import { doApiCall } from '../../utils/api';
import { useApi } from '../../hooks/useApi';

type AdminPageProps = {
  wishes?: Wish[];
};
const AdminPage = ({ wishes }: AdminPageProps) => {
  const [currentWishes, setWishes] = useState(wishes);
  const { fetch: fetchWishes } = useApi<Wish[]>({
    url: '/wish',
    method: 'GET',
  });

  const { fetch: deleteWish, loading: isDeleting } = useApi({
    url: '/wish',
    method: 'DELETE',
  });

  const { fetch: updateWish, loading: isUpdating } = useApi({
    url: '/wish',
    method: 'PUT',
  });

  const { fetch: createWish, loading: isCreating } = useApi({
    url: '/wish',
    method: 'POST',
  });

  const loadWishes = async () => {
    const wishes = await fetchWishes();

    setWishes(wishes || []);
  };
  const handleDelete = async (id: number) => {
    await deleteWish({ id });

    await loadWishes();
  };

  const handleSubmit = async (data: Wish) => {
    if (data.id) {
      await updateWish({ id: data.id, data });
    } else {
      await createWish({ data });
    }
    await loadWishes();
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-8">
      <div className="flex w-full flex-col gap-4">
        {currentWishes?.map((wish) => (
          <WishForm
            disabled={isDeleting || isUpdating || isCreating}
            key={wish.id}
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
