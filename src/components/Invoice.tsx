import useAuth from '@/hooks/useAuth';
import { getStateTitle } from '@/utils/helper';
import React, { forwardRef } from 'react';

type InvoiceTypes = {
  order: any;
  totalPrice: number;
  shippingPrice: number;
  voucherPrice?: number;
  taxPrice: number;
  subtotalPrice: number;
  bundleOffer?: number;
  isFreeShipping: boolean;
  isVendor: boolean;
  address: any;
  countries: any;
};

// eslint-disable-next-line react/display-name
const Invoice = forwardRef<HTMLDivElement, InvoiceTypes>(
  (
    {
      order,
      totalPrice,
      shippingPrice,
      voucherPrice,
      taxPrice,
      subtotalPrice,
      bundleOffer,
      isFreeShipping,
      isVendor,
      address,
      countries,
    },
    ref
  ) => {
    const priceFormatting = (price) => `${price} AED`;
    const { setting } = useAuth();

    return (
      <div className="absolute -z-[1000] top-0 -left-[9999px] w-screen bg-white h-screen min-w-[1000px]">
        {/* <div className="absolute top-5 right-10">
          <button onClick={printInvoice} className="border p-2 rounded">
            Print Invoice
          </button>
        </div> */}
        <div ref={ref} className="max-w-[1000px] bg-white my-0 mx-auto pb-10">
          <div className="flex items-start justify-between p-[30px]">
            <div className="flex-1">
              <picture>
                <img
                  className="h-[45px] w-auto mb-2.5"
                  src="/header_logo.png"
                  // src={base64SiteLogo}
                  alt="Logo"
                />
              </picture>
              <h4 className="font-semibold mb-1.5 mt-6">Palmsouq</h4>
              <p>{`${setting?.address_1} ${setting?.city ?? setting?.state}-${
                setting?.zip
              } ${setting?.state}`}</p>
              <p>Phone: {setting?.phone}</p>
            </div>

            <div className="flex-1">
              <h3 className="mb-1.5 font-bold text-2xl text-[#111010]">
                Invoice
              </h3>
              <ul className="w-full">
                <li className="flex items-center">
                  <span className="w-full flex-1">Order:</span>
                  <span className="w-full flex-1">#{order?.order}</span>
                </li>
                <li className="flex items-center">
                  <span className="w-full flex-1">Order Date:</span>
                  <span className="w-full flex-1">{order?.created}</span>
                </li>
                {!isVendor && (
                  <li className="flex items-center">
                    <span className="w-full flex-1">Order Amount:</span>
                    <span className="w-full flex-1">
                      {totalPrice.toFixed(2)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="px-[30px]">
            <table className="min-w-full bg-none mt-0 shipping-table">
              <thead>
                <tr className="text-white font-bold">
                  <th className="text-left pl-4 bg-primary rounded-tl-lg py-1.5">
                    Ship To
                  </th>
                  <th className="text-left bg-primary rounded-tr-lg py-1.5">
                    Order Method
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-1/2 pl-4">
                    <div className="max-w-[300px] mt-4">
                      <span className="font-bold">{address?.name}</span>
                      <span className="block">
                        {`${address?.address_1} ${
                          address?.city ?? address?.state
                        }-${address?.zip ?? ''} ${
                          address?.state && countries
                            ? getStateTitle(
                                countries,
                                address.country,
                                address?.state
                              )
                            : address?.state
                        }`}
                      </span>
                      <span className="block">Email: {address?.email}</span>
                      <span className="block pb-5">
                        Phone: {address?.phone ?? 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="w-1/2">
                    {order.order_method === '2' ? 'Cash on delivery' : 'Stripe'}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="min-w-full bg-none">
              <thead>
                <tr className="text-white font-bold">
                  <th className="text-left pl-4 bg-primary py-1.5 rounded-tl-lg">
                    Title
                  </th>
                  <th className="text-left bg-primary py-1.5">SKU</th>
                  <th className="text-left bg-primary py-1.5">shipping</th>
                  <th className="text-left bg-primary py-1.5">Quantity</th>
                  <th className="text-left bg-primary py-1.5">Price</th>
                  <th className="text-left bg-primary py-1.5 rounded-tr-lg">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.ordered_products.map((value, index) => (
                  <tr key={index}>
                    <td
                      style={{ minWidth: '200px', maxWidth: '300px' }}
                      className="pl-4 py-2.5"
                    >
                      {value.product.title}
                      {/* <div>
                      {generatingAttribute(value).map((attr, i) => (
                        <span key={i} className="mr-4">
                          <b className="mr-2.5">{attr[0]}:</b> {attr[1]}
                        </span>
                      ))}
                      {value.updated_inventory?.sku && (
                        <span className="block mt-1.5">
                          SKU: {value.updated_inventory.sku}
                        </span>
                      )}
                    </div> */}
                    </td>
                    <td>SKU: {value?.inventory?.[0]?.sku ?? 'N/A'}</td>
                    <td>{priceFormatting(value.shipping_price)}</td>
                    <td>{value.quantity}</td>
                    <td>{priceFormatting(value.selling)}</td>
                    <td>{priceFormatting(value.selling * value.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isVendor && (
              <div className="flex justify-end mt-8">
                <ul className="max-w-[300px]">
                  <li className="flex items-center gap-x-4 justify-end py-2.5 border-b">
                    <span className="text-right">Subtotal</span>
                    <span className="text-right">
                      {priceFormatting(subtotalPrice.toFixed(2))}
                    </span>
                  </li>
                  <li className="flex items-center gap-x-4 justify-end py-2.5 border-b">
                    <span className="text-right">Shipping Cost</span>
                    <span>{priceFormatting(shippingPrice)}</span>
                  </li>
                  {bundleOffer && (
                    <li className="flex items-center gap-x-4 justify-end py-2.5 border-b">
                      <span>Bundle Offer</span>
                      <span>{priceFormatting(bundleOffer)}</span>
                    </li>
                  )}
                  {voucherPrice && (
                    <li className="flex items-center gap-x-4 justify-end py-2.5 border-b">
                      <span>Voucher</span>
                      <span>{priceFormatting(voucherPrice)}</span>
                    </li>
                  )}
                  {taxPrice && (
                    <li className="flex items-center gap-x-4 justify-end py-2.5 border-b">
                      <span>Tax</span>
                      <span>{priceFormatting(taxPrice.toFixed(2))}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-x-4 justify-end py-2.5">
                    <span>Total</span>
                    <span>{priceFormatting(totalPrice.toFixed(2))}</span>
                  </li>
                </ul>
              </div>
            )}

            <table className="w-1/2 bg-none mt-0 shipping-table single-table">
              <thead className="">
                <tr className="">
                  <th className="text-left text-white font-bold bg-primary px-4 rounded-t-lg py-2">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-1/2">
                    <p className="font-semibold italic mb-2.5 mt-4">
                      Please always include your order number when making any
                      query
                    </p>
                    <p>
                      Please always include your order number when making any
                      query.For any questions regarding your order please <br />
                      contact :{setting?.phone}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default Invoice;
