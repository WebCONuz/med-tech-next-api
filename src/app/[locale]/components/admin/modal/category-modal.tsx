import React, { useEffect, useState } from "react";
import ModalBase from "../modal-base";

// language type
interface langType {
  id: number;
  name: string;
}
const langs: langType[] = [
  {
    id: 1,
    name: "eng",
  },
  {
    id: 2,
    name: "uz",
  },
  {
    id: 3,
    name: "rus",
  },
];

// category type
interface Translation {
  name: string;
  languageId: number;
}
interface CategoryFormData {
  logo: File | string;
  translations: Translation[];
}

// props structure
interface CategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: {
    logo: string;
    translations: Translation[];
  };
}

const CategoryModal = ({
  isOpen,
  closeModal,
  initialData,
}: CategoryModalProps) => {
  // form values
  const [formData, setFormData] = useState<CategoryFormData>({
    logo: "",
    translations: langs.map((lang) => ({
      name: "",
      languageId: lang.id,
    })),
  });

  // pill data for update
  useEffect(() => {
    if (initialData) {
      setFormData({
        logo: initialData.logo,
        translations: langs.map((lang) => {
          const existing = initialData.translations.find(
            (t) => t.languageId === lang.id
          );
          return {
            name: existing?.name || "",
            languageId: lang.id,
          };
        }),
      });
    }
  }, [initialData]);

  // close & reset modal
  const reset = () => {
    setFormData({
      logo: "",
      translations: langs.map((lang) => ({
        name: "",
        languageId: lang.id,
      })),
    });

    closeModal();
  };

  // handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  // handle translations input
  const handleTranslationChange = (languageId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.languageId === languageId ? { ...t, name: value } : t
      ),
    }));
  };

  // CREATE & UPDATE LOGIC
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      console.log("Update: ", formData); // UPDATE LOGIC
    } else {
      console.log("Create: ", formData); // CREATE LOGIC
    }

    reset();
  };

  return (
    <ModalBase isOpen={isOpen} closeModal={reset} classes="w-1/2">
      <h3 className="text-lg font-bold text-main-color mb-4 uppercase text-center">
        {initialData ? "Update category" : "Create category"}
      </h3>
      <form className="block" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full mb-3">
          <span className="text-sm text-gray-500 mb-1">Category image</span>
          <input
            type="file"
            required={initialData ? false : true}
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          {langs.map((lang) => (
            <div key={lang.id}>
              <label className="block text-sm text-gray-500 mb-1">
                Name ({lang.name})
              </label>
              <input
                type="text"
                value={
                  formData.translations.find((t) => t.languageId === lang.id)
                    ?.name || ""
                }
                onChange={(e) =>
                  handleTranslationChange(lang.id, e.target.value)
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-x-2 mt-4">
          <button
            onClick={reset}
            type="button"
            className="outline-none border-0 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="outline-none border-0 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

export default CategoryModal;
