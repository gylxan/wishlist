import { Button } from '../../components/button/button';
import { Wish } from '../../types/wish';
import WishForm from '../../components/wish-form/wish-form';
import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Loader from '../../components/loader/loader';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { useNotificationContext } from '../../context/notification';

const AdminPage = () => {
  const [currentWishes, setWishes] = useState<Wish[]>([]);
  const { showNotification } = useNotificationContext();
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

  const handleDelete = async (data: Wish) => {
    if (data.id) {
      await deleteWish({ id: data.id });
      showNotification({
        type: 'success',
        message: `Wunsch "${data.title}" wurde gelöscht`,
      });

      await fetchAndSetWishes();
    }
  };

  const handleSubmit = async (data: Wish) => {
    if (data.id) {
      await updateWish({ id: data.id, data });
    } else {
      await createWish({ data });
    }
    showNotification({
      type: 'success',
      message: `Wunsch "${data.title}" wurde gespeichert`,
    });
    await fetchAndSetWishes();
  };

  const handleDeleteGiver = async (data: Wish) => {
    if (data.id) {
      await updateWish({
        id: data.id,
        data: { ...data, giver: null },
      });
      showNotification({
        type: 'success',
        message: `${data.giver} wurde als Schenkender entfernt`,
      });
      await fetchAndSetWishes();
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center gap-8 p-4">
      <h1 className="text-xl font-bold">Trage hier deine Wünsche ein</h1>
      <div className="flex w-full flex-col gap-4">
        <WishForm
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onDeleteGiver={handleDeleteGiver}
        />
        {currentWishes?.map((wish) => (
          <WishForm
            key={wish.id}
            onSubmit={handleSubmit}
            wish={wish}
            onDelete={handleDelete}
            onDeleteGiver={handleDeleteGiver}
          />
        ))}
      </div>
      {isFetching && <Loader>Lade Wünsche...</Loader>}
      <div className="flex gap-2">
        <Button href={'/'}>Zurück zur Startseite</Button>
        <Button variant="outline" onClick={() => signOut()}>
          Abmelden
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin?callbackUrl=/admin',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
