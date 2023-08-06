import { WishCard } from '../components/wish-card/wish-card';
import { Wishlist } from '../components/wishlist/wishlist';
import { Calendar, Star, User } from 'react-feather';
import { Card } from '../components/card/card';
import { getFulfilledWishes } from '../utils/wish';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../components/button/button';
import { getDifferenceInDays, getFormattedDate, getParsedDate } from '../types/date';
import { GetServerSideProps } from 'next';
import { Wish } from '../types/wish';
import prisma from '../utils/prisma';
import { setSessionStorageItem } from '../utils/session-storage';
import useSessionStorage from '../hooks/useSessionStorage';
import { isEmpty } from '../utils/string';
import { useUserContext } from '../context/user';
import { useApi } from '../hooks/useApi';
import { Link } from '../components/link/link';
import { useNotificationContext } from '../context/notification';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../components/modal/modal';
import { Input } from '../components/input/input';
import { object, string } from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { FormErrorMessage } from '../components/form-error-message/form-error-message';

const GiverSchema = object().shape({
  name: string().required('Gib einen gültigen Namen ein'),
});

type GiverObject = {
  name: string;
};

type WishlistPageProps = {
  wishes?: Wish[];
};
const WishlistPage = ({ wishes: wishesProp }: WishlistPageProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentWish, setCurrentWish] = useState<Wish | null>(null);
  const modalUsernameInputRef = useRef<HTMLInputElement | null>(null);
  const [wishes, setWishes] = useState(wishesProp);
  const [loadingWishIds, setLoadingWishIds] = useState<number[]>([]);
  const { showNotification } = useNotificationContext();
  const { storageValue: sessionShowFulfilled } = useSessionStorage({
    key: 'show_fulfilled',
  });

  const { username, setUser, removeUser } = useUserContext();
  const [showFulfilled, setShowFulfilled] = useState(sessionShowFulfilled === 'true');
  const { fetch: updateWish } = useApi<Wish>({
    url: '/wish',
    method: 'PUT',
  });
  const fulfilledWishes = getFulfilledWishes(wishes ?? []);

  useEffect(() => {
    setShowFulfilled(sessionShowFulfilled === 'true');
  }, [sessionShowFulfilled]);

  const handleUpdate = async (id: number, name: string | null) => {
    setLoadingWishIds((wishIds) => [...wishIds, id]);
    const updatedWish = await updateWish({ id, data: { giver: name } });

    if (updatedWish) {
      setWishes(
        (wishes) =>
          wishes?.map((wish) => (wish.id === updatedWish?.id ? updatedWish : wish)),
      );
      setLoadingWishIds((wishIds) => wishIds.filter((id) => id !== id));
    }
  };

  const logout = () => {
    const user = username;
    removeUser();

    showNotification({
      type: 'success',
      message: `Du bist nicht mehr als ${user} angemeldet`,
    });
  };

  const handleFulfill = async (wish: Wish) => {
    if (!wish.giver && wish.id) {
      if (isEmpty(username)) {
        setCurrentWish(wish);
        handleShowModal();
        return;
      }

      await fulfillWish(wish);
    }
  };

  const fulfillWish = async (wish: Wish, user?: string) => {
    const currUser = user ?? username;
    if (!wish?.giver && wish?.id) {
      await handleUpdate(wish.id, currUser);
      showNotification({
        type: 'success',
        message: 'Wunsch wird von dir erfüllt',
      });
      setCurrentWish(null);
      return;
    }
    showNotification({
      type: 'error',
      message: `Wunsch wird bereits von ${wish?.giver} erfüllt`,
    });
  };

  const handleReject = async (wish: Wish) => {
    if (wish.id) {
      await handleUpdate(wish.id, null);
      showNotification({
        type: 'success',
        message: 'Wunsch wird nicht mehr erfüllt',
      });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      modalUsernameInputRef.current?.focus();
    }, 50);
  };

  const handleModalSubmit = async (
    values: GiverObject,
    { resetForm }: FormikHelpers<GiverObject>,
  ) => {
    setShowModal(false);
    setUser(values.name);
    if (currentWish) {
      fulfillWish(currentWish, values.name);
    }
    resetForm();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dateUntil = process.env.NEXT_PUBLIC_DATE
    ? getParsedDate(process.env.NEXT_PUBLIC_DATE)
    : null;
  const differenceInDays = dateUntil ? getDifferenceInDays(new Date(), dateUntil) : 0;

  return (
    <>
      <Modal open={showModal}>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleModalSubmit}
          validationSchema={GiverSchema}
        >
          {({ values, errors, handleSubmit, touched, handleChange, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>
                <ModalTitle>Wie ist dein Name?</ModalTitle>
                <ModalCloseButton onClick={handleCloseModal} />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    ref={modalUsernameInputRef}
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="given-name"
                    required
                  />
                  {errors.name && touched.name && (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="justify-end">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Abbrechen
                </Button>
                <Button type="submit">Speichern</Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </Modal>
      <div className="relative flex min-h-screen flex-col gap-4 p-4">
        <Card>
          <span className="text-3xl font-bold">Endlich es es so weit! 🎉</span>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <span className="flex flex-row items-center gap-2">
              <User /> {process.env.NEXT_PUBLIC_NAME}
            </span>
            <span className="flex flex-row items-center gap-2">
              <Star /> {process.env.NEXT_PUBLIC_REASON}
            </span>
            {dateUntil && (
              <span className="flex flex-row items-center gap-2">
                <Calendar /> {getFormattedDate(dateUntil)} (in {differenceInDays}{' '}
                {differenceInDays === 1 ? 'Tag' : 'Tagen'})
              </span>
            )}
          </div>
          <p className="my-6 text-center">{process.env.NEXT_PUBLIC_DESCRIPTION}</p>
          <div className="flex w-full items-center justify-between text-gray-500 dark:text-gray-300">
            <span>
              {fulfilledWishes.length} / {wishes?.length} Wünschen erfüllt
            </span>
            {fulfilledWishes.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setShowFulfilled(!showFulfilled);
                  setSessionStorageItem('show_fulfilled', `${!showFulfilled}`);
                }}
              >
                {showFulfilled ? 'Erfüllte ausblenden' : 'Erfüllte anzeigen'}
              </Button>
            )}
          </div>
        </Card>
        <Wishlist>
          {wishes
            ?.filter(({ giver }) => (showFulfilled ? true : !giver))
            .map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                onFulfill={handleFulfill}
                onReject={handleReject}
                loading={loadingWishIds.includes(wish.id as number)}
              />
            ))}
        </Wishlist>
        <div className="mt-auto flex w-full flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <span className="flex gap-4">
            {username ? (
              <>
                Angemeldet als {username}
                <Button variant="outline" size="sm" onClick={logout}>
                  Abmelden
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={handleShowModal}>
                Anmelden
              </Button>
            )}
          </span>
          <span>
            Hier geht&apos;s zum <Link href="/admin">Admin-Bereich</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<WishlistPageProps> = async () => {
  const wishes = await prisma.wish.findMany();

  return { props: { wishes } };
};

export default WishlistPage;
