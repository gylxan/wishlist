import { RouterProvider } from 'react-router';
import { router } from './pages/routes';
import { useState } from 'react';
import { WishlistProvider } from './context/wishlist';
import { Wish } from './types/wish';

function App() {
  const [wishlist, setWishlist] = useState<Wish[]>([
    {
      title: 'Test produkt 2',
      url: 'https://www.amazon.de/dp/B085WV7HJR/ref=gw_de_desk_sc_mso_atf_aucc_pwl?pf_rd_r=M5YB3C9SF51DRP6C7T5K&pf_rd_p=c86ec814-68f3-4965-9bfd-d606e03013aa&pd_rd_r=17d4bd40-b396-4937-bcc3-05b7030198be&pd_rd_w=NFbd8&pd_rd_wg=yPHnr&ref_=pd_gw_unk',
      imageUrl: 'https://m.media-amazon.com/images/I/414iLzSlgXL._AC_SL1000_.jpg',
    },
    {
      title: 'Test produkt mit super langem Titel',
      url: 'https://www.amazon.de/dp/B085WV7HJR/ref=gw_de_desk_sc_mso_atf_aucc_pwl?pf_rd_r=M5YB3C9SF51DRP6C7T5K&pf_rd_p=c86ec814-68f3-4965-9bfd-d606e03013aa&pd_rd_r=17d4bd40-b396-4937-bcc3-05b7030198be&pd_rd_w=NFbd8&pd_rd_wg=yPHnr&ref_=pd_gw_unk',
      imageUrl: 'https://m.media-amazon.com/images/I/414iLzSlgXL._AC_SL1000_.jpg',
      fulfilled: true,
    },
    {
      title: 'Krasses Produkt',
      url: 'https://www.amazon.de/dp/B085WV7HJR/ref=gw_de_desk_sc_mso_atf_aucc_pwl?pf_rd_r=M5YB3C9SF51DRP6C7T5K&pf_rd_p=c86ec814-68f3-4965-9bfd-d606e03013aa&pd_rd_r=17d4bd40-b396-4937-bcc3-05b7030198be&pd_rd_w=NFbd8&pd_rd_wg=yPHnr&ref_=pd_gw_unk',
      imageUrl: 'https://m.media-amazon.com/images/I/414iLzSlgXL._AC_SL1000_.jpg',
    },
  ]);
  return (
    <div className="flex flex-col justify-start w-full p-4 min-h-screen max-w-screen-xl mx-auto">
      <WishlistProvider value={{ wishlist, setWishlist }}>
        <RouterProvider router={router} />
      </WishlistProvider>
    </div>
  );
}

export default App;
