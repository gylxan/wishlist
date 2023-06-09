import { Button } from '../../components/button/button';
import { Wish } from '../../types/wish';
import WishForm from '../../components/wish-form/wish-form';
import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Loader from '../../components/loader/loader';

const AdminPage = () => {
  const [currentWishes, setWishes] = useState<Wish[]>([]);
  const { fetch: fetchWishes, loading: isFetching } = useApi<Wish[]>({
    url: '/wish',
    method: 'GET',
  });

  const fetchAndSetWishes = useCallback(async () => {
    const wishes = await fetchWishes();

    setWishes(wishes || []);
  }, [fetchWishes]);

  useEffect(() => {
    fetchAndSetWishes();
  }, [fetchAndSetWishes]);

  const { fetch: deleteWish } = useApi({
    url: '/wish',
    method: 'DELETE',
  });

  const { fetch: updateWish } = useApi({
    url: '/wish',
    method: 'PUT',
  });

  const { fetch: createWish } = useApi({
    url: '/wish',
    method: 'POST',
  });

  const handleDelete = async (id: number) => {
    await deleteWish({ id });

    await fetchAndSetWishes();
  };

  const handleSubmit = async (data: Wish) => {
    if (data.id) {
      await updateWish({ id: data.id, data });
    } else {
      await createWish({ data });
    }
    await fetchAndSetWishes();
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-8">
      <h1 className="text-xl font-bold">Trage hier deine Wünsche ein</h1>
      <div className="flex w-full flex-col gap-4">
        <WishForm onSubmit={handleSubmit} onDelete={handleDelete} />
        {currentWishes?.map((wish) => (
          <WishForm
            key={wish.id}
            onSubmit={handleSubmit}
            wish={wish}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isFetching && <Loader>Lade Wünsche...</Loader>}
      <Button href={'/'}>Zurück zur Startseite</Button>
    </div>
  );
};

export default AdminPage;
