"use client";
import Title from "@/app/[locale]/components/ui/title";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const t = useTranslations("ContactPage");

  const postContact = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        "https://api.berlinmed-export.com/api/contact",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      if (res.status === 201) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        console.log(res.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title title={t("sub_title")} />
      <p className="text-gray-500 leading-7 mb-5 sm:max-w-4/5">{t("info")}</p>

      <form
        onSubmit={postContact}
        className="w-full flex flex-col gap-y-2 sm:gap-y-4"
      >
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="outline-none border border-gray-300 duration-200 hover:border-main-color focus:border-main-color py-2 px-4 rounded-md"
          placeholder={t("name")}
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="outline-none border border-gray-300 duration-200 hover:border-main-color focus:border-main-color py-2 px-4 rounded-md"
          placeholder={t("email")}
          required
        />
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="h-[180px] resize-none outline-none border border-gray-300 duration-200 hover:border-main-color focus:border-main-color py-2 px-4 rounded-md"
          placeholder={t("msg")}
          required
        ></textarea>

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
      </form>
    </div>
  );
};

export default ContactForm;
