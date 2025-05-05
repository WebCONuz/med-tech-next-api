"use client";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface OrderFormData {
  productId: number;
  company: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  title: string;
  content: string;
  code: string;
  status: "START";
}

const typeCheckbox = [
  { value: "message", label: "Message" },
  { value: "complaints", label: "Complaints" },
  { value: "ask", label: "Ask" },
  { value: "aftermarket", label: "Aftermarket" },
];

const OrderForm = ({
  productName,
  productId,
}: {
  productName: string;
  productId: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    productId: productId,
    company: "",
    name: "",
    phone: "+1-202-555-0143",
    email: "",
    type: "",
    title: "",
    content: "",
    code: "1234",
    status: "START",
  });
  const t = useTranslations("SingleOrder");

  const handleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const postOrder = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        "https://api.berlinmed-export.com/api/order",
        {
          productId: formData.productId,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          type: formData.type,
          title: formData.title,
          content: formData.content,
          code: +formData.code,
          status: formData.status,
        }
      );

      if (res.status === 201) {
        setFormData({
          productId: productId,
          company: "",
          name: "",
          phone: "",
          email: "",
          type: "",
          title: "",
          content: "",
          code: "1234",
          status: "START",
        });
        alert(t("alert"));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message?.[0]);
        alert(error.response?.data?.message?.[0]);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={postOrder}
      className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4 w-full"
    >
      <div className="flex items-center gap-x-2 sm:gap-x-4 sm:mb-1">
        <p className="w-[120px] font-bold sm:font-normal">
          {t("product_name")}
        </p>
        <h3 className="w-[calc(100%-120px)] text-main-color font-bold uppercase">
          {productName}
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="company"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("company")}
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
          placeholder={t("placeholder.company")}
          className="block w-full sm:w-[calc(100%-120px)] outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        />
      </div>
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="user-name"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("name")}
        </label>
        <input
          id="user-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder={t("placeholder.name")}
          className="block w-full sm:w-[calc(100%-120px)] outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        />
      </div> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="user-phone"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("phone")}
        </label>
        <input
          id="user-phone"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          placeholder={t("placeholder.phone")}
          className="block w-full sm:w-[calc(100%-120px)] outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="user-email"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("email")}
        </label>
        <input
          id="user-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder={t("placeholder.email")}
          className="block w-full sm:w-[calc(100%-120px)] outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <span className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0">
          {t("type.title")}
        </span>
        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 sm:grid sm:grid-cols-2 sm:gap-x-2 md:flex md:gap-x-3">
          {typeCheckbox.map((item, index) => (
            <div key={item.label} className="flex items-center gap-x-1">
              <input
                type="radio"
                id={item.label}
                value={item.value}
                checked={formData.type === item.value}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="form-radio h-4 w-4"
                required
              />
              <label htmlFor={item.label} className="text-sm mt-[2px]">
                {t("type.opt" + (index + 1))}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="title"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("msg_title")}
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder={t("placeholder.title")}
          className="block w-full sm:w-[calc(100%-120px)] outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="content"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("content")}
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          placeholder={t("placeholder.content")}
          className="block w-full sm:w-[calc(100%-120px)] h-[150px] sm:h-[100px] resize-none outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
        ></textarea>
      </div>
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
        <label
          htmlFor="user-code"
          className="font-bold sm:font-normal sm:w-[120px] block mb-1 sm:mb-0"
        >
          {t("code.title")}
        </label>
        <div className="flex items-center gap-x-2">
          <input
            id="user-code"
            type="number"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder={t("code.placeholder")}
            required
            className="block no-spinner w-28 sm:w-20 outline-none border border-gray-400 duration-200 hover:border-main-color focus:border-main-color py-[6px] sm:py-2 px-3 sm:px-4 rounded-md"
          />
          <img
            src="/capcha.png"
            alt="code-image"
            className="w-20 shadow-lg border border-gray-400 rounded-md"
          />
          <p className="hidden sm:block">{t("code.text")}</p>
        </div>
      </div> */}
      <div className="flex items-center gap-x-2 sm:gap-x-4 mt-2 sm:mt-0">
        <div className="w-[120px] hidden sm:block"></div>
        <div className="w-full sm:w-[calc(100%-120px)] flex flex-col">
          <button
            type="submit"
            className="rounded-md py-2 px-4 bg-main-color hover:bg-main-bg text-white hover:text-black"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-x-2">
                <div className="w-4 h-4 rounded-full border border-white border-l-0 animate-spin"></div>
                <span>Processing…</span>
              </div>
            ) : (
              <span>{t("btn")}</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
