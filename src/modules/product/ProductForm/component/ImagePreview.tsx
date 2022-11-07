import { useEffect, useState } from "react";
import { UploadIcon } from "../../../../components/icons";

interface IImagePreview {
  value?: string;
  handleChangeImage?: (data: File) => void;
}

const ImagePreview = ({ value, handleChangeImage }: IImagePreview) => {
  const [preview, setPreview] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length !== 0) {
      if (handleChangeImage) handleChangeImage(files[0]);

      const url = URL.createObjectURL(files[0]);
      setPreview(url);
    }
  };

  useEffect(() => {
    if (value) setPreview(value);
  }, [value]);

  return (
    <div className="flex justify-center items-center w-[300px]">
      <label
        htmlFor="image-preview"
        className="flex flex-col justify-center items-center w-full h-64 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer overflow-hidden hover:bg-gray-100"
      >
        {!preview && (
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <UploadIcon
              stroke="currentColor"
              fill="none"
              className="mb-3 w-10 h-10 text-gray-400"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
        )}

        {preview && (
          <img
            className="w-full h-full object-cover"
            src={preview}
            alt="your upload image"
          />
        )}

        <input
          id="image-preview"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ImagePreview;
