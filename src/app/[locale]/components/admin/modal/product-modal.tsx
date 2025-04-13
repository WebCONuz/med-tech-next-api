import React, { useEffect, useState } from "react";
import ModalBase from "../modal-base";

// language type
type langType = {
  id: number;
  name: string;
};
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
interface Category {
  id: number;
  name: string;
}
const categories: Category[] = [
  {
    id: 1,
    name: "Diagnostic Tools",
  },
  {
    id: 2,
    name: "Surgical Instruments",
  },
  {
    id: 3,
    name: "Therapeutic Devices",
  },
];

// product type
interface Translation {
  name: string;
  description: string;
  languageId: number;
}
interface ProductFormData {
  categoryId: number;
  images: File | string;
  translations: Translation[];
}

// props structure
interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: {
    categoryId: number;
    images: string;
    translations: Translation[];
  };
}

const ProductModal = ({
  isOpen,
  closeModal,
  initialData,
}: ProductModalProps) => {
  // form values
  const [formData, setFormData] = useState<ProductFormData>({
    categoryId: categories[0]?.id || 0,
    images: "",
    translations: langs.map((lang) => ({
      name: "",
      description: "",
      languageId: lang.id,
    })),
  });

  // close & reset modal
  const reset = () => {
    setFormData({
      categoryId: categories[0]?.id || 0,
      images: "",
      translations: langs.map((lang) => ({
        name: "",
        description: "",
        languageId: lang.id,
      })),
    });

    closeModal();
  };

  // Initial data ni to'ldirish
  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryId: initialData.categoryId,
        images: initialData.images,
        translations: langs.map((lang) => {
          const existing = initialData.translations.find(
            (t) => t.languageId === lang.id
          );
          return {
            name: existing?.name || "",
            description: existing?.description || "",
            languageId: lang.id,
          };
        }),
      });
    }
  }, [initialData]);

  // handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  // handle translations input
  const handleTranslationChange = (
    languageId: number,
    field: "name" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.languageId === languageId ? { ...t, [field]: value } : t
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
    <ModalBase isOpen={isOpen} closeModal={reset} classes="w-2/3">
      <h3 className="text-lg font-bold text-main-color mb-4 uppercase text-center">
        {initialData ? "Update product" : "Create product"}
      </h3>
      <form className="block" onSubmit={handleSubmit}>
        <div className="flex gap-x-3 mb-3">
          <div className="flex flex-col w-1/2">
            <label className="block text-sm text-gray-500 mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId: Number(e.target.value),
                }))
              }
              className="py-[10px] px-3 text-sm rounded-md border border-gray-500"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-sm text-gray-500 mb-1">Product image</label>
            <input
              type="file"
              required={initialData ? false : true}
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md border-gray-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {langs.map((lang) => {
            const translation = formData.translations.find(
              (t) => t.languageId === lang.id
            );
            return (
              <div
                key={lang.id}
                className="p-3 border border-gray-500 rounded-md shadow"
              >
                <h3 className="mb-2 font-bold">Translation ({lang.name})</h3>

                <div className="mb-2">
                  <label className="text-sm text-gray-500 mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={translation?.name || ""}
                    onChange={(e) =>
                      handleTranslationChange(lang.id, "name", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-1 block">
                    Description
                  </label>
                  <textarea
                    value={translation?.description || ""}
                    onChange={(e) =>
                      handleTranslationChange(
                        lang.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md h-24"
                    required
                  />
                </div>
              </div>
            );
          })}
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

export default ProductModal;
