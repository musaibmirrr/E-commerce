export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t py-12">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">AIStore</h3>
            <p className="text-gray-400 text-sm">
              The next generation of e-commerce powered by artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>All Products</li>
              <li>Featured</li>
              <li>New Arrivals</li>
              <li>Discounts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none"
              />
              <button className="bg-primary px-4 py-2 rounded-r-md">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AIStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
